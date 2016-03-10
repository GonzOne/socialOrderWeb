(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('PromotionsService', PromotionsService);

    /** @ngInject */
    function PromotionsService(KEYS, $q, $firebaseArray, $firebaseObject, $log) {
        var promotionsUri = KEYS.firebase + '/venue_promotions';
        var promotionsRef = new Firebase(promotionsUri);

        var addPromotionEvent = function (prObj) {
            var deferred = $q.defer();
            prObj.promotionCreated = Firebase.ServerValue.TIMESTAMP;
            var newChildRef = promotionsRef.push();//create key
            prObj.key = newChildRef.key();
            newChildRef.set(prObj, function (error) {
                if (error) {
                    $log.log(' addPromotionEvent PromotionsService : error', error);
                    deferred.reject();
                } else {
                    var k = newChildRef.key();
                    $log.log(' addPromotionEvent PromotionsService : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }

        var removePromotionEvent = function (k) {
            var event = promotionsRef.child(k);
            event.remove();
        }
        var getPromotionEventById = function (k) {
            var deferred = $q.defer();
            var event = promotionsRef.child(k)
            event.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var getAllVenuesPromotionEvents = function () {
            var deferred = $q.defer();
            var list = [];
            promotionsRef.once("value", function(snapshot) {
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

        return {
            addPromotionEvent:  addPromotionEvent,
            removePromotionEvent: removePromotionEvent,
            getPromotionEventById:  getPromotionEventById,
            getAllVenuesPromotionEvents: getAllVenuesPromotionEvents

        }
    }


})();