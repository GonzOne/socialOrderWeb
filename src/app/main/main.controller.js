(function() {
  'use strict';
  angular
    .module('socialOrderWeb')
    .controller('MainController', MainController)

  /** @ngInject */
  function MainController($log, $window) {
    var vm = this;
    vm.beta = {name:'', email:''};
    vm.slideInterval = 5000;
    vm.noWrapSlides = false;
    vm.slides = [
        {image: './assets/images/hero_image.jpg',
            text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
        }
    ];

    $log.log('main controller loaded ',vm)

     function sendInvite() {
       $log.log('sendInvite name ', vm.beta.name , ' email : ', vm.beta.email);
     }

     angular.element($window).scroll(function() {
          if ($window.pageYOffset > 100) {
              angular.element('.trans-before').addClass('trans-after');
          } else {
              angular.element('.trans-before').removeClass('trans-after');
          }
      });

      // exports
      vm.sendInvite = sendInvite;
  }
})();
