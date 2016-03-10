(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueDashboardController', VenueDashboardController);

    /** @ngInject */
    function VenueDashboardController(venue, appGlobalVars, profileService, $log) {
        var vm = this;
        vm.venue = venue;

        (function initController() {
            $log.log('VenueDashboardController : venue id : ', venue);
            //for now this assists the sidebar to navigate to its route passing in keys
            appGlobalVars.setVenueId(vm.venue.key);
            appGlobalVars.setMenuId(vm.venue.menu_id);

             /*
            $log.log('init VenueDashboardController get user profile');
            var uid = appGlobalVars.getUserId();
            profileService.getVenueAdminProfileById(uid).then(function (data) {
                $log.log(' - Retrieved user Profile :', data);
                $log.log('venue id : ', data.venue_id)
                if (typeof data.venue_id === "undefined") {
                    //if (data.venue_ids === '') {
                    $log.log('has no asscociated venue');
                    vm.displayWelcome = true;

                } else {
                    vm.displayWelcome = false;
                    $log.log(data.venue_id);
                    appGlobalVars.setVenueId(data.venue_id);
                }

            }, function (error) {
                $log.log('createAdminList returned error : ', error);
            })
            */
            /*
            var userProfile =  profileService.getVenueAdminProfile(appGlobalVars.getUserId());
            userProfile.$loaded()
                .then(function (data) {
                    $log.log(' - Retrieved user Profile :', data);
                    $log.log('venue id : ', data.venue_id)
                    if (typeof data.venue_id === "undefined") {
                    //if (data.venue_ids === '') {
                        $log.log('has no asscociated venue');
                        vm.displayWelcome = true;

                    } else {
                        vm.displayWelcome = false;
                        $log.log(data.venue_id);
                        appGlobalVars.setVenueId(data.venue_id[0]);
                    }
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });
              */
        })();
        $log.log('venue dashboard controller loaded ',vm)

    }
})();