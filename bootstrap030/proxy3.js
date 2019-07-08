/**
 * Created by zhaohuan on 2017/4/19.
 */
// (function creatserver(pathurl) {

var http=require('http');
var fs=require('fs');
var mime=require('mime');
var urls=require('url');
var pathurl='/Users/zhaohuan/login';
//以上路径为html，css，js的路径
//mark:在终端输入pwd获取路径
var httpProxy = require('http-proxy');


var proxy = httpProxy.createProxyServer({
    target: 'http://139.224.235.133:8099/',   //接口地址
    //创建一个代理，从以上路径获取数据。
});

//本地客户端请求服务器端的数据(跨域):客户端向代理服务器发起请求，代理服务器接到请求，向目标服务器发起请求。

http.createServer(function (req,res) {

    var url=urls.parse(req.url).pathname;
    //req.url:localhost:8116/index.html
    //url:/index.html
    var realPath=pathurl+url;


    if(url.indexOf("user") > 0||url.indexOf("login") > 0){
        //当请求为user，login需要代理服务器请求远端服务器数据
        proxy.web(req, res);
        return;
    }

    fs.readFile(realPath,function (err,data) {
        if(data){
            res.writeHead(200,{
                'Content-type':mime.lookup(realPath)
                //获取请求文件后缀
            });
            res.end(data);
        }
    });
}).listen(8888);
console.log('服务器启动');
