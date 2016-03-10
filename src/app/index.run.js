(function() {
  'use strict';

  angular
    .module('socialOrderWeb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
