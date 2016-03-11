(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AdminProfilesController', AdminProfilesController);

    /** @ngInject */
    function AdminProfilesController($location, $anchorScroll, profileService, $log) {
        var vm = this;
        //export
        vm.editAdminRow = editAdminRow;


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

        })();
        function editAdminRow() {

        }

    }
})();