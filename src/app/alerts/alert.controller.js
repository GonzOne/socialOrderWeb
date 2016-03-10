/**
 * Alerts Controller


angular
    .module('socialOrderWeb')
    .controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
    $scope.alerts = [{
        type: 'success',
        msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        msg: 'Found a bug? Create an issue with as many details as you can.'
    }];

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}
 */
(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('AlertsController', AlertsController);

    /** @ngInject */
    function AlertsController($scope, $log) {
        var vm = this;
        vm.alerts = [{
            type: 'success',
            msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
        }, {
            type: 'danger',
            msg: 'Found a bug? Create an issue with as many details as you can.'
        }];

        $log.log('alerts controller loaded ',vm)
        vm.addAlert = function() {
            vm.alerts.push({
                msg: 'Another alert!'
            });
        };
        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };


    }
})();