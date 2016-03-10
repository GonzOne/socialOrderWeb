(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($state, dataTemplates, Auth, appGlobalVars, profileTemplate, profileService, venueService, blockUI,  $log) {
        var vm = this;
        vm.error =[];
        vm.dataLoading;
        vm.user = profileTemplate.getProfileTmpl();
        $log.log('register controller loaded ',vm)

        function createMetaProfile(uid) {
            var metaProfile = dataTemplates.getMetaTmpl();
            metaProfile.uid = uid;
            metaProfile.role = 3;
             $log.log('register controller ',metaProfile)
            profileService.createMetaProfile(metaProfile).then(function (uid) {
                $log.log('meta profile created',uid);
                blockUI.stop();
                createRoleProfile(metaProfile)
                //$state.go('venue.dashboard');
            }, function (error) {
                blockUI.stop();
                $log.log('createProfile returned ', error);
            })
        }
        function createRoleProfile (metaProfile) {
            $log.log('createRoleProfile for ',metaProfile);
            appGlobalVars.setUserRole(metaProfile.role)
            switch (metaProfile.role) {
                case 3:
                    var venueTmpl = dataTemplates.getVenueAdminTmpl();
                    venueTmpl.uid = metaProfile.uid;
                    venueTmpl.firstName =  vm.user.firstName;
                    venueTmpl.lastName = vm.user.lastName;
                    venueTmpl.email = vm.user.email;

                    profileService.createVenueAdminProfile(venueTmpl).then(function (uid) {
                        $log.log('meta profile created',uid);
                        blockUI.stop();
                        $state.go('venue.dashboard');
                    }, function (error) {
                        blockUI.stop();
                        $log.log('createProfile returned ', error);
                    })

                    break;
                default:
                    break;
            }
        }
        function login(newUser) {
            Auth.$authWithPassword(newUser).then(function (authData) {
                $log.log(authData);
                appGlobalVars.setUserId(authData.uid);
                appGlobalVars.setUserLoggedIn(true);
                createMetaProfile(authData.uid);
            }, function (error) {
                vm.dataLoading = false;
                blockUI.stop();
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
                //display message
            });
        }
        function register() {
            blockUI.start();
            vm.dataLoading = true;
            $log.log('register business : First', vm.user.firstName , ' last : ', vm.user.lastName,
            ' email :', vm.user.email, ' password : ',vm.user.password, ' role : ',vm.user.role);
            var user = {
                email: vm.user.email,
                password: vm.user.password
            }
            Auth.$createUser(user).then(function (authData) {
                $log.log('register user returned : ', authData);
                login(user);
            }, function (error) {
                vm.dataLoading = false;
                blockUI.stop();
                var errorMsg;
                $log.log('error.code ', error.code)
                switch (error.code) {
                    case 'EMAIL_TAKEN':
                        errorMsg = 'The new user account cannot be created because the email is already in use.';
                        break;
                    case 'INVALID_EMAIL':
                        errorMsg = 'The specified email is not a valid email.';
                        break;
                    default:
                        errorMsg = 'Error creating user: ' + error;
                }
                $log.log('errorMsg ', errorMsg);
                //display message
            });

        }

        // exports
        vm.register = register;
    }
})();