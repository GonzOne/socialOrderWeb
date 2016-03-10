(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('EditCocktailModalController', EditCocktailModalController);

    /** @ngInject */
    function EditCocktailModalController($uibModalInstance, appGlobalVars, cocktailId, cocktailType, menuService, $log) {
        var vm = this;
        vm.product = {
            name:'',
            cost:'',
            desc:''
        }

        //export
        vm.remove = remove;
        vm.save = save;
        vm.onDisplayChange = onDisplayChange;

        (function initController() {
            var m_id = appGlobalVars.getMenuId();
            switch (cocktailType)
            {
                case 'cocktail':
                    menuService.getCocktailById(m_id, cocktailId).then(function (data) {
                        $log.log('Returned cocktail data :', data);
                        vm.product.name =  data.name
                        vm.product.cost = data.cost;
                        vm.product.desc = data.desc;
                        vm.product.active = data.display;
                    })
                        .catch(function (error) {
                            $log.log('Error:', error);
                        });
                    break;
                default:
            }

        })();
        function resetForm() {
            vm.product = {
                name:'',
                cost:'',
                desc:'',
                active: true
            }
        }
        function remove () {
            $log.log('EditCocktailModalController remove')
            var m_Id = appGlobalVars.getMenuId();
            switch(cocktailType){
                case 'cocktail':
                    menuService.removeCocktailById(m_Id, cocktailId);
                    break;
                default:
            }
            $uibModalInstance.close(cocktailType);
        }
        function save () {
            $log.log('EditCocktailrModalController save')
            var m_Id = appGlobalVars.getMenuId();
            switch(cocktailType){
                case 'cocktail':
                    menuService.updateCocktailById(m_Id, cocktailId, vm.product)
                        .then(function () {
                            $log.log('saved cocktail data :');

                        })
                        .catch(function (error) {
                            $log.log('update cocktail data - Error:', error);
                        });
                    break;
                default:
            }

            resetForm();
            $uibModalInstance.close(cocktailType);
        }
        function onDisplayChange(val){
            $log.log('onDisplayChange', val);
            vm.product.active = val;
        }

    }
})();
