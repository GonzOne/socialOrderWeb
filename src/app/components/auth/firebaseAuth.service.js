(function() {
/*global Firebase */
    'use strict';

    angular
        .module('socialOrderWeb')
        .factory('Auth', Auth);
/** @ngInject */
    function Auth($firebaseAuth) {
    var usersRef = new Firebase('https://socialorder.firebaseio.com/');
    return $firebaseAuth(usersRef);
}


})();