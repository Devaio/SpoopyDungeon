angular.module('SpoopyDungeon')
    .controller('LoginController', [
        '$http', 
        loginController
    ]);

function loginController($http) {
    var lCtrl = this;
    console.log('login!')
    lCtrl.login = function () {
        $http.post('/auth/login', lCtrl.loginUser)
            .then(function(responseData){
               if(responseData.data._id){
                   window.location.href="/home"
               }
            });
    }

    lCtrl.signup = function () {
        if (lCtrl.newUser && lCtrl.newUser.password && lCtrl.newUser.confirm && (lCtrl.newUser.password === lCtrl.newUser.confirm)) {
            $http.post('/api/users', lCtrl.newUser)
                .then(function(responseData){

                });
        }
    }
}