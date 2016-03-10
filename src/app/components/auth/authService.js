(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .factory('AuthService', AuthService);
    /** @ngInject */
    function AuthService($q, $firebaseAuth, KEYS, profileService, $log) {

        var usersRef = new Firebase(KEYS.firebase);
        //this.cachedUser = usersRef.getAuth();
        var cachedUser = $firebaseAuth(usersRef);
        var userRole;

        //this.isLoggedIn = function(){
            //return !!$firebaseAuth(usersRef);
        //};
        function getUser() {
            return cachedUser || usersRef.getAuth();
        }
        function isLoggedIn(){
            return !!usersRef.getAuth();
        }
        function loginWithPW (userObj) {
            $log.log('loginWithPW user : ', userObj)
            var deferred = $q.defer();
            usersRef.authWithPassword(userObj,
            function(error, authData) {
                    if (error) {
                        var errorMsg;
                        switch (error.code) {
                            case 'INVALID_EMAIL':
                                errorMsg = 'The specified user account email is invalid.';

                                break;
                            case 'INVALID_PASSWORD':
                                errorMsg = 'The specified user account password is incorrect.';
                                break;
                            case 'INVALID_USER':
                                errorMsg = 'The specified user account does not exist.';
                                break;
                            default:
                                errorMsg = 'Invalid email address';
                        }
                        deferred.reject(errorMsg);
                    } else {
                        $log.log("Authenticated successfully with payload:", authData);
                        cachedUser =  authData;
                        profileService.getMetaProfileById(cachedUser.uid).then(function (data) {
                            userRole = data.role;
                            $log.log('AuthService is admin :', data.role);
                        }, function (error) {
                            $log.log('Error:', error);
                        });

                        deferred.resolve(authData);
                    }
                });
            return deferred.promise;
        }
        function logout(){
            usersRef.unauth();
            cachedUser = null;
            return true;
        }
        function isAdmin() {
            $log.log('isAdmin ', userRole)
            var bool = false;
            if(userRole === 0){
                bool = true;
            }
           return bool;
        }
        return {
            loginWithPW: loginWithPW,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            logout: logout,
            isAdmin: isAdmin
        }
    }


})();
