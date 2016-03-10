(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('subNav', subNav);

    /** @ngInject */
    function subNav() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/subNav/subNavTmpl.html',
            scope: true,
            controller: subNavController,
            controllerAs: 'subNavController',
            bindToController: {
                show: '=',
                buttons: '=',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function subNavController($location, $anchorScroll, appGlobalVars, $log) {
            var vm = this;
            vm.isAdmin = vm.show;
            vm.buttons = vm.buttons;
            $log.log('vm.isAdmin ', vm.isAdmin)
            //export
            vm.gotoAnchor = gotoAnchor;
            function gotoAnchor (val){
                $log.log('gotoAnchor ', val)
                if(val === 'back') {
                    vm.ctrlFn({value : val})
                } else {
                    $location.hash(val);
                    $anchorScroll();
                }
            }


        }
    }

})();
