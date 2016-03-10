(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('SidebarController', SidebarController);

    /** @ngInject */
    function SidebarController($rootScope, $log) {
        var vm = this;
        vm.menuItems = [{label: 'Dashboard', icon: 'menu-icon fa fa-tachometer', route:'admin.dashboard'},
                        {label: 'Venues', icon: 'menu-icon fa fa-building', route: 'admin.venues'},
                        {label: 'Profiles', icon: 'menu-icon fa fa-users', route: 'admin.profiles'}]

        $log.log('sidebar controller loaded ',vm)
        vm.toggleSidebar = function() {
            $log.log('toggleSidebar');
            $rootScope.toggle = !$rootScope.toggle;
        };


    }
})();