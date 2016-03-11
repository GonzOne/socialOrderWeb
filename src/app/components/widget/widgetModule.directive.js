(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('soWidgetModule', soWidgetModule);

    /** @ngInject */
    function soWidgetModule() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/widget/widgetModuleTmpl.html',
            scope: true,
            controller: SoWidgetModuleController,
            controllerAs: 'vm',
            bindToController: {
                iconClass: '@',
                number: '@',
                moduleLabel: '@',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function SoWidgetModuleController() {

        }
    }

})();
