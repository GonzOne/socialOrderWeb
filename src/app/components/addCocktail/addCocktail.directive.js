(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('addCocktail', addCocktail);

    /** @ngInject */
    function addCocktail() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/addCocktail/addCocktailTmpl.html',
            scope: true,
            controller: AddCocktailController,
            controllerAs: 'vm',
            bindToController: {
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function AddCocktailController(appGlobalVars, dataTemplates, menuService, blockUI, $log) {
            var vm = this;
            vm.isToggled = false;
            vm.dataLoading = false;
            vm.product = {
                name:'',
                cost:'',
                desc:'',
                active: true
            }
            //export
            vm.addCocktailItem = addCocktailItem;
            vm.onDisplayChange = onDisplayChange;
            vm.toggleForm = toggleForm;

            function resetForm() {
                vm.product = {
                    name:'',
                    cost:'',
                    desc:'',
                    active: true
                }
            }
            function onDisplayChange(val){
                $log.log('onDisplayChange', val);
                vm.product.active = val;
            }
            function addCocktailItem() {
                blockUI.start();
                var tmpl = dataTemplates.getCocktailTmpl();
                tmpl.v_id = appGlobalVars.getVenueId();
                tmpl.name = vm.product.name;
                tmpl.desc = vm.product.desc;
                tmpl.cost = vm.product.cost;
                tmpl.type = 'cocktail';
                tmpl.display = vm.product.active;
                $log.log('addCocktailItem ', tmpl)
                menuService.addCocktail(appGlobalVars.getMenuId(), tmpl).then(function (c_id) {
                    $log.log('cocktail added to db successfuly',c_id);
                    vm.ctrlFn({value : 'cocktail'})
                    blockUI.stop();
                    toggleForm();
                    resetForm();
                }, function (error) {

                    blockUI.stop();
                    $log.log('creating draft beer returned ', error);
                })

            }
            function toggleForm() {
                vm.isToggled = !vm.isToggled;
                $log.log('toggleForm ',vm.isToggled );
            }
        }
    }

})();
