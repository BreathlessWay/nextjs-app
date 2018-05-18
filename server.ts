import * as next from 'next';
import * as express from 'express';
import * as mobxReact from 'mobx-react';

const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');
const path = require('path');
const LRUCache = require('lru-cache');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const {i18nInstance} = require('./libs/i18n');
const app = next({dev});
const handle = app.getRequestHandler();
mobxReact.useStaticRendering(true);
let basePath = __dirname;
if (basePath.includes('/production-server')) {
  basePath = basePath.replace(/\/production-server/, '');
}
// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`;
}

async function renderAndCache (req, res, pagePath, queryParams?) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}

i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'zh'], // preload all langages
    ns: ['common', 'home', 'entry'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(basePath, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(basePath, '/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    app.prepare()
      .then(() => {
        const server = express();
        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));
        // Use the `renderAndCache` utility defined below to serve pages
        // server.get('/', (req, res) => {
        //   renderAndCache(req, res, '/');
        // });

        process.env.NODE_ENV === 'production' && server.get('/service-worker.js', (req, res) => {
          const filePath = path.join(basePath, '.next', '/service-worker.js');
          app.serveStatic(req, res, filePath);
        });

        // serve locales for client
        server.use('/locales', express.static(path.join(basePath, '/locales')));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));

        server.get('/posts/:id', (req, res) => {
          const actualPage = '/post';
          const queryParams = {id: req.params.id};
          return app.render(req, res, actualPage, queryParams);
        });

        server.get('/zx/:id', (req, res) => {
          const actualPage = '/zx';
          const queryParams = {id: req.params.id};
          return renderAndCache(req, res, actualPage, queryParams);
        });

        server.get('*', (req, res) => {
          return handle(req, res);
        });

        server.listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`);
        });
      })
      .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
      });
  });
