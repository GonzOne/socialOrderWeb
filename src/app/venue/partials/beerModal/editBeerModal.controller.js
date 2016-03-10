(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('EditBeerModalController', EditBeerModalController);

    /** @ngInject */
    function EditBeerModalController($uibModalInstance, dataTemplates, appGlobalVars, beerId, beerType, menuService, $log) {
        var vm = this;
        vm.product  = {
            name:'',
            cost:'',
            desc:'',
            active:'',
            varietal:''
        }
        vm.varietals = {
            repeatSelect: null,
            availableOptions: dataTemplates.getBeerVarietals()
        };
        //export
        vm.remove = remove;
        vm.save = save;
        vm.onDisplayChange = onDisplayChange;

        (function initController() {
            var m_id = appGlobalVars.getMenuId();
            switch (beerType)
            {
                case 'draft':
                    menuService.getDraftBeerById(m_id, beerId).then(function (data) {
                        $log.log('Retieved beer data :', data);
                        vm.product.name =  data.name;
                        vm.product.cost = data.cost;
                        vm.product.desc = data.desc;
                        vm.product.active = data.display;
                        vm.varietals.repeatSelect = data.varietal;
                    })
                        .catch(function (error) {
                            $log.log('Error:', error);
                        });

                    break;
                case 'bottle':
                    menuService.getBottleBeerById(m_id, beerId).then(function (data) {
                        $log.log('Retieved bottle beer data :', data);
                        vm.product.name =  data.name;
                        vm.product.cost = data.cost;
                        vm.product.desc = data.desc;
                        vm.product.active = data.display;
                        vm.varietals.repeatSelect = data.varietal;
                    })
                        .catch(function (error) {
                            $log.log('Error:', error);
                        });

                    break;
                case 'can':
                    menuService.getCanBeerById(m_id, beerId).then(function (data) {
                        $log.log('Retieved can beer data :', data);
                        vm.product.name =  data.name;
                        vm.product.cost = data.cost;
                        vm.product.desc = data.desc;
                        vm.product.active = data.display;
                        vm.varietals.repeatSelect = data.varietal;
                    })
                        .catch(function (error) {
                            $log.log('Error:', error);
                        });
                    break;
                default:
            }

        })();
        function reset () {
            vm.product  = {
                name:'',
                cost:'',
                desc:'',
                active:''
            }
        }
        function remove () {
            $log.log('EditBeerModalController remove')
            var m_Id = appGlobalVars.getMenuId();
            switch(beerType){
                case 'draft':
                    menuService.removeDraftBeerById(m_Id, beerId);
                    break;
                case 'can':
                    menuService.removeCanBeerById(m_Id, beerId);
                    break;
                case 'bottle':
                    menuService.removeBottleBeerById(m_Id, beerId);
                    break;
            }
            $uibModalInstance.close(beerType);
        }
        function save () {
            $log.log('EditBeerModalController save');
            var m_Id = appGlobalVars.getMenuId();
            vm.product.varietal = vm.varietals.repeatSelect;
            switch(beerType){
                case 'draft':
                    menuService.updateDraftBeerById(m_Id, beerId, vm.product)
                        .then(function () {
                            $log.log('saved draft beer data :');

                        })
                        .catch(function (error) {
                            $log.log('saved draft beer - Error:', error);
                        });
                    break;
                case 'can':
                    menuService.updateCanBeerById(m_Id, beerId, vm.product)
                        .then(function () {
                            $log.log('saved can beer data :');

                        })
                        .catch(function (error) {
                            $log.log('saved can beer - Error:', error);
                        });
                    break;
                case 'bottle':
                    menuService.updateBottleBeerById(m_Id, beerId, vm.product)
                        .then(function () {
                            $log.log('saved bottle beer data :');

                        })
                        .catch(function (error) {
                            $log.log('saved bottle beer  - Error:', error);
                        });
                    break;
            }

            reset();
            $uibModalInstance.close(beerType);
        }
        function onDisplayChange(val){
            $log.log('onDisplayChange', val);
            vm.product.active = val;
        }

    }
})();
