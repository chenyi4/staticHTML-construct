# staticHTML-construct

webpack和grunt 和 gulp 都能构建项目

<br/>
=========common文件夹===========<br/>
基于webpack4.42 构建静态网页
https://www.webpackjs.com/concepts/
https://www.webpackjs.com/guides/asset-management/
https://www.webpackjs.com/configuration/resolve/#resolve-alias 解析
<br/>
npm run build
<br/>
1.压缩css
2.压缩js
3.合并js,减少请求
<br/>
<br/>
=================== inanout ==========<br/>
1.多输入，多输出，2.初始化删除输出配置
<br/>
<br/>
=================== dev ==========<br/>
1.source Map 2"watch": "webpack --watch",监听更新并重新打包手动刷新  3.监听更新加载webpack-dev-server
<br/>
=================== dev2 ==========<br/>
1.webpack-dev-middleware 启动前端服务 node.js 的express 后台服务
<br/>
=================== HMR  ==========<br/>
热加载 html可以根据内容修改，但是更新的代码要自己去写。这样就不用自己手动f5刷新页面了。只在生产环境下面使用，还得写生产环境的代码，比较麻烦
<br/>css样式自动会热加载，不用配置
<br/>
=================== HMR - dev -node ==========<br/>
1.通过 Node.js API 来实现热加载模块更新
<br/>
=================== shaking ==========<br/>
1.清除js中没有使用但是写了的代码。2.代码压缩，减少代码大小，混淆
<br/>
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<br/>
1.及时项目里面写了一些文件，如果没有import依赖，webpack就不会去打包
<br/>
2.npm install --save-dev file-loader 处理图片文件
<br/>
3.file-loader加载字体
https://www.fontke.com/tool/convfont/在线字体文件格式转换
<br/>
4.加载JSON 文件，CSV、TSV 和 XML，json 的import 不需要特殊处理，但是CSV和TSV的处理却要csv-loader 和 xml-loader进行处理
<br/>
5.html-webpack-plugin 重新生成新的index.html,script会根据entry写的动态填充到首页qingc
<br/>
6.clean-webpack-plugin 清除旧的文件夹,之前打包的文件里面没用的文件会被删除。
<br/>
7.source map 追踪报错的源文件
<br/>
8. https://www.webpackjs.com/configuration/dev-server
webpack-dev-server /webpack-dev-middleware获取服务，可以修改端口号和入口文件目录，允许访问的host名
<br/>
9.启用热加载  HMR，只更新修改的模块，而不是整个都更新
<br/>
10.tree shaking package.json 里面添加 "sideEffects": false, 就会在打包的时候自动删除多余的代码(没用被import的模块)，如果配置数组，数组里面的文件就不会被删除，其他的就会被删除。 package.json -p 模式可以实现代码的压缩或者export配置mode: "production"

<div style="margin-top: 120px">
打包编译JS
压缩合并css
图片打包处理
rem手机适配
postcss  
多页面导航生成
模块热替换
</div>
<br/>
待看：
https://github.com/jantimon/html-webpack-plugin
<br/>
<div>WebpackManifestPlugin</div>
https://github.com/danethurber/webpack-manifest-plugin
<br/>
https://www.webpackjs.com/concepts/manifest/
<br/>
<div>缓存</div>
https://www.webpackjs.com/guides/caching/
<br/>
<div>输出</div>
https://www.webpackjs.com/configuration/output/
<br/>
<div>Source Map更多配置</div>
https://www.webpackjs.com/configuration/devtool/
<br/>
<div>热加载模块</div>
https://www.webpackjs.com/guides/hot-module-replacement/
热模块想要html更新刷新的内容，需要自己在js里面写，但是如果使用框架，就不用自己配置，下面是框架

React Hot Loader：实时调整 react 组件。<br/>
Vue Loader：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。<br/>
Elm Hot Loader：支持用于 Elm 程序语言的 HMR。<br/>
Redux HMR：无需 loader 或插件！只需对 main store 文件进行简单的修改。<br/>
Angular HMR：No loader necessary! A simple change to your main NgModule file is all that's required to have <br/>full control over the HMR APIs.没有必要使用 loader！只需对主要的 NgModule 文件进行简单的修改，由 HMR API 完<br/>全控制。
<div>webpack-merge模块</div>
