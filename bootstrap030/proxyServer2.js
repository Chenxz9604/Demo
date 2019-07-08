// proxyServer.js  代理服务器文件
// 创建一个代理服务器
const http = require( "http" );
const url = require( "url" );

// 创建一个代理服务器直接和浏览器直接交互，接收客户端请求
let proxy = http.createServer( function ( preq, pres ) {
    if( preq.url !== "/favicon.ico" ){
        let url_parts = url.parse( preq.url );
        let options = {
            url: "http://127.0.0.1",
            port: "1344",
            method: preq.method,
            headers: preq.headers,
            path: url_parts.pathname
        }

        // 转发给企业服务器端
        let proxyRequest = http.request( options, function ( cres ) {
            pres.writeHead( cres.statusCode, cres.headers );
            let body = "";
            // 收到企业服务器的响应
            cres.on( "data", function ( chunk ) {
                body += chunk;
            } );
            cres.on( "end", function () {
                // 将企业服务器的响应结果转发给浏览器
                pres.end( body );
            } )
        } )
        proxyRequest.end();
    }
} )
proxy.on( "error", function ( e ) {
    console.log( e );
} )
proxy.listen( 1343, ()=>{ console.log( "service is running at port 1343." ); } );
