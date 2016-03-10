(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AdminDashboardController', AdminDashboardController);

    /** @ngInject */
    function AdminDashboardController($state, blockUI,  appGlobalVars, venueService, profileService,  $log) {
        var vm = this;
        vm.sortType = 'role';
        vm.sortReverse  = false;
        vm.searchUsers = '';
        vm.venueCount;
        vm.lastEntries;
        vm.staffCount;
        vm.usersCount;
        vm.lastUserRegistrations = [];
        //export
        vm.editVenue =  editVenue;
        (function initController() {
            $log.log('AdminDashboardController init', vm)
            $log.log('AdminVenuesController init');
            venueService.getAllVenues().then(function (data) {
                //$log.log('Retieved Venues :', data);
                vm.venueCount = data.length;
                vm.lastTenEntries = data.slice(data.length - 10, data.length);
                $log.log('lastTenEntries ', vm.lastTenEntries);
            }, function (error) {
                $log.log('Error:', error);
            })
            createSystemUserList();
        })();
        function editVenue(key) {
            $state.go('admin.detail', {venueId: key});
        }
        function addToUserArray (inArray) {
            var len = inArray.length;
            for (var i = 0; i < len; i++) {
              vm.lastUserRegistrations.push(inArray[i]);
            }
        }
        function createSystemUserList () {
            //super admin
            profileService.getAllAdmin().then(function (data) {
                $log.log('getAllAdmin : returned ', data);
                var adminArray = data.slice(data.length - 2, data.length);
                adminArray[0].role = 'Super Admin';
                if (adminArray[1]) {
                    adminArray[1].role = 'Super Admin';
                }
                addToUserArray (adminArray);
            }, function (error) {
                $log.log('Error:', error);
            });
            //venue admin
            profileService.getAllVenueAdmins().then(function (data) {
                $log.log('getAllVenueAdmins : returned ', data);
                var vAdminArray = data.slice(data.length - 2, data.length);
                vAdminArray[0].role = 'Venue Admin';
                if (vAdminArray[1]) {
                  vAdminArray[1].role = 'Venue Admin';
                }
                addToUserArray (vAdminArray);
            }, function (error) {
                $log.log('Error:', error);
            });
            //staff
            profileService.getAllStaff().then(function (data) {
                $log.log('getAllStaff : returned ', data);
                vm.staffCount = data.length;
                var staffArray = data.slice(data.length - 2, data.length);
                staffArray[0].role = 'Staff';
                if (staffArray[1]) {
                  staffArray[1].role = 'Staff';
                }
                addToUserArray (staffArray);
            }, function (error) {
                $log.log('Error:', error);
            });
            //patrons
            profileService.getAllSystemUsers().then(function (data) {
                $log.log('getAllSystemUsers : returned ', data);
                vm.usersCount = data.length;
                var sysArray = data.slice(data.length - 2, data.length);
                sysArray[0].role = 'User';
                if (sysArray[1]) {
                  sysArray[1].role = 'User';
                }
                addToUserArray (sysArray);
            }, function (error) {
                $log.log('Error:', error);
            });


        }

    }
})();