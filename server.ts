import * as next from 'next';
import * as express from 'express';
import * as mobxReact from 'mobx-react';

const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');
const path = require('path');
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
i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'zh'], // preload all langages
    ns: ['common', 'home'], // need to preload all the namespaces
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

        // serve locales for client
        server.use('/locales', express.static(path.join(basePath, '/locales')));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));

        server.get('/posts/:id', (req, res) => {
          const actualPage = '/post';
          const queryParams = {id: req.params.id};
          return app.render(req, res, actualPage, queryParams);
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
