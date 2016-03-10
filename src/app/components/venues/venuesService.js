(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('venueService', venueService);

    /** @ngInject */
    function venueService(KEYS, $q, $firebaseArray, $firebaseObject, $log) {
        var venueUri = KEYS.firebase + '/venues';
        var venueRef = new Firebase(venueUri);
        var lastVenueName = null;



        var createVenue = function (vData) {
            var deferred = $q.defer();
            $log.log('VenueService - createVenue for ', ' venue data ', vData);
            vData.venueCreated = Firebase.ServerValue.TIMESTAMP;
            if(vData.type ) {
                vData.type = parseInt(vData.type)
            }
            var newChildRef = venueRef.push();//create key
            vData.key = newChildRef.key();
            newChildRef.set(vData, function (error) {
                if (error) {
                    $log.log(' create venueService : error', error);
                    deferred.reject();
                } else {
                    var k = newChildRef.key();
                    $log.log(' create venueService : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var removeVenueById = function (k) {
            var venue = venueRef.child(k);
            venue.remove();
        }
        var getVenueById = function (key) {
            $log.log('getVenueById : key ', key)
            var deferred = $q.defer();
            var venue = venueRef.child(key)
            venue.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var getVenueAdminListById = function (key) {
            $log.log('getVenueAdminListById : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueAdmin = venueRef.child(key).child('admin');
            venueAdmin.once("value", function(snapshot) {
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        // key will be "fred" the first time and "barney" the second time
                        var key = childSnapshot.key();
                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();
                        list.push(childData)
                        $log.log('key', key, 'child data ',childData )
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No items found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        var getVenueStaffListById = function (key) {
            $log.log('getVenueStaffListById : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueStaff = venueRef.child(key).child('staff');
            venueStaff.once("value", function(snapshot) {
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                        $log.log('key', key, 'child data ',childData )
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No items found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        var updateVenueDetails = function (key, inObj) {
            var deferred = $q.defer();
            var vRef = venueRef.child(key);
            vRef.update(inObj, function (error) {
                if (error) {
                    $log.log('updateVenueDetails : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateVenueDetails : saved data');
                    deferred.resolve();
                }
            })
             return deferred.promise;
        }
        var setVenueStaff = function (key, uid) {
            $log.log('venueService - setVenueStaff - key : ', key, ' uid ', uid);
            var deferred = $q.defer();
            var vRef = venueRef.child(key).child('staff');
            var newChildRef = vRef.push();
            //newChildRef.set({uid: uid}, onSetVenueStaffComplete);
            newChildRef.set({uid: uid}, function (error) {
                if (error) {
                    $log.log('VenueService setVenueStaff : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService setVenueStaff : saved data', k);
                    deferred.resolve(k);
                }
              })
            return deferred.promise;
        }
        var setVenueProfilePic = function (key, file) {
            $log.log('setVenueProfilePic - venue - key : ', key, ' file ', file);
            var deferred = $q.defer();
            var vRef = venueRef.child(key);
            vRef.update({photo_url: file}, function (error) {
                if (error) {
                    $log.log('VenueService setVenueProfilePic : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('VenueService setVenueProfilePic : saved data');
                    deferred.resolve();
                }
            })
            return deferred.promise;
        }
        var setVenueAdmin = function (key, uid) {
            $log.log('venueService - setVenueAdmin : key ', key, 'user ', uid);
            var deferred = $q.defer();
            var vRef = venueRef.child(key).child('admin');
            var newChildRef = vRef.push();
            newChildRef.set({uid: uid},function (error) {
                if (error) {
                    $log.log('VenueService setVenueAdmin : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService setVenueAdmin : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var setVenueMenu = function (v_id, m_id) {
            $log.log('venueService - setVenueMenu - key : ', v_id, ' menu id ', m_id);
            var deferred = $q.defer();
            var vRef = venueRef.child(v_id);
            $log.log('vRef ', vRef)
            //{ name: { first: 'Fred', last: 'Flintstone' }}
            vRef.update({menu_id: m_id},function (error) {
                    if (error) {
                        $log.log('VenueService setVenueMenu : error ', error);
                        deferred.reject(error);
                    } else {
                        $log.log('VenueService setVenueMenu : saved data');
                        deferred.resolve();
                    }
                })
            return deferred.promise;
        }
        var isVenueValid = function (key) {
            var deferred = $q.defer();
            var v = getVenueById(key);
            //check for
            //name, lat, lng, photo_url
            if (!v.name) {
                deferred.reject('name');
            } else if (!v.lat ||!v.lng ) {
                deferred.reject('lat$lng');
            } else if (!v.photo_url) {
                deferred.reject('photo');
            }else{
                deferred.resolved();

            }

            return deferred.promise;
        }
        var getAllVenues = function (key) {
            $log.log('getAllVenues : key -', key)
            var deferred = $q.defer();
            var list = [];
            //var venueMenu = venueMenusRef.child(key).child('cocktails');
            venueRef.once("value", function(snapshot) {
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
        var getNumberOfVenues = function () {
            var deferred = $q.defer();
            venueRef.once("value", function(snapshot) {

                if (snapshot.val() !== null){
                    var num = snapshot.numChildren();
                    deferred.resolve(num);
                } else {
                    deferred.reject();
                }

            });
            return deferred.promise;
        }
        var paginationNext = function (limit) {
            var deferred = $q.defer();
            var list = [];
            venueRef
            .orderByChild('name')
            .startAt(lastVenueName)
            .limit(limit+1)
            .once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    var vals = snapshot.val()||{};
                    lastVenueName = getLastKey(snapshot);
                    delete vals[lastVenueName];
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

        var paginationPrev = function (venueName, limit) {
            var deferred = $q.defer();
            var list = [];
            venueRef
                .orderByChild('name')
                .startAt(venueName)
                .limit(limit+1)
                .once("value", function(snapshot) {
                    $log.log('snapshot ', snapshot)
                    if(snapshot.val() !== null){
                        $log.log(snapshot.childSnapshot[0])
                        var vals = snapshot.val()||{};
                        lastVenueName = getLastKey(snapshot);
                        delete vals[lastVenueName];
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

        function getLastKey(snapshot) {
            var k;
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                k = childData.name;
            });
            $log.log('k ', k)
            return k;
        }
        /*
        function getFirstKey(snapshot) {
            var j;
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                j = childData.name;
                return;
            });
            return j;
        }
        */
        return {
            createVenue: createVenue,
            removeVenueById: removeVenueById,
            getVenueById: getVenueById,
            setVenueStaff:setVenueStaff,
            setVenueMenu:setVenueMenu,
            setVenueAdmin: setVenueAdmin,
            getVenueAdminListById: getVenueAdminListById,
            getVenueStaffListById: getVenueStaffListById,
            updateVenueDetails: updateVenueDetails,
            isVenueValid: isVenueValid,
            getAllVenues: getAllVenues,
            getNumberOfVenues: getNumberOfVenues,
            setVenueProfilePic: setVenueProfilePic,
            paginationNext: paginationNext,
            paginationPrev: paginationPrev
        }
    }


})();