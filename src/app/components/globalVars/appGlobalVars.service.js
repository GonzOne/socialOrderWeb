(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('appGlobalVars', appGlobalVars);

    /** @ngInject */
    function appGlobalVars(localStorageService) {

        var setToken = function (val) {
            localStorageService.set('token', val);
        }
        var getToken = function () {
            return localStorageService.get('token');
        }
        var setUserId = function (uid) {
            localStorageService.set('userId',uid);
        }
        var getUserId = function () {
            return localStorageService.get('userId');
        }
        var setUserLoggedIn = function (bool) {
            localStorageService.set('loggedIn', bool);
        }
        var getUserLoggedIn = function () {
            return localStorageService.get('loggedIn');
        }
        var setUserRole = function (val) {
            localStorageService.set('userRole', val);
        }
        var getUserRole = function () {
            return localStorageService.get('userRole');
        }
        var setVenueId = function (v_id) {
            localStorageService.set('venueId', v_id);
        }
        var getVenueId = function () {
            return localStorageService.get('venueId');
        }
        var setMenuId = function (m_id) {
            localStorageService.set('menuId', m_id);
        }
        var getMenuId = function () {
            return localStorageService.get('menuId');
        }
        var setRememberMe = function (bool) {
            localStorageService.set('remember_me', bool);
        }
        var getRememberMe = function () {
            return localStorageService.get('remember_me');
        }
        var clearSession = function () {
            localStorageService.remove('userId');
            localStorageService.remove('venueId');
            localStorageService.remove('menuId');
            localStorageService.remove('loggedIn');
            localStorageService.remove('remember_me');
            localStorageService.remove('userRole');
        }
        var clearAll = function () {
            return localStorageService.clearAll();
        }
        var clearVenue = function () {
            localStorageService.remove('venueId');
        }
        return {
            setToken: setToken,
            getToken: getToken,
            setUserId: setUserId,
            getUserId: getUserId,
            setUserLoggedIn: setUserLoggedIn,
            getUserLoggedIn : getUserLoggedIn,
            setUserRole: setUserRole,
            getUserRole: getUserRole,
            setVenueId: setVenueId,
            getVenueId: getVenueId,
            setMenuId: setMenuId,
            getMenuId: getMenuId,
            setRememberMe:setRememberMe,
            getRememberMe:getRememberMe,
            clearSession: clearSession,
            clearAll: clearAll,
            clearVenue: clearVenue
        }
    }

})();
