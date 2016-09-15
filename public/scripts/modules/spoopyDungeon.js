
angular.module('SpoopyDungeon', ['ngRoute'])
    .config(['$routeProvider', spoopyConfig]);

function spoopyConfig($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : '/html/home.html',
            controller  : 'HomeController as hCtrl'
        })
        .when('/dungeon', {
            templateUrl : '/html/dungeon.html',
            //controller : 'DungeonController as dCtrl'
        })
        .when('/store', {
            templateUrl : '/html/store.html',
            // controller : 'DungeonController as dCtrl'
        })
        .when('/ancestry', {
            templateUrl : '/html/ancestry.html',
            // controller : 'DungeonController as dCtrl'
        })
        .when('/settings', {
            templateUrl : '/html/settings.html',
            // controller : 'DungeonController as dCtrl'
        });
}
