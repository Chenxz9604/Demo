// server.js  企业服务器
const http = require( "http" );
let app = http.createServer( function ( req, res ) {
    if( req.url !== "/favicon.ico" ){
        res.writeHead( 200, {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
        } )
        res.write( "你好呢。" );
        res.end();
    }
} ).listen( 1344, ()=>{ console.log( "service is running at port 1334" ); } )
