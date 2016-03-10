(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueEventsController', VenueEventsController);

    /** @ngInject */
    function VenueEventsController($log) {
        var vm = this;


        $log.log('venue events controller loaded ',vm)

    }
})();