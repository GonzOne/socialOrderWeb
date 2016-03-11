(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('PresenceService', PresenceService);

    /** @ngInject */
    function PresenceService(KEYS, $log) {
        //var myConnectionsRef = new Firebase('https://<YOUR-FIREBASE-APP>.firebaseio.com/users/joe/connections');
        var listUri = KEYS.firebase + '/venues/onlineStaff';
        var listRef = new Firebase(listUri);
        //var lastOnlineRef = new Firebase('https://<YOUR-FIREBASE-APP>.firebaseio.com/users/joe/lastOnline');

        var  getStaffUserCount = function () {
            $log.log(listRef);
        }
        return {
            getStaffUserCount: getStaffUserCount
        }
    }


})();