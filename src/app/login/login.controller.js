(function () {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('LoginController', LoginController);

    function LoginController(AuthService, $state, appGlobalVars, blockUI, $log) {
        var vm = this;
        vm.alerts =[];
        vm.user = {
            "email": '',
            "password": ''
        };
        //export
        vm.login = login;
        vm.closeAlert = closeAlert;
        vm.persistLogin = persistLogin;

        (function initController() {
            /*
            vm.checked = appGlobalVars.getRememberMe();
            if (vm.checked) {
                blockUI.start();
                tokenAuth.isSessionValid().then(function (authData) {
                    $log.log('Valid Token available');
                    loginSuccesfull(authData)
                }).catch(function () {
                    $log.log('Authentication failed:');
                    blockUI.stop();
                    vm.dataLoading = false;

                });

                blockUI.start();
                vm.dataLoading = true;
                tokenAuth.isSessionValid().then(function (authData) {
                    loginSuccesfull(authData)
                }).catch(function () {
                  $log.log('Authentication failed:');
                 appGlobalVars.setUserLoggedIn(false);
                  blockUI.stop();
                });

            }
             */

        })();
        function persistLogin () {
           $log.log('persistLogin ', vm.checked);
           //appGlobalVars.setRememberMe(vm.checked)

        }
        function navigateToView(){
            blockUI.stop();
            var role = AuthService.getUserRole();
            $log.log('navigateToView ', role)
            switch (role) {
                case 0: //super admin
                    $log.log('user is a super admin - load up admin dashboard');
                    $state.go('admin.dashboard');
                    break;
                case 1: // patron
                    //
                    break;
                case 2: // staff member
                    $log.log('user is a staff member - load up staff dashboard');
                    $state.go('staff.dashboard');
                    break
                case 3: // venue admin
                    $log.log('user is a venue admin - load up venue dashboard');
                    $state.go('venue.dashboard', {venueId: AuthService.getUserVenueId()});
                    break;
                default ://error page
            }
        }
        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }
        function login() {
            blockUI.start();
            vm.dataLoading = true;
            AuthService.loginWithPW(vm.user).then(function (){
              navigateToView();
            }, function (errorMsg){
                vm.alerts.push({ type: 'danger', msg: errorMsg });
                blockUI.stop();
                vm.dataLoading = false;
            });
        }
    }

})();