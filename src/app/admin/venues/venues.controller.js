(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AdminVenuesController', AdminVenuesController);

    /** @ngInject */
    function AdminVenuesController($state, appGlobalVars, venueService, dataTemplates, $log) {
        var vm = this;
        vm.sortType = 'name';
        vm.sortReverse  = false;
        vm.searchVenue = '';
        vm.pageNumber = 1;
        vm.limit = 50;
        /*
        vm.venueColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-venue-button.html', width: 34 },
            { name: 'Venue', field: 'name',minWidth: 150, enableCellEdit: false },
            { name: 'Address', field: 'address', minWidth: 150, enableCellEdit: false  },
            { name: 'City', field: 'city', minWidth: 100, enableCellEdit: false  },
            { name: 'Zip', field: 'zipcode', minWidth: 100, enableCellEdit: false  },
            { name: 'Menu Id', field: 'menu_id', minWidth: 50, enableCellEdit: false  },
            { name: 'Active', field: 'active', minWidth: 25, enableCellEdit: false  }];
       */
        //export
        vm.editVenue =  editVenue;
        //vm.editVenueRow = editVenueRow;
        vm.addVenue = addVenue;
        vm.getPages = getPages;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;

        (function initController() {
            $log.log('AdminVenuesController init');
            venueService.getNumberOfVenues().then(function (num){
               $log.log('number of venues', num);
               vm.totalpages = Math.ceil(num/vm.limit);
               $log.log('total pages ', vm.totalpages);
            }, function (error) {
               $log.log('error', error);
            });

            venueService.getAllVenues().then(function (data) {
              //$log.log('Retieved Venues :', data);
              vm.venueData = data;
            }, function (error) {
                $log.log('Error:', error);
            });
            /*
            venueService.paginationNext(vm.limit).then(function (data) {
                //$log.log('Retieved Venues :', data);
                vm.venueData = data;
            }, function (error) {
                $log.log('Error:', error);
            })
             */
        })();

        function editVenue(key) {
            appGlobalVars.setVenueId(key);
            $state.go('admin.detail')
        }
        function nextPage () {
            vm.pageNumber++;
            if (vm.pageNumber < vm.totalpages ) {
                venueService.paginationNext(vm.limit).then(function (data) {
                    //$log.log('Retieved Venues :', data);
                    vm.venueData = data;
                }, function (error) {
                    $log.log('Error:', error);
                })
            } else{
                vm.pageNumber = vm.totalpages-1;
            }
        }

        function prevPage() {
            vm.pageNumber--;
            $log.log('huh');
            if (vm.pageNumber > 0 ) {
                $log.log('wtf', vm.venueData[0].name);
                venueService.paginationPrev(vm.venueData[0].name, vm.limit).then(function (data) {
                    //$log.log('Retieved Venues :', data);
                    vm.venueData = data;
                }, function (error) {
                    $log.log('Error:', error);
                })
            } else{
                vm.pageNumber = 1;
            }
        }
        /*
        function editVenueRow(grid, row) {
            $log.log('editVenueRow : g ', grid, ' r: ', row, ' key ', row.entity.key)
            appGlobalVars.setVenueId(row.entity.key);
            $state.go('admin.detail');


        }
        */
        function getPages (num) {
            return new Array(num);
        }
        function addVenue(){
            $log.log('addVenue ');
            appGlobalVars.clearVenue();
            $state.go('admin.detail');
        }
        $log.log('admin venues controller loaded ',vm)

    }
})();