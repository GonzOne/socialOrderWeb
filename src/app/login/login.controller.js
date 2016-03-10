(function () {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('LoginController', LoginController);

    function LoginController(AuthService, tokenAuth, $state, Auth, appGlobalVars, profileService, blockUI, $log) {
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
                /*
                blockUI.start();
                vm.dataLoading = true;
                tokenAuth.isSessionValid().then(function (authData) {
                    loginSuccesfull(authData)
                }).catch(function () {
                  $log.log('Authentication failed:');
                 appGlobalVars.setUserLoggedIn(false);
                  blockUI.stop();
                });
                */
            }

        })();
        function persistLogin () {
           $log.log('persistLogin ', vm.checked);
           appGlobalVars.setRememberMe(vm.checked)

        }
        function navigateToView(role){
            blockUI.stop();
            $log.log('navigateToView ', role)
            switch (role) {
                case 0: //admin
                    $log.log('user is system admin - load up admin section');
                    $state.go('admin.dashboard',{uId:appGlobalVars.getUserId()});
                    break;
                case 1: // patron
                    //
                    break;
                case 2: // staff
                    $log.log('load up staff section');
                    $state.go('staff.dashboard');
                    break
                case 3: // venue
                    $log.log('user is venue admin - load up venue section');
                    $state.go('venue.dashboard');
                    break;
                default ://error page
            }
        }
        function loginSuccesfull (authData) {
            $log.log('loginSuccesfull ', authData.uid);
            appGlobalVars.setUserId(authData.uid);
            appGlobalVars.setUserLoggedIn(true);
            if (appGlobalVars.getRememberMe()) {
                appGlobalVars.setToken(authData.token)
            }
            profileService.getMetaProfileById(authData.uid).then(function (data) {
                $log.log('Login controller - Retrieved meta for User :', data);
                // store user logged in var
                appGlobalVars.setUserLoggedIn(true);
                appGlobalVars.setUserRole(data.role);
                navigateToView(data.role);
            }, function (error) {
                $log.log('Error:', error);
            })
            /*
            userRole.$loaded()
                .then(function (data) {
                    $log.log('Login controller - Retrieved meta for User :', data);
                    // store user logged in var
                    appGlobalVars.setUserLoggedIn(true);
                    appGlobalVars.setUserRole(data.role);

                    navigateToView(data.role)
                })
                .catch(function (error) {
                    $log.log('Error:', error);
                });
             */
        }
        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }
        function login() {
            blockUI.start();
            vm.dataLoading = true;
            AuthService.loginWithPW(vm.user).then(function (authData){
                loginSuccesfull(authData);
            }, function (errorMsg){
                vm.alerts.push({ type: 'danger', msg: errorMsg });
                blockUI.stop();
                vm.dataLoading = false;
            });
            /*
            $log.log('log in called', vm.user.email, vm.user.password)
            Auth.$authWithPassword(vm.user).then(function (authData) {
                $log.log('auth ', authData);
                $log.log('user token ', authData.token);
                loginSuccesfull(authData);
            }, function (error) {
                var errorMsg;
                $log.log('error.code ', error.code)
                switch (error.code) {
                    case 'INVALID_EMAIL':
                        errorMsg = 'The specified user account email is invalid.';

                        break;
                    case 'INVALID_PASSWORD':
                        errorMsg = 'The specified user account password is incorrect.';
                        break;
                    case 'INVALID_USER':
                        errorMsg = 'The specified user account does not exist.';
                        break;
                    default:
                        errorMsg = 'Invalid email address';
                }
                $log.log('errorMsg ', errorMsg);
                vm.alerts.push({ type: 'danger', msg: errorMsg });
                blockUI.stop();
                vm.dataLoading = false;
            });
            */
        }
    }

})();