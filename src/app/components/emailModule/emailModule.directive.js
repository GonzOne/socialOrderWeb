(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('soEmailModule', soEmailModule);

    /** @ngInject */
    function soEmailModule() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/emailModule/emailModuleTmpl.html',
            scope: true,
            controller: SoEmailModuleController,
            controllerAs: 'vm',
            bindToController: {
                listData: '=',
                headerLabel: '@',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function SoEmailModuleController($log) {
            var vm = this;
            $log.log('data', vm.listData);
            vm.isCollapsed = false;
            vm.toggleModule = toggleModule;
            function toggleModule() {
                vm.isCollapsed = !vm.isCollapsed;
            }
        }
    }

})();
