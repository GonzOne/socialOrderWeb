(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueSidebarController', VenueSidebarController);

    /** @ngInject */
    function VenueSidebarController($rootScope, $state, appGlobalVars, $log) {
        var vm = this;
        vm.menuItems = [{label: 'Dashboard', icon: 'menu-icon fa fa-tachometer', route: 'venue.dashboard'},
            {label: 'Venue', icon: 'menu-icon fa fa-building', route: 'venue.detail'},
            {label: 'Menu', icon: 'menu-icon fa fa-book', route: 'venue.menu'},
            {label: 'Staff', icon:'menu-icon fa fa-users', route:'venue.staff'},
            {label: 'Account', icon: 'menu-icon fa fa-credit-card', route:'venue.account'}
            ]

        $log.log('venue sidebar controller loaded ',vm)
        //exports
        vm.toggleSidebar = toggleSidebar;
        vm.navigateTo = navigateTo;

        function navigateTo (route){
            vm.venueId = appGlobalVars.getVenueId();
            vm.menuId = appGlobalVars.getMenuId();
           $log.log('navigateTo route ', route, 'venue id ', vm.venueId, 'menu id ',vm.menuId );
           switch (route) {
               case 'venue.dashboard':
                   $state.go('venue.dashboard', {venueId: vm.venueId});
                   break;
               case 'venue.detail':
                   $state.go('venue.detail', {venueId: vm.venueId});
                   break;
               case 'venue.menu':
                   $state.go('venue.menu', {menuId: vm.menuId});
                   break;
               case 'venue.staff':
                   $state.go('venue.staff', {venueId: vm.venueId});
                   break;
               case 'venue.account':
                   $state.go('venue.account', {venueId: vm.venueId});
                   break;
               case 'venue.events':
                   break;
               case 'venue.promotions':
                   break;
               case 'venue.history':

                   break;
               case 'venue.analytics':
                   break;
               default:
           }
        }
        function toggleSidebar () {
            $rootScope.toggle = !$rootScope.toggle;
        }


    }
})();
