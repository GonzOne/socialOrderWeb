(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueStaffController', VenueStaffController);

    /** @ngInject */
    function VenueStaffController(admin, staff, appGlobalVars, dataTemplates, venueService, profileService, Auth, blockUI, uiGridConstants, $log) {
        var vm = this;
        vm.venueId = appGlobalVars.getVenueId();//need to refactor this out!
        //export
        vm.updateGrid = updateGrid;

        (function initController() {
            createAdminList(admin);
            createStaffList(staff);
        })();
        function createStaffList(inArray) {
            $log.log('createStaffList in Array ', inArray)
            vm.venueStaff = [];
            var len = inArray.length;
            $log.log('createStaffList array length ', inArray.length)
            for (var i=0; i < len; i++) {
                var uid  = inArray[i].uid;
                $log.log('getting uid ', uid)

                profileService.getVenueStaffProfileById(uid).then(function (data) {
                    $log.log('createStaffList returned ',data);
                    vm.venueStaff.push(data);

                }, function (error) {
                    $log.log('createStaffList returned error : ', error);
                })

            }
        }
        function createAdminList(inArray){
            $log.log('createAdminList ', inArray)
            vm.venueAdmin = [];
            var len = inArray.length;
            $log.log('createAdminList array length ', inArray.length)
            for (var i=0; i < len; i++) {
                var uid  = inArray[i].uid;
                profileService.getVenueAdminProfileById(uid).then(function (data) {
                    $log.log('createAdminList returned ',data);
                    vm.venueAdmin.push(data);

                }, function (error) {
                    $log.log('createAdminList returned error : ', error);
                })

            }

        }

        function updateGrid (val) {
            $log.log('VenueStaffController : updateGrid ', val)
            var vKey =  appGlobalVars.getVenueId();
            switch (val) {
                case 'venue_admin':

                    venueService.getVenueAdminListById(vKey).then(function (data) {
                        $log.log('admin list', data)
                        createAdminList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                    break;
                case 'venue_staff':

                    venueService.getVenueStaffListById(vKey).then(function (data) {
                        $log.log('staff list', data)
                        createStaffList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                    break;
                default:
            }
        }

    }
})();