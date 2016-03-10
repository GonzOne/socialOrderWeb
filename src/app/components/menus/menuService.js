(function() {
    /*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('menuService', menuService);

    /** @ngInject */
    function menuService(KEYS, $q, $firebaseArray, $firebaseObject, $log) {

        var venueMenusUri = KEYS.firebase + '/venue_menus';
        var venueMenusRef = new Firebase(venueMenusUri);
        var monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        var createMenu = function (mData) {
            var deferred = $q.defer();
            $log.log('create new Menu node ', mData);
            mData.menuCreated = Firebase.ServerValue.TIMESTAMP;
            var newChildRef = venueMenusRef.push();//create key
            var k = newChildRef.key();
            mData.menu_id = k;
            mData.lastUpdate = getDate();
            mData.menu.bottleBeer.menu_id = k;
            mData.menu.canBeer.menu_id = k;
            mData.menu.draftBeer.menu_id = k;
            mData.menu.champagne.menu_id = k;
            mData.menu.sparklingWine.menu_id = k;
            mData.menu.whiteWine.menu_id = k;
            mData.menu.redWine.menu_id = k;
            mData.menu.wineOnTap.menu_id = k;
            mData.menu.cocktails.menu_id = k;
            mData.menu.spirits.menu_id = k;
            mData.menu.recommended.menu_id = k;
            newChildRef.set(mData, function (error) {
                if (error) {
                    $log.log(' create menuService : error', error);
                    deferred.reject();
                } else {

                    $log.log(' create menuService : saved node', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var getMenuById = function (k) {
            var deferred = $q.defer();
            var venueMenu = venueMenusRef.child(k);
            venueMenu.once("value", function(snapshot) {
                    var data = snapshot.val();
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;

        }
        var removeMenuById = function (k) {
            var menu = venueMenusRef.child(k);
            menu.remove();
        }
        /* DRAFT BEER */
        var addDraftBeer = function (m_id, data) {
            var deferred = $q.defer();
            $log.log('addDraftBeer to menu  ', m_id, ' beer data ', data);
            var beerRef = venueMenusRef.child(m_id).child('menu').child('draftBeer').child('items');
            var newChildRef = beerRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addDraftBeer : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addDraftBeer : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;


        }
        var getDraftBeerById = function (m_id, k) {
            var deferred = $q.defer();
            $log.log('getDraftBeerById : menu ',m_id, 'key ', k)
            //var draftBeer = venueMenusRef.child(m_id).child('draftBeer').child(k);
            var draftBeer = venueMenusRef.child(m_id).child('menu').child('draftBeer').child('items').child(k);
            draftBeer.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateDraftBeerById  = function (m_id, k, inObj) {
            $log.log('updateDraftBeerById : menu : ', m_id, 'key ', k, 'obj ', inObj)
            var deferred = $q.defer();
            //var draftBeer = venueMenusRef.child(m_id).child('draftBeer').child(k);
            var draftBeer = venueMenusRef.child(m_id).child('menu').child('draftBeer').child('items').child(k);
            draftBeer.update(inObj, function (error) {
                if (error) {
                    $log.log('menuService updateDraftBeerById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('menuService updateDraftBeerById : saved data');
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var removeDraftBeerById = function (m_id, k) {
            //var draftBeer = venueMenusRef.child(m_id).child('draftBeer').child(k);
            var draftBeer = venueMenusRef.child(m_id).child('menu').child('draftBeer').child('items').child(k);
            draftBeer.remove();
        }
        var getDraftBeersByMenuId = function (key) {
            $log.log('getDraftBeersByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            //var venueMenu = venueMenusRef.child(key).child('draftBeer');
            var venueMenu = venueMenusRef.child(key).child('menu').child('draftBeer').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        /* CAN BEER */
        var addCanBeer = function (m_id, data) {
            var deferred = $q.defer();
            $log.log('addCanBeer to menu  ', m_id, ' beer data ', data);
            var canRef = venueMenusRef.child(m_id).child('menu').child('canBeer').child('items');
            var newChildRef = canRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addCanBeer : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addCanBeer : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var getCanBeerById = function (m_id, k) {
            var deferred = $q.defer();
            var canBeer = venueMenusRef.child(m_id).child('menu').child('canBeer').child('items').child(k);
            canBeer.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateCanBeerById = function (m_id, k, inObj) {
            var deferred = $q.defer();
            //var canBeer = venueMenusRef.child(m_id).child('canBeer').child(k);
            var canBeer = venueMenusRef.child(m_id).child('menu').child('canBeer').child('items').child(k);
            canBeer.update(inObj, function (error) {
                if (error) {
                    $log.log('updateCanBeerById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateCanBeerById : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var removeCanBeerById = function (m_id, k) {
            //var canBeer = venueMenusRef.child(m_id).child('canBeer').child(k);
            var canBeer = venueMenusRef.child(m_id).child('menu').child('canBeer').child('items').child(k);
            canBeer.remove();
        }
        var getCanBeersByMenuId = function (key) {
            $log.log('getCanBeersByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueMenu = venueMenusRef.child(key).child('menu').child('canBeer').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        /* BOTTLE BEER */
        var addBottleBeer = function (m_id,data) {
            var deferred = $q.defer();
            $log.log('addBottleBeer to menu  ', m_id, ' beer data ', data);
            var bottleRef = venueMenusRef.child(m_id).child('menu').child('bottleBeer').child('items');
            var newChildRef = bottleRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addBottleBeer : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addBottleBeer : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var getBottleBeerById = function (m_id, k) {
            var deferred = $q.defer();
            var bottleBeer = venueMenusRef.child(m_id).child('menu').child('bottleBeer').child('items').child(k);
            bottleBeer.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateBottleBeerById  = function (m_id, k, inObj) {
            var deferred = $q.defer();
            var bottleBeer = venueMenusRef.child(m_id).child('menu').child('bottleBeer').child('items').child(k);
            //var canBeer = venueMenusRef.child(m_id).child('menu').child('canBeer').child('items').child(k);
            bottleBeer.update(inObj, function (error) {
                if (error) {
                    $log.log('updateBottleBeerById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateBottleBeerById : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var removeBottleBeerById = function (m_id, k) {
            var bottleBeer = venueMenusRef.child(m_id).child('menu').child('bottleBeer').child('items').child(k);
            bottleBeer.remove();
        }
        var getBottleBeersByMenuId = function (key) {
            $log.log('getBottleBeersByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueMenu = venueMenusRef.child(key).child('menu').child('bottleBeer').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        /* SPARKLING WINE */
        var addSparklingWine = function (m_id,data) {
            var deferred = $q.defer();
            $log.log('addSparklingWine to menu  ', m_id, ' sparkline wine data ', data);
            var swRef = venueMenusRef.child(m_id).child('menu').child('sparklingWine').child('items');
            var newChildRef = swRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addSparklingWine : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addSparklingWine : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var getSparklingWineById = function (m_id, k) {
            var deferred = $q.defer();
            var swRef = venueMenusRef.child(m_id).child('menu').child('sparklingWine').child('items').child(k);
            swRef.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateSparklingWineById  = function (m_id, k, inObj) {
            var deferred = $q.defer();
            var sWine = venueMenusRef.child(m_id).child('menu').child('sparklingWine').child('items').child(k);
            sWine.update(inObj, function (error) {
                if (error) {
                    $log.log('updateSparklingWineById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateSparklingWineById : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var removeSparklingWineById = function (m_id, k) {
            var sWine = venueMenusRef.child(m_id).child('menu').child('sparklingWine').child('items').child(k);
            sWine.remove();
        }
        var getSparklingWineByMenuId = function (key) {
            $log.log('menu service - getSparklingWineByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueMenu = venueMenusRef.child(key).child('menu').child('sparklingWine').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        /* WHITE WINE */
        var addWhiteWine = function (m_id,data) {
            var deferred = $q.defer();
            $log.log('addWhiteWine to menu  ', m_id, ' white wine data ', data);
            var wwRef = venueMenusRef.child(m_id).child('menu').child('whiteWine').child('items');
            var newChildRef = wwRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addWhiteWine : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addWhiteWine : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var getWhiteWineById = function (m_id, k) {
            var deferred = $q.defer();
            var wwRef = venueMenusRef.child(m_id).child('menu').child('whiteWine').child('items').child(k);
            wwRef.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateWhiteWineById  = function (m_id, k, inObj) {
            var deferred = $q.defer();
            var wWine = venueMenusRef.child(m_id).child('menu').child('whiteWine').child('items').child(k);
            wWine.update(inObj, function (error) {
                if (error) {
                    $log.log('updateWhiteWineById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateWhiteWineById : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var removeWhiteWineById = function (m_id, k) {
            var sWine = venueMenusRef.child(m_id).child('menu').child('whiteWine').child('items').child(k);
            sWine.remove();
        }
        var getWhiteWineByMenuId = function (key) {
            $log.log('getWhiteWineByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueMenu = venueMenusRef.child(key).child('menu').child('whiteWine').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        /* RED WINE */
        var addRedWine = function (m_id,data) {
            var deferred = $q.defer();
            $log.log('addRedWine to menu  ', m_id, ' red wine data ', data);
            var rwRef = venueMenusRef.child(m_id).child('menu').child('redWine').child('items');
            var newChildRef = rwRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addRedWine : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addRedWine : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var getRedWineById = function (m_id, k) {
            var deferred = $q.defer();
            var rwRef = venueMenusRef.child(m_id).child('menu').child('redWine').child('items').child(k);
            rwRef.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateRedWineById  = function (m_id, k, inObj) {
            var deferred = $q.defer();
            var rWine = venueMenusRef.child(m_id).child('menu').child('redWine').child('items').child(k);
            rWine.update(inObj, function (error) {
                if (error) {
                    $log.log('updateRedWineById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateRedWineById : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var removeRedWineById = function (m_id, k) {
            var rWine = venueMenusRef.child(m_id).child('menu').child('redWine').child('items').child(k);
            rWine.remove();
        }
        var getRedWineByMenuId = function (key) {
            $log.log('getRedWineByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueMenu = venueMenusRef.child(key).child('menu').child('redWine').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        /* COCKTAILS */
        var addCocktail = function (m_id,data) {
            var deferred = $q.defer();
            $log.log('addCocktail to menu  ', m_id, ' cocktail data ', data);
            var cRef = venueMenusRef.child(m_id).child('menu').child('cocktails').child('items');
            var newChildRef = cRef.push();
            data.key = newChildRef.key();
            newChildRef.set(data, function (error) {
                if (error) {
                    $log.log('VenueService addCocktail : error ', error);
                    deferred.reject(error);
                } else {
                    var k = newChildRef.key();
                    $log.log('VenueService addCocktail : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;

        }
        var getCocktailById = function (m_id, k) {
            var deferred = $q.defer();
            var cRef = venueMenusRef.child(m_id).child('menu').child('cocktails').child('items').child(k);
            cRef.once("value", function(snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        var updateCocktailById  = function (m_id, k, inObj) {
            var deferred = $q.defer();
            var cTail = venueMenusRef.child(m_id).child('menu').child('cocktails').child('items').child(k);
            cTail.update(inObj, function (error) {
                if (error) {
                    $log.log('updateCocktailById : error ', error);
                    deferred.reject(error);
                } else {
                    $log.log('updateCocktailById : saved data', k);
                    deferred.resolve(k);
                }
            })
            return deferred.promise;
        }
        var removeCocktailById = function (m_id, k) {
            var cTail = venueMenusRef.child(m_id).child('menu').child('cocktails').child('items').child(k);
            cTail.remove();
        }
        var getCocktailsByMenuId = function (key) {
            $log.log('getCocktailsByMenuId : key -', key)
            var deferred = $q.defer();
            var list = [];
            var venueMenu = venueMenusRef.child(key).child('menu').child('cocktails').child('items');
            venueMenu.once("value", function(snapshot) {
                $log.log('snapshot ', snapshot)
                if(snapshot.val() !== null){
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
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
        function getDate(){
          var date = new Date();
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          return monthNames[monthIndex] + '/'+ day +'/' + year;
        }
        return {
            createMenu: createMenu,
            getMenuById: getMenuById,
            removeMenuById: removeMenuById,
            //
            addDraftBeer:addDraftBeer,
            getDraftBeerById: getDraftBeerById,
            removeDraftBeerById: removeDraftBeerById,
            updateDraftBeerById: updateDraftBeerById,
            getDraftBeersByMenuId: getDraftBeersByMenuId,
            //
            addCanBeer: addCanBeer,
            getCanBeerById: getCanBeerById,
            removeCanBeerById: removeCanBeerById,
            updateCanBeerById: updateCanBeerById,
            getCanBeersByMenuId: getCanBeersByMenuId,
            //
            addBottleBeer:addBottleBeer,
            getBottleBeerById: getBottleBeerById,
            updateBottleBeerById: updateBottleBeerById,
            removeBottleBeerById: removeBottleBeerById,
            getBottleBeersByMenuId: getBottleBeersByMenuId,
            //
            addSparklingWine: addSparklingWine,
            getSparklingWineById: getSparklingWineById,
            updateSparklingWineById: updateSparklingWineById,
            removeSparklingWineById: removeSparklingWineById,
            getSparklingWineByMenuId: getSparklingWineByMenuId,
            //
            addWhiteWine: addWhiteWine,
            getWhiteWineById: getWhiteWineById,
            updateWhiteWineById: updateWhiteWineById,
            removeWhiteWineById: removeWhiteWineById,
            getWhiteWineByMenuId: getWhiteWineByMenuId,
            //
            addRedWine: addRedWine,
            getRedWineById: getRedWineById,
            updateRedWineById: updateRedWineById,
            removeRedWineById: removeRedWineById,
            getRedWineByMenuId: getRedWineByMenuId,
            //
            addCocktail: addCocktail,
            getCocktailById: getCocktailById,
            updateCocktailById: updateCocktailById,
            removeCocktailById: removeCocktailById,
            getCocktailsByMenuId: getCocktailsByMenuId

        }

    }
})();