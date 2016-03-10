(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('tokenAuth', tokenAuth);

    /** @ngInject */
    function tokenAuth($q, localStorageService, Auth, $log) {

        var isSessionValid = function () {
            $log.log('checking session ')
            var deferred = $q.defer();
            var token = localStorageService.get('token');
            Auth.$authWithCustomToken(token).then(function (authData) {
                $log.log('Logged in as:', authData);
                deferred.resolve(authData);
            }).catch(function (error) {
                $log.log('Authentication failed:', error);
                deferred.reject();
            });
            return deferred.promise;
        }

        return {
            isSessionValid:isSessionValid
        }
    }

})();

/*
 'use strict';
 angular.module('main')
 .factory('TokenAuth', function ($q, localStorageService, Auth, AppGlobals) {
 return {
 isSessionValid: function () {
 console.log('checking session ')
 var deferred = $q.defer();

 Auth.$authWithCustomToken(token).then(function (authData) {
 console.log('Logged in as:', authData);
 AppGlobals.setUserId(authData.uid)
 deferred.resolve(authData);
 }).catch(function (error) {
 console.log('Authentication failed:', error);
 AppGlobals.isLoggedIn(false);
 deferred.reject();
 });

 return deferred.promise;
 },
 clearSession: function () {
 localStorageService.remove('token');
 }
 }

 });
 */
