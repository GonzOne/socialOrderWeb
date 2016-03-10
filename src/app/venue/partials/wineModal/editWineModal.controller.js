(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('EditWineModalController', EditWineModalController);

    /** @ngInject */
    function EditWineModalController($uibModalInstance, appGlobalVars, wineId, wineType, menuService, $log) {
        var vm = this;
        vm.product = {
            name:'',
            glass_cost:'',
            bottle_cost:'',
            varietal:'',
            region:'',
            country:'',
            year:'',
            desc:'',
            active: true
        }

        //export
        vm.remove = remove;
        vm.save = save;
        vm.onDisplayChange = onDisplayChange;

        (function initController() {
            var m_id = appGlobalVars.getMenuId();
            switch (wineType)
            {
                case 'sparkling':
                    menuService.getSparklingWineById(m_id, wineId).then(function (data) {
                        $log.log('Returned sparkling wine data :', data);
                        vm.product.name =  data.name
                        vm.product.glass_cost = data.glass_cost;
                        vm.product.bottle_cost = data.bottle_cost;
                        vm.product.varietal =  data.varietal;
                        vm.product.region =  data.region;
                        vm.product.country = data.country
                        vm.product.year = data.year
                        vm.product.desc = data.desc;
                        vm.product.active = data.display;
                    })
                        .catch(function (error) {
                            $log.log('Error:', error);
                        });
                    break;
                case 'white':

                    menuService.getWhiteWineById(m_id, wineId).then(function (data) {
                        $log.log('Returned white wine data :', data);
                        vm.product.name =  data.name
                        vm.product.glass_cost = data.glass_cost;
                        vm.product.bottle_cost = data.bottle_cost;
                        vm.product.varietal =  data.varietal;
                        vm.product.region =  data.region;
                        vm.product.country = data.country
                        vm.product.year = data.year
                        vm.product.desc = data.desc;
                        vm.product.active = data.display;
                    })
                        .catch(function (error) {
                            $log.log('Error:', error);
                        });

                    break;
                case 'red':

                    menuService.getRedWineById(m_id, wineId).then(function (data) {
                        $log.log('Returned red wine data :', data);
                        vm.product.name =  data.name
                        vm.product.glass_cost = data.glass_cost;
                        vm.product.bottle_cost = data.bottle_cost;
                        vm.product.varietal =  data.varietal;
                        vm.product.region =  data.region;
                        vm.product.country = data.country
                        vm.product.year = data.year
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
                name: '',
                glass_cost: '',
                bottle_cost: '',
                varietal: '',
                region: '',
                country: '',
                year: '',
                desc: '',
                active: true
            }
        }
        function remove () {
            var m_Id = appGlobalVars.getMenuId();
            switch(wineType){
                case 'sparkling':
                    menuService.removeSparklingWineById(m_Id, wineId);
                    break;
                case 'white':
                    menuService.removeWhiteWineById(m_Id, wineId);
                    break;
                case 'red':
                    menuService.removeRedWineById(m_Id, wineId);
                    break;
            }
            $uibModalInstance.close(wineType);
        }
        function save () {
            $log.log('EditWineModalController save')
            var m_Id = appGlobalVars.getMenuId();
            switch(wineType){
                case 'sparkling':
                    menuService.updateSparklingWineById(m_Id, wineId, vm.product)
                        .then(function () {
                            $log.log('saved sparkling wine data :');

                        })
                        .catch(function (error) {
                            $log.log('saved sparkling wine - Error:', error);
                        });
                    break;
                case 'white':
                    menuService.updateWhiteWineById(m_Id, wineId, vm.product)
                        .then(function () {
                            $log.log('saved white wine data :');

                        })
                        .catch(function (error) {
                            $log.log('saved sparkling wine - Error:', error);
                        });
                    break;
                case 'red':
                    menuService.updateRedWineById(m_Id, wineId, vm.product)
                        .then(function () {
                            $log.log('saved red wine data :');

                        })
                        .catch(function (error) {
                            $log.log('saved red wine - Error:', error);
                        });
                    break;
            }

            resetForm();
            $uibModalInstance.close(wineType);
        }
        function onDisplayChange(val){
            $log.log('onDisplayChange', val);
            vm.product.active = val;
        }

    }
})();
