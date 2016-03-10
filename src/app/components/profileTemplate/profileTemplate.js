(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('profileTemplate', profileTemplate);

    /** @ngInject */
    function profileTemplate() {
      var profile_data = {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          uid: ''
      };

     return {
         getProfileTmpl: function () { return profile_data; }
     }
    }

})();
