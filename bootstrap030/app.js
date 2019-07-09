

/*//  redis 中存储 session
var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
app.listen(5000);

app.use(session({
    // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
    // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
    // 编写自己的 store 也很简单
    store: new redisStore(),
    secret: 'somesecrettoken'
}));

app.get('/', function (req, res) {
    if(req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send('欢迎第一次来这里');
    }
});*/

/*
// 在内存中存储 session

var express = require('express');
// 首先引入 express-session 这个模块
var session = require('express-session');

var app = express();
app.listen(5000);

// 按照上面的解释，设置 session 的可选参数
app.use(session({
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000 }
}));

app.get('/', function (req, res) {

    // 检查 session 中的 isVisit 字段
    // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
    if(req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send("欢迎第一次来这里");
        console.log(req.session);
    }
});*/



// express 中的 cookie

var express = require('express');
// 首先引入 cookie-parser 这个模块
var cookieParser = require('cookie-parser');

var app = express();
app.listen(3000);

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串（下面会提到 signedCookies）
// options 传入上面介绍的 cookie 可选参数
app.use(cookieParser());

app.get('/', function (req, res) {
    //res.sendFile( __dirname + "/src/" + "index.html" );
    // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
    // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
    if (req.cookies.isVisit) {
        console.log(req.cookies);

        //res.send("再次欢迎访问");
        res.sendFile( __dirname + "/src/" + "index.html" );
    } else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.sendFile( __dirname + "/src/" + "login10.html" );
        //res.send("欢迎第一次访问");
    }
});
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/src/" + "index.html" );
});
app.get('/index.html', function (req, res) {
    if (req.cookies.isVisit) {
        console.log(req.cookies);

        //res.send("再次欢迎访问");
        res.sendFile( __dirname + "/src/" + "index.html" );
    } else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.sendFile( __dirname + "/src/" + "login10.html" );
        //res.send("欢迎第一次访问");
    }
});

app.get('/login.html', function (req, res) {
    console.log("3333333");
    res.sendFile( __dirname + "/src/" + "login.html" );
});







/*
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app  = express()
app.use(cookieParser());
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'love'
}));

app.use(function(req,res,next){
    if (!req.session.user) {
        if(req.url=="/login"){
            next();//如果请求的地址是登录则通过，进行下一个请求
        }
        else
        {
            res.redirect('/login');
        }
    } else if (req.session.user) {
        next();
    }
});

app.get('/login',function(req,res){
    res.render("login");
});

app.post('/login',function(req,res){
    if(req.body.username=="love" && req.body.password=="love"){
        var user = {'username':'love'};
        req.session.user = user;
        res.redirect('/admin/app/list');
    }
    else
    {
        res.redirect('/login');
    }
});

app.get('/logout',function(req,res){
    req.session.user = null;
    res.redirect('/login');
});
*/
