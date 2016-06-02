(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('addWine', addWine);

    /** @ngInject */
    function addWine() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/addWine/addWineTmpl.html',
            scope: true,
            controller: AddWineController,
            controllerAs: 'vm',
            bindToController: {
                wineType: '@',
                brandPlaceholder: '@',
                brandDesc: '@',
                brandRegion: '@',
                brandVarietal: '@',
                brandCountry: '@',
                brandYear: '@',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function AddWineController(appGlobalVars, dataTemplates, menuService, blockUI, $log) {
            var vm = this;
            vm.isToggled = false;
            vm.dataLoading = false;
            vm.product = {
                name:'',
                cost:'',
                bottle_cost:'',
                varietal:'',
                region:'',
                country:'',
                year:'',
                desc:'',
                active: true
            }
            //export
            vm.addWineItem = addWineItem;
            vm.onDisplayChange = onDisplayChange;
            vm.toggleForm = toggleForm;
            //
            function resetForm() {
                vm.product = {
                    name: '',
                    cost: '',
                    bottle_cost: '',
                    varietal: '',
                    region: '',
                    country: '',
                    year: '',
                    desc: '',
                    active: true
                }
            }
            function onDisplayChange(val){
                $log.log('onDisplayChange', val);
                vm.product.active = val;
            }
            function addSparklingwine (tmpl) {
                $log.log('addSparklinewine ', tmpl);
                menuService.addSparklingWine(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('sparkling wine added to db successfuly',b_id);
                    vm.ctrlFn({value : 'sparkling'})
                    blockUI.stop();
                    resetForm();
                    toggleForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating sparkling wine returned ', error);
                })
            }
            function addWhitewine (tmpl) {
                $log.log('addWhitewine : tmpl', tmpl);
                menuService.addWhiteWine(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('white wine added to db successfuly',b_id);
                    vm.ctrlFn({value : 'white'})
                    blockUI.stop();
                    resetForm();
                    toggleForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating sparkling wine returned ', error);
                })
            }
            function addRedwine (tmpl) {
                menuService.addRedWine(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('white wine added to db successfuly',b_id);
                    vm.ctrlFn({value : 'red'})
                    blockUI.stop();
                    resetForm();
                    toggleForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating sparkling wine returned ', error);
                })
            }
            function addChampagne (tmpl) {
                $log.log('addSparklinewine ', tmpl);
                menuService.addChampagne(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('champagne added to db successfuly',b_id);
                    vm.ctrlFn({value : 'champagne'})
                    blockUI.stop();
                    resetForm();
                    toggleForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating sparkling wine returned ', error);
                })
            }
            function addWineItem() {
                $log.log('dir. addWineItem ',vm.wineType);
                blockUI.start();
                var tmpl = dataTemplates.getWineTmpl();
                tmpl.v_id = appGlobalVars.getVenueId();
                tmpl.name = vm.product.name;
                tmpl.desc = vm.product.desc;
                tmpl.varietal = vm.product.varietal;
                tmpl.region  = vm.product.region;
                tmpl.country = vm.product.country;
                tmpl.year = vm.product.year;
                tmpl.cost = vm.product.cost;
                tmpl.glass_cost = vm.product.glass_cost;
                tmpl.bottle_cost = vm.product.bottle_cost;
                tmpl.display = vm.product.active;
                tmpl.type = vm.wineType;

                switch (vm.wineType) {
                    case 'sparkling':
                        addSparklingwine(tmpl)
                        break;
                    case 'white':
                        addWhitewine(tmpl)
                        break;
                    case 'red':
                        addRedwine(tmpl)
                        break;
                    case 'champagne':
                        addChampagne(tmpl);
                        break;
                    default:
                }
            }
            function toggleForm() {
                vm.isToggled = !vm.isToggled;
                $log.log('toggleForm ',vm.isToggled );
            }
        }
    }

})();
