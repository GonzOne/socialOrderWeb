(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueStaffController', VenueStaffController);

    /** @ngInject */
    function VenueStaffController(appGlobalVars, dataTemplates, venueService, profileService, Auth, blockUI, uiGridConstants, $log) {
        var vm = this;
        vm.venueAdminColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-venue-detail-admin-button.html', width: 34 },
            { name: 'First', field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }
        ];

        vm.venueStaffColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-venue-detail-staff-button.html', width: 34 },
            { name: 'First',field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }
        ];
        //export
        vm.editVenueAdminRow = editVenueAdminRow;
        vm.editVenueStaffRow = editVenueStaffRow;
        vm.updateGrid = updateGrid;

        (function initController() {

            $log.log('init venue detail controller get venue id ', appGlobalVars.getVenueId());
            if (!appGlobalVars.getVenueId()) {
                $log.log('we dont have a venue id yet')
            } else {
                $log.log('we have a venue id ', appGlobalVars.getVenueId())

                getVenue();
            }

        })();
        function editVenueAdminRow(grid, row) {
            $log.log('editVenueAdminRow : g ', grid, ' r: ', row)
        }

        function editVenueStaffRow(grid, row) {
            $log.log('editVenueAdminRow : g ', grid, ' r: ', row)
        }
        function getVenue (){
            var vKey =  appGlobalVars.getVenueId();
            $log.log('VenueDetailController - getVenue : vKey ',vKey);
            venueService.getVenueById(vKey).then(function (data) {
                $log.log('getVenue - Retrieved venue :', data);
                vm.venue = data;

                if (typeof data.admin != 'undefined'){
                    $log.log('admin ',data.admin);
                    venueService.getVenueAdminListById(vKey).then(function (data) {
                        $log.log('admin list', data)
                        createAdminList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                }
                $log.log('has menu ',data.menu_id )
                //display edit or add button for menu
                if (typeof data.menu_id  != 'undefined'){
                    vm.menuActive = true;

                }else {
                    vm.menuActive = false;
                }

                //display staff
                if (typeof data.staff != 'undefined'){
                    $log.log('staff ',data.staff);
                    venueService.getVenueStaffListById(vKey).then(function (data) {
                        $log.log('staff list', data)
                        createStaffList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                }

            }, function (error) {
                $log.log('Error:', error);
            })
        }
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
            $log.log('venueDetailController : updateGrid ', val)
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