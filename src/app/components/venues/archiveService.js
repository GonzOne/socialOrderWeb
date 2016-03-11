(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('ArchiveService', ArchiveService);

    /** @ngInject */
    function ArchiveService(KEYS, $q, $firebaseArray, $firebaseObject, $log) {
        var archiveUri = KEYS.firebase + '/venue_history';
        var archiveRef = new Firebase(archiveUri);

        function getArchivesByMonth (k) {
            var archive = archiveRef.chiled(k)
            $log.log('archive ', archive);
        }
        return {
          getArchivesByMonth: getArchivesByMonth

        }
    }


})();