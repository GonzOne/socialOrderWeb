(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AdminVenuesController', AdminVenuesController);

    /** @ngInject */
    function AdminVenuesController($state, blockUI, venueService, dataTemplates, $log) {
        var vm = this;
        vm.isVenuesModCollapsed = false;
        vm.sortType = 'name';
        vm.sortReverse  = false;
        vm.searchVenue = '';
        vm.pageNumber = 1;
        vm.limit = 50;
        //export
        vm.editVenue =  editVenue;
        vm.addVenue = addVenue;
        vm.toggleModule = toggleModule;
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
        function toggleModule () {
            vm.isVenuesModCollapsed = !vm.isVenuesModCollapsed;
        }
        function editVenue(key) {
            $state.go('admin.detail', {venueId: key});
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
        function getPages (num) {
            return new Array(num);
        }
        function addVenue(){
            blockUI.start();
            var tmpl = dataTemplates.getVenueTmpl();
            venueService.createVenue(tmpl).then(function (key) {
                $log.log('venue created successfuly',key);
                blockUI.stop();
                $state.go('admin.detail', {venueId: key});
            }, function (error) {
                vm.dataLoading = false;
                blockUI.stop();
                $log.log('venue returned ', error);
                //display message
            })
        }

    }
})();