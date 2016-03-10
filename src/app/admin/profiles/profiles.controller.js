(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AdminProfilesController', AdminProfilesController);

    /** @ngInject */
    function AdminProfilesController($location, $anchorScroll, profileService, $log) {
        var vm = this;
        vm.adminColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-admin-button.html', width: 34 },
            { name: 'First', field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }];
        vm.venueAdminColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-admin-button.html', width: 34 },
            { name: 'First', field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }];
        vm.venueStaffColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-admin-button.html', width: 34 },
            { name: 'First', field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }];
        vm.patronsColumnDef = [
            { name: 'First', field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  },
            { name: 'D.O.B', field: 'dateOfBirth', minWidth: 150, enableCellEdit: false  },
            { name: 'Sex', field: 'sex', minWidth: 150, enableCellEdit: false  }
        ];
        //export
        vm.editAdminRow = editAdminRow;
        vm.gotoAnchor = gotoAnchor;

        (function initController() {
            $log.log('AdminProfilesController init')
            //super admin
            profileService.getAllAdmin().then(function (data) {
                $log.log('getAllAdmin : returned ', data);
                vm.adminData = data;
            }, function (error) {
                $log.log('Error:', error);
            });
            //venue admin
            profileService.getAllVenueAdmins().then(function (data) {
                $log.log('getAllVenueAdmins : returned ', data);
                vm.venueAdmin = data;
            }, function (error) {
                $log.log('Error:', error);
            });
            //staff
            profileService.getAllStaff().then(function (data) {
                $log.log('getAllStaff : returned ', data);
                vm.staffData = data;
            }, function (error) {
                $log.log('Error:', error);
            });
            //patrons
            profileService.getAllSystemUsers().then(function (data) {
                $log.log('getAllSystemUsers : returned ', data);
                vm.userData = data;
            }, function (error) {
                $log.log('Error:', error);
            });
            /*
            var admins =  profileService.getAllAdmin();
            admins.$loaded()
                .then(function (data) {
                    $log.log('Retieved admin :', data);
                    vm.adminData = data;
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });

           var venueAdmins = profileService.getAllVenueAdmins();
            venueAdmins.$loaded()
                .then(function (data) {
                    $log.log('Retieved venue admins :', data);
                    vm.venueAdmin = data;
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });
           var staff = profileService.getAllStaff();
            staff.$loaded()
                .then(function (data) {
                    $log.log('Retieved staff :', data);
                    vm.staffData = data;
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });

            var patrons = profileService.getAllSystemUsers();
            patrons.$loaded()
                .then(function (data) {
                    $log.log('Retieved patrons :', data);
                    vm.userData = data;
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });
             */
        })();

        function gotoAnchor (val){
            $log.log('gotoAnchor ', val)
            $location.hash(val);
            $anchorScroll();
        }
        function editAdminRow(grid, row) {
            $log.log('editAdminRow : g ', grid, ' r: ', row, ' obj ')
        }

    }
})();