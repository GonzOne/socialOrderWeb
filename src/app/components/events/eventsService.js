(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('EventsService', EventsService);

    /** @ngInject */
    function EventsService(KEYS, $q, $firebaseArray, $firebaseObject, $log) {
        var eventsUri = KEYS.firebase + '/venue_events';
        var eventsRef = new Firebase(eventsUri);

        var addVenueEvent = function (evtObj) {
            var deferred = $q.defer();
            evtObj.venueCreated = Firebase.ServerValue.TIMESTAMP;
            var newChildRef = eventsRef.push();//create key
            evtObj.key = newChildRef.key();
            newChildRef.set(evtObj, function (error) {
                if (error) {
                    $log.log(' addVenueEvent EventsService : error', error);
                    deferred.reject();
                } else {
                    var k = newChildRef.key();
                    $log.log(' addVenueEvent EventsService : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }

        var removeVenueEvent = function (k) {
            var event = eventsRef.child(k);
            event.remove();
        }
        var getVenueEventById = function (k) {
            var deferred = $q.defer();
            var event = eventsRef.child(k)
            event.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var getAllVenueEvents = function () {
            var deferred = $q.defer();
            var list = [];
            eventsRef.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No items found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        var getAllVenueEventsById = function (k) {
            $log.log(k);

        }
        return {
            addVenueEvent:  addVenueEvent,
            removeVenueEvent: removeVenueEvent,
            getVenueEventById:  getVenueEventById,
            getAllVenueEventsById: getAllVenueEventsById,
            getAllVenueEvents: getAllVenueEvents

        }
    }


})();