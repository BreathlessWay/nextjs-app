## Next.js

### 项目介绍

next.js的项目框架，提供next.js scss typescript mobx axios antd-mobile express i18next postcss sentry service-work lru-cache工具集成

安装依赖
> npm install

启动开发环境
> npm run dev

构建
> npm run build

启动正式服务
> npm start


## 技术文档

1. [nextjs](https://learnnextjs.com/)，react的服务端渲染框架
2. [typescript](https://www.tslang.cn/)，js的语言超集
3. [mobx](http://cn.mobx.js.org/)，react的状态管理库
4. [axios](https://www.kancloud.cn/yunye/axios/234845)，请求库
5. [antd-mobile](https://mobile.ant.design/index-cn)，组件样式库
6. [scss](https://www.sass.hk/)，css预处理器
7. [express](http://www.expressjs.com.cn/)，服务启动

## 部分介绍

1. 路由：next会根据pages目录下的目录结构生成对应路由，只能在客户端使用，对于as路由需要做路由映射

    1.1 提供导航组件Link，Link中必须包含一个可点击的组件类似a button
    
        import {Link} from 'next/link'; <Link href><a>首页</a></Link>,
    
    1.2 手动触发的路由跳转可以通过Router组件实现，
    
        import Router from 'next/router'; Router.push/replace...
2. 通过import()实现的懒加载组件：

        import dynamic from 'next/dynamic';
        const Layout = dynamic(import('../components/MyLayout'),{loading: () => (<p>...</p>)});

3. 生命周期：

    3.1 getInitialProps: 初次加载组件，getInitialProps只会在服务端运行，不能访问到组件this，需要渲染的数据在此周期中请求，方法需要返回一个object，映射到组件到props中
    
    3.2 constructor  getDerivedStateFromProps  render在服务端可客户端均会执行，componentDidMount只会在客户端执行
    
    3.3 For the initial page load, getInitialProps will execute on the server only. getInitialProps will only be executed on the client when navigating to a different route via the Link component or using the routing APIs.
        
        Note: getInitialProps can not be used in children components. Only in pages.
    
    3.4 getInitialProps参数
    
        pathname - path section of URL
        query - query string section of URL parsed as an object
        asPath - String of the actual path (including the query) shows in the browser
        req - HTTP request object (server only)
        res - HTTP response object (server only)
        jsonPageRes - Fetch Response object (client only)
        err - Error object if any error is encountered during the rendering
    
 4. 写在components中的样式表引入组件后不会生效，需要从外层目录引入(已解决，升级后解决)
 
 5. 目前rem布局的root-size是16px
 
 6. 被mobx observe的数组不是数组，无论如何 Array.isArray(observable([])) 都将返回 false ，所以无论何时当你需要传递 observable 数组到外部库时，通过使用 array.slice() 在 observable 数组传递给外部库或者内置方法前创建一份浅拷贝(无论如何这都是最佳实践)总会是一个好主意。 换句话说，Array.isArray(observable([]).slice()) 会返回 true
 
 7. pxtorem：需要忽略的px将px大写P，比如`line-height: 13Px;`，该属性不会被转为rem
 
 8. i18next/react-i18next：国际化配合express
 
 9. manifest.json必须配置144X144的图片,图标尺寸的字段为 sizes 而不是 size !!，写错字段可能会导致添加到桌面的图标显示异常。
 
 10. 关于登录验证，登录在withPlugins中调用后，在每个通过withPlugins包装的页面中可以在组件的props中拿到user对象，包含登录后的用户信息
 
 11. 图片资源都需要通过require引入才会被处理
 
 12. 关于mobx：在getInitialProps中初始化的store会被stringified，所以只有属性，而且是非动态绑定的，其他store中方法均没有
 
        `
        Be aware that data that was used on the server (and provided via getInitialProps) will be stringified in order to rehydrate the client with it. That means, if you create a store that is, say, an ObservableMap and give it as prop to a page, then the server will render appropriately. But stringifying it for the client will turn the ObservableMap to an ordinary JavaScript object (which does not have Map-style methods and is not an observable). So it is better to create the store as a normal object and turn it into a Observable in the render() method. This way both sides have an Observable to work with.
        `
