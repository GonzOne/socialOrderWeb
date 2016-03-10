/* global moment:false */
(function() {
  'use strict';

  angular
    .module('socialOrderWeb')
    .constant('moment', moment)
    .constant('KEYS', {
          firebase: 'https://socialorder.firebaseio.com/',
          cloudinary: {
            cloudName: 'stheory',
            preset: 'k0di9s1v',
            apiBase: 'https://api.cloudinary.com/v1_1/'
          }

          });

})();
