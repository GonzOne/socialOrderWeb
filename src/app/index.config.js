(function() {
  'use strict';

  angular
    .module('socialOrderWeb')
    .config(config);

  /** @ngInject */
  function config($logProvider, cfpLoadingBarProvider, toastrConfig, blockUIConfig, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    //
    blockUIConfig.message = 'loading...';
    //
    localStorageServiceProvider.setPrefix('so_admin');
    //
    cfpLoadingBarProvider.includeSpinner = false;
    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
