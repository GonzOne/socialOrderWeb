(function() {
  'use strict';

  angular
    .module('socialOrderWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.grid', 'toastr','LocalStorageModule', 'firebase', 'blockUI', 'toggle-switch', 'ngFileUpload', 'angular.backtop', 'ct.ui.router.extras','google.places', 'cloudinary', 'angular-loading-bar', 'duScroll', 'ngPassword'])
    .value('duScrollDuration', 1000)
    .value('duScrollOffset', 80);

})();
