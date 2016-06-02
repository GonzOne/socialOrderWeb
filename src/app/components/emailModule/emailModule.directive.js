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
                isEditable: '=',
                creationType: '=',
                venueId: '=',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function SoEmailModuleController() {
            var vm = this;
            vm.isCollapsed = false;
            vm.toggleModule = toggleModule;
            function toggleModule() {
                vm.isCollapsed = !vm.isCollapsed;
            }
        }
    }

})();
