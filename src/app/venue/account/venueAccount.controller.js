(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueAccountController', VenueAccountController);

    /** @ngInject */
    function VenueAccountController($log) {
        var vm = this;


        $log.log('venue account controller loaded ',vm)

    }
})();