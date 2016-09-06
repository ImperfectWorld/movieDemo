# movieDemo
Node.js + express + mongoDB/Mongoose + Bootstrap

<2016/9/5新增>
修改了一个bug
删除了这个bug


请求过程概述：
    1.项目app启动命令npm start  执行package.json文件中"start": "node ./bin/www"命令
    2.bin/www中包含了启动项目的脚本文件，服务器的创建、端口的设置与监听等脚本。
    3.输入请求链接后，经由app.js入口文件和路由入口文件routes/index.js，针对请求路径分配到制定的路由控制器监控。
    4.路由控制器针对请求req数据进行解析操作，服务器返回响应数据res，并通过指定的jade模版进行前台渲染。

Step1：配置环境

                安装node.js/express/mongoDB

Step2：建立项目的目录结构
                
                -bin, 存放启动项目的脚本文件
                -controller,路由控制器目录
                -model, 定义模型和schmea的目录
                -node_modules, 存放所有的项目依赖库。
                -public，静态文件(css,js,img)
                -routes，路由文件(MVC中的C,controller)--路由入口，通过这个入口把请求将请求分发到各个控制器
                -views，页面文件(jade模板)--jade模版的静态文件
                package.json，项目依赖配置及开发者信息
                app.js，应用核心配置文件--app的入口文件
        
Step3 ：配置项目依赖package.json

                配置项目依赖文件package.json；利用npm install 安装依赖
        
Step4：配置入口文件app.js

                加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载

                var express = require('express');
                var path = require('path');
                var favicon = require('serve-favicon');
                var logger = require('morgan');
                var cookieParser = require('cookie-parser');
                var bodyParser = require('body-parser');
                var http = require("http");
                //加载路由控制
                var routes = require('./routes/index');

                创建项目实例
                 
                var app = express();
                
                 定义jade模板引擎和模板文件位置
                 
                app.set('views', path.join(__dirname, 'views'));
                app.set('view engine', 'jade');
                
                定义日志和输出级别
                app.use(logger('dev'));
                定义数据解析器
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: false }));
                定义cookie解析器
                app.use(cookieParser());
                定义静态文件目录
                app.use(express.static(path.join(__dirname, 'public')));

****避免app.js过于臃肿，将route中间件独立出来，用routes/index.js做为全部路由的引用入口****
                
                routes(app)；

                404/500错误处理
                
                app.use(function(req, res, next) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                });

                if (app.get('env') === 'development') {
                    app.use(function(err, req, res, next) {
                        res.status(err.status || 500);
                        res.render('error', {
                            message: err.message,
                            error: err
                        });
                    });
                }
                app.use(function(err, req, res, next) {
                    res.status(err.status || 500);
                    res.render('error', {
                        message: err.message,
                        error: {}
                    });
                });

                创建HTTP服务器实例,启动网络服务监听端口
                
                                http.createServer(app).listen(3000);
                
                输出模型app
                
                                module.exports = app;
                                
                备注：使用routes(app)时，对应的routes里写法为：

                module.exports=function(app){
                
                  app.get('/',function(req,res){
                    
                          });
                        //.......其它配置
                };

Step5：配置路由引用入口文件routes/index.js

链接：http://www.w3cfuns.com/notes/16795/54a953e9adbd7d3cf66deb05db071f99

Step6：安装配置mongoDB/mongoose

链接：http://www.w3cfuns.com/notes/16795/aaa7b40a738f73b8d82e0f9fb6317067

Stap7：利用Bootstrap编写jade模版（以index.jade为例）

链接：http://www.w3cfuns.com/notes/16795/a3910fdf146a430bee8d08a8e8c19824

Step8：配置路由控制器movie-controller.js

链接：http://www.w3cfuns.com/notes/16795/7db0f145c354b5ef2598cb9d4b80dc38
