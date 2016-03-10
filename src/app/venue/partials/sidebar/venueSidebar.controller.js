(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueSidebarController', VenueSidebarController);

    /** @ngInject */
    function VenueSidebarController($rootScope, $log) {
        var vm = this;
        vm.menuItems = [{label: 'Dashboard', icon: 'menu-icon fa fa-tachometer', route:'venue.dashboard'},
            {label: 'Venue', icon: 'menu-icon fa fa-building', route: 'venue.detail'},
            {label: 'Menu', icon: 'menu-icon fa fa-book', route: 'venue.menu'},
            {label: 'Staff', icon:'menu-icon fa fa-users', route:'venue.staff'},
            {label: 'Account', icon: 'menu-icon fa fa-credit-card', route:'venue.account'}
            ]

        $log.log('venue sidebar controller loaded ',vm)
        vm.toggleSidebar = function() {
            $log.log('toggleSidebar');
            $rootScope.toggle = !$rootScope.toggle;
        };


    }
})();
