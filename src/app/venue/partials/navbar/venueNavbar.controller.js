(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueNavbarController', VenueNavbarController);

    /** @ngInject */
    function VenueNavbarController($state, profileService, appGlobalVars ,Auth, $log) {
        var vm = this;
        vm.username;
        //export
        vm.logout = logout;

        (function initController() {
            //I should remove this and use a global var since the profile is being requested in the venue / dashboard
            profileService.getVenueAdminProfileById(appGlobalVars.getUserId()).then(function (data) {
                $log.log('VenueNavbarController - Retieved owner Profile :', data);
                vm.username = data.firstName;
            }, function (error) {
                $log.log('Error:', error);

            })
            /*
            user.$loaded()
                .then(function (data) {
                    $log.log('VenueNavbarController - Retieved owner Profile :', data);
                    vm.username = data.firstName;
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });
                */

        })();
        function logout () {
            $log.log('VenueNavbarController log out ');
            appGlobalVars.clearSession();
            $state.go('logout');
        }


    }
})();