(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('profileService', profileService);

    /** @ngInject */
    function profileService(KEYS, $q, $firebaseArray, $firebaseObject, $log) {
        var profileUri = KEYS.firebase + '/meta-profiles';
        var profileRef = new Firebase(profileUri);
        var profiles = $firebaseArray(profileRef);

        var staffUri = KEYS.firebase + '/staff';
        var staffRef = new Firebase(staffUri);
        var staff =  $firebaseArray(staffRef);

        var adminUri = KEYS.firebase + '/admin';
        var adminRef = new Firebase(adminUri);
        var admin =  $firebaseArray(adminRef);

        var ownersUri = KEYS.firebase + '/venueAdmin';
        var ownersRef = new Firebase(ownersUri);
        var owners =  $firebaseArray(ownersRef);

        var systemUsersUri = KEYS.firebase + '/patrons';
        var systemUsersRef = new Firebase(systemUsersUri);
        var systemUsers = $firebaseArray(systemUsersRef);


        //Meta
        var createMetaProfile = function (pData) {
            var deferred = $q.defer();
            $log.log('createMetaProfile for ', pData.uid, ' profile data ', pData);
            pData.role = parseInt(pData.role)//convert string to number
            pData.profileCreated = Firebase.ServerValue.TIMESTAMP;
            profileRef.child(pData.uid).set(pData, function (error) {
                if (error) {
                    $log.log('profileService - createMetaProfile : error', error);
                    deferred.reject();
                } else {
                    $log.log('profileService - createMetaProfile : saved data');
                    deferred.resolve(pData.uid);
                }
            })

            return deferred.promise;
        }
        var removeMetaProfileById = function (k) {
            var mp =  profileRef.child(k);
            mp.remove();
            /*
            remove user from firebase requires user email & password - therefore Admin can not
            remove the user fro firebase unless we store email & passowrd in users profile data (not a good security measure!)
             */
        }
        var getMetaProfileById = function (uid) {
            var deferred = $q.defer();
            var metaProfile = profileRef.child(uid)
            metaProfile.once("value", function(snapshot) {
                $log.log('getMetaProfileById : snapshot ',snapshot )
                var data = snapshot.val();
                $log.log('getMetaProfileById : data ',data )
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var getAllMetaProfiles = function () {
            $log.log('getAllMeta')
            var deferred = $q.defer();
            var list = [];
            profileRef.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No meta profiles found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        //Venue Admin
        var createVenueAdminProfile = function (oData){
            var deferred = $q.defer();
            $log.log('createVenueAdminProfile for ', oData.uid, ' profile data ', oData);
            ownersRef.child(oData.uid).set(oData, function (error) {
                if (error) {
                    $log.log('profileService - createVenueAdminProfile : error', error);
                    deferred.reject();
                } else {
                    $log.log('profileService - createVenueAdminProfile : saved data');
                    deferred.resolve(oData.uid);
                }
            })

            return deferred.promise;
        }
        var addVenueIdToAdminProfile = function(uid, v_id) {
            $log.log('addVenueIdToAdminProfile for uid : ', uid, ' to : ', v_id)
            var deferred = $q.defer();
            ownersRef.child(uid).child('venue_id').set(v_id, function (error) {
                if (error) {
                    $log.log('profileService - addVenueIdToAdminProfile : error', error);
                    deferred.reject();
                } else {
                    $log.log('profileService - addVenueIdToAdminProfile : saved data');
                    deferred.resolve();
                }
            })
            return deferred.promise;

        }
        var getVenueAdminProfileById = function (uid) {
            $log.log('profileService : getVenueAdminProfileById ', uid)
            var deferred = $q.defer();
            var venueAdminProfile = ownersRef.child(uid)
            venueAdminProfile.once("value", function(snapshot) {
                var data = snapshot.val();
                $log.log('profileService : getVenueAdminProfileById : data ',data )
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var removeVenueAdminProfileById = function (uid) {
            $log.log('removeVenueAdminProfileById : uid ', uid);
            var venueAdminProfile = ownersRef.child(uid);
            venueAdminProfile.remove();
        }
        var getAllVenueAdmins = function () {
            $log.log('getAllVenueAdmins')
            var deferred = $q.defer();
            var list = [];
            ownersRef.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No venue admins found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        // staff
        var createStaffProfile = function (sData) {
            var deferred = $q.defer();
            $log.log('createStaffProfile for ', sData.uid, ' staff data ', sData);
            staffRef.child(sData.uid).set(sData, function (error) {
                if (error) {
                    $log.log('profileService - createOwnerProfile : error', error);
                    deferred.reject();
                } else {
                    $log.log('profileService - createOwnerProfile : saved data');
                    deferred.resolve(sData.uid);
                }
            })

            return deferred.promise;
        }
        var setVenueIdInStaffProfile = function (uId, vId) {
            var deferred = $q.defer();
            var sRef = staffRef.child(uId).child('venues');
            var newChildRef = sRef.push();
            newChildRef.set({vId: vId}, function (error) {
                if (error) {
                    $log.log('ProfileService setVenueIdInStaffProfile : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('ProfileService setVenueIdInStaffProfile : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var getStaffProfile = function (uid) {
            var deferred = $q.defer();
            var staffProfile = staffRef.child(uid)
            staffProfile.once("value", function(snapshot) {
                $log.log('getStaffProfile : snapshot ',snapshot )
                var data = snapshot.val();
                $log.log('getStaffProfile : data ',data )
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var removeStaffProfileById = function (uid) {
          $log.log('removeStaffProfileById : uid ', uid);
           var sRef = staffRef.child(uid);
            sRef.remove();
        }
        var getVenueStaffProfileById = function (uid) {
            $log.log('profileService : getVenueStaffProfileById ', uid)
            var deferred = $q.defer();
            var venueStaffProfile = staffRef.child(uid)
            venueStaffProfile.once("value", function(snapshot) {
                var data = snapshot.val();
                $log.log('profileService : getVenueStaffProfileById - data ',data )
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var getNumberOfStaff = function () {
            var deferred = $q.defer();
            staffRef.once('value', function (snapshot) {
                var v = snapshot.numChildren();
                if ( v > 0) {
                    $log.log('getNumberOfStaff : number ', v);
                    deferred.resolved(v);
                } else {
                    $log.log('getNumberOfStaff : error ');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        var getAllStaff = function () {
            $log.log('getAllStaff')
            var deferred = $q.defer();
            var list = [];
            staffRef.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No staff found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        //admin
        var createAdminProfile = function (aData) {
            var deferred = $q.defer();
            $log.log('createAdminProfile for ', aData.uid, ' staff data ', aData);
            adminRef.child(aData.uid).set(aData, function (error) {
                if (error) {
                    $log.log('profileService - createOwnerProfile : error', error);
                    deferred.reject();
                } else {
                    $log.log('profileService - createOwnerProfile : saved data');
                    deferred.resolve(aData.uid);
                }
            })

            return deferred.promise;
        }
        var getAdminProfileById = function (uid) {
            var deferred = $q.defer();
            var adminProfile = adminRef.child(uid)
            adminProfile.once("value", function(snapshot) {
                $log.log('getAdminProfile : snapshot ',snapshot )
                var data = snapshot.val();
                $log.log('getAdminProfile : data ',data )
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var removeAdminProfileById = function (uid) {
            var adminProfile = adminRef.child(uid);
            adminProfile.remove();
        }
        var getNumberOfAdmins = function () {
            var deferred = $q.defer();
            adminRef.once('value', function (snapshot) {
                var v = snapshot.numChildren();
                if ( v > 0) {
                    $log.log('getNumberOfAdmins : number ', v);
                    deferred.resolved(v);
                } else {
                    $log.log('getNumberOfAdmins : error ');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        var getAllAdmin = function () {
            $log.log('getAllAdmin')
            var deferred = $q.defer();
            var list = [];
            adminRef.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No admin found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        // patrons
        var getSystemUserProfile = function (uid) {

            var deferred = $q.defer();
            var systemProfile = systemUsersRef.child(uid)
            systemProfile.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var getAllSystemUsers = function () {
            $log.log('getAllSystemUsers')
            var deferred = $q.defer();
            var list = [];
            //var venueMenu = venueMenusRef.child(key).child('cocktails');
            systemUsersRef.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        list.push(childData)
                    });
                    deferred.resolve(list);
                } else {
                    $log.log('No system users found');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        var getNumberSystemUsers = function () {
            var deferred = $q.defer();
            systemUsersRef.once('value', function (snapshot) {
                var v = snapshot.numChildren();
                if ( v > 0) {
                    $log.log('getNumberSystemUsers : number ', v);
                    deferred.resolved(v);
                } else {
                    $log.log('getNumberSystemUsers : error ');
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        return {
            createMetaProfile: createMetaProfile,
            getMetaProfileById: getMetaProfileById,
            removeMetaProfileById: removeMetaProfileById,
            getAllMetaProfiles: getAllMetaProfiles,
            getMetaProfilesArray: function () { return profiles},

            createVenueAdminProfile: createVenueAdminProfile,
            getVenueAdminProfileById: getVenueAdminProfileById,
            removeVenueAdminProfileById: removeVenueAdminProfileById,
            addVenueIdToAdminProfile: addVenueIdToAdminProfile,
            getAllVenueAdmins: getAllVenueAdmins,
            getVenuesAdminArray: function () {return owners},

            createStaffProfile: createStaffProfile,
            getVenueStaffProfileById: getVenueStaffProfileById,
            removeStaffProfileById: removeStaffProfileById,
            getStaffProfile:  getStaffProfile,
            setVenueIdInStaffProfile: setVenueIdInStaffProfile,
            getNumberOfStaff: getNumberOfStaff,
            getAllStaff: getAllStaff,
            getStaffArray: function () { return staff},

            createAdminProfile: createAdminProfile,
            getAdminProfileById:  getAdminProfileById,
            removeAdminProfileById: removeAdminProfileById,
            getNumberOfAdmins: getNumberOfAdmins,
            getAllAdmin: getAllAdmin,
            getAdminArray: function () {return admin},

            getSystemUserProfile:  getSystemUserProfile,
            getNumberSystemUsers: getNumberSystemUsers,
            getAllSystemUsers: getAllSystemUsers,
            getSystemUsersArray: function () {return systemUsers}




        }
    }


})();