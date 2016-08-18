angular.module('SpoopyDungeon')
    .controller('HomeController', [
        '$http',
        'authFactory', 
        homeController
    ]);

function homeController($http, authFactory) {
    var hCtrl = this;

    hCtrl.login = function () {
        $http.post('/auth/login', hCtrl.loginUser)
            .then(function(responseData){
                if(responseData.data.token){
                    authFactory.setToken(responseData.data.token);
                }
            });
    }

    hCtrl.signup = function () {
        if (hCtrl.newUser && hCtrl.newUser.password && hCtrl.newUser.confirm && (hCtrl.newUser.password === hCtrl.newUser.confirm)) {
            $http.post('/api/users', hCtrl.newUser)
                .then(function(responseData){

                });
        }
    }
}