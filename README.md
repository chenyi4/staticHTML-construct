# staticHTML-construct

webpack和grunt 和 gulp 都能构建项目

<br/>
=========common文件夹===========
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
<div style="margin-top: 120px">
打包编译JS
压缩合并css
图片打包处理
rem手机适配
postcss
多页面导航生成
模块热替换
</div>