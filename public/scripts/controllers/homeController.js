angular.module('SpoopyDungeon')
    .controller('HomeController', [
        '$http', 
        homeController
    ]);

function homeController($http) {
    var hCtrl = this;

    hCtrl.login = function () {
        $http.post('/auth/login', hCtrl.loginUser)
            .then(function(responseData){
               
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