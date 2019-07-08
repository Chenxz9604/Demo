//使用ui.router实现路由机制
var loginapp = angular.module('loginapp', ['ui.router']);

loginapp.controller('routselect', function ($scope) {
    $scope.message = '配置完成';
});

loginapp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
        .when('/', '/login')//默认页面
        .otherwise("/login");//重定向

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'index1.html',
            controller: 'loginC'
        })
        .state('success', {
            url: "/success",
            templateUrl: 'index2.html',
            controller: 'loginsuccessC'
        });
});

loginapp.controller('loginC', function ($scope, $state,$http) {
//验证码（因为此页面实现的是登陆获取权限操作数据库）
    $scope.unicode = (function () {
        var codes = [];
        //数字
        for (var i = 48; i < 57; codes.push(i), i++);
        //大写字母
        for (var i = 60; i < 90; codes.push(i), i++);
        //小写字母
        for (var i = 97; i < 122; codes.push(i), i++);
        var arr = [];
        for (var i = 0; i < 4; i++) {
            var index = Math.floor(Math.random() * (61) + 0);
            var char = String.fromCharCode(codes[index]);
            arr.push(char);
        }
        var code = arr.join("");
        $scope.yzm = code;
    })();

    $scope.ajax = function (user, password, yzm) {
        if (yzm == $scope.yzm) {
            $http({
                method: 'GET',
                url: 'login',//对应的代理地址通过代理获取跨域接口http://139.224.235.133:8099/login
                headers: {
                    "Authorization": "Basic " + btoa(user + ":" + password)
                },
            }).then(function successCallback(response) {
                console.log(response);
                $state.go('success');//页面跳转
                //注意：使用路由是文件名不可用中文
            })
        }
        else {
            alert('请输入正确的验证码')
        }
    }
});
