(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('addBeer', addBeer);

    /** @ngInject */
    function addBeer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/addBeer/addBeerTmpl.html',
            scope: true,
            controller: AddBeerController,
            controllerAs: 'vm',
            bindToController: {
                beerType: '@',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function AddBeerController(appGlobalVars, dataTemplates, menuService, blockUI, $log) {
            var vm = this;
            vm.isCollapsed = true;
            vm.dataLoading = false;
            vm.varietals = {
                repeatSelect: null,
                availableOptions: dataTemplates.getBeerVarietals()//I should pull this from our DB
            };
            vm.product = {
                v_id:'',
                name:'',
                cost:'',
                desc:'',
                varietal:'',
                active: true
            };
             //export
            vm.addBeerItem = addBeerItem;
            vm.onDisplayChange = onDisplayChange;
            vm.toggleForm = toggleForm;
            //
            function resetForm() {
                vm.product  = {
                    name:'',
                    cost:'',
                    desc:'',
                    varietal: '',
                    active: true
                }
            }
            function addBeerItem() {
                blockUI.start();
                $log.log('addBeerItem ',vm.beerType);
                var tmpl = dataTemplates.getBeerTmpl();
                tmpl.v_id = appGlobalVars.getVenueId();
                tmpl.name = vm.product.name;
                tmpl.cost = vm.product.cost;
                tmpl.desc = vm.product.desc;
                tmpl.display = vm.product.active;
                tmpl.type = vm.beerType;
                tmpl.varietal = vm.varietals.repeatSelect;

                switch (vm.beerType) {
                    case 'draft':
                        addDraftBeer(tmpl)
                        break;
                    case 'can':
                        addCanBeer(tmpl)
                        break;
                    case 'bottle':
                        addBottleBeer(tmpl)
                        break;
                    default:
                }
                resetForm();
            }
            function addDraftBeer (tmpl) {
                $log.log('addDraftBeer ', tmpl)
                menuService.addDraftBeer(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('draft beer added to db successfuly',b_id);
                    vm.ctrlFn({value : 'draft'})
                    blockUI.stop();
                    toggleForm();
                    resetForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating draft beer returned ', error);
                })
            }
            function addCanBeer (tmpl) {
                $log.log('addCanBeer ', tmpl)
                menuService.addCanBeer(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('can beer added to db successfuly',b_id);
                    vm.ctrlFn({value : 'can'})
                    blockUI.stop();
                    toggleForm();
                    resetForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating can beer returned ', error);
                })
            }
            function addBottleBeer (tmpl) {
                $log.log('addBottleBeer ', tmpl)
                menuService.addBottleBeer(appGlobalVars.getMenuId(), tmpl).then(function (b_id) {
                    $log.log('bottle beer added to db successfuly',b_id);
                    vm.ctrlFn({value : 'bottle'})
                    blockUI.stop();
                    toggleForm();
                    resetForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating bottle beer returned ', error);
                })
            }
            function onDisplayChange(val){
               $log.log('onDisplayChange', val);
                vm.product.active = val;
            }
            function toggleForm() {
                vm.isCollapsed = !vm.isCollapsed;
            }
        }
    }

})();
