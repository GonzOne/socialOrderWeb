(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('DeleteConfirmModalController', DeleteConfirmModalController);

    /** @ngInject */
    function DeleteConfirmModalController($uibModalInstance, header, message) {
        var vm = this;
        vm.header = header;
        vm.message = message;
        //export
        vm.deleteConfirmed = deleteConfirmed;
        vm.cancel = cancel;
        function deleteConfirmed () {
          $uibModalInstance.close('confirmed');
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }

    }
})();

