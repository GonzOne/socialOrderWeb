(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AdminNavbarController', AdminNavbarController);

    /** @ngInject */
    function AdminNavbarController($state, Auth, appGlobalVars, profileService, $log) {
        var vm = this;
        vm.username;
        //export
        vm.logout = logout;
        (function initController() {
            /*
            var user = profileService.getAdminProfile(appGlobalVars.getUserId());
            user.$loaded()
                .then(function (data) {
                    $log.log('Retieved user Profile :', data);
                    vm.username = data.firstName;
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });
            */
            profileService.getAdminProfileById(appGlobalVars.getUserId()).then(function (data) {
                $log.log('Retieved user Profile :', data);
                vm.username = data.firstName;
            }, function (error) {
                $log.log('Error:', error);
            })

        })();
        function logout () {
          $log.log('AdminNavbarController log out ');
            appGlobalVars.clearSession();
           $state.go('logout');
        }

    }
})();