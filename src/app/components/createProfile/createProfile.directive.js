(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .directive('createProfile', createProfile);

    /** @ngInject */
    function createProfile() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/createProfile/createProfile.html',
            scope: true,
            controller: AddAdminController,
            controllerAs: 'vm',
            bindToController: {
                creationType: '=',
                ctrlFn: '&'
            }
        };

        return directive;

        /** @ngInject */
        function AddAdminController(profileService, venueService, appGlobalVars, dataTemplates, Auth, moment, blockUI, $log) {
            var vm = this;
            vm.isToggled = false;
            vm.dataLoading = false;
            vm.user = {
                firstName:'',
                lastName:'' ,
                email: '',
                password: ''
            }
            //export
            vm.createProfile = createProfile;
            vm.toggleForm = toggleForm;
            function resetForm() {
                vm.user.firstName = '';
                vm.user.lastName = '';
                vm.user.email = '';
                vm.user.password = '';
            }
            function createRoleProfile (uid) {
                switch (vm.creationType) {
                    case 0: //admin
                        var adminTmpl =  dataTemplates.getAdminTmpl();
                        adminTmpl.uid = uid,
                        adminTmpl.firstName = vm.user.firstName,
                        adminTmpl.lastName = vm.user.lastName,
                        adminTmpl.email = vm.user.email
                        profileService.createAdminProfile(adminTmpl).then(function (uid) {
                            $log.log('admin profile created',uid);
                            blockUI.stop();
                            vm.dataLoading = false;
                            vm.isToggled = false;
                            resetForm();
                            vm.ctrlFn({value : 'admin'});
                        }, function (error) {
                            blockUI.stop();
                            vm.dataLoading = false;
                            $log.log('createProfile returned ', error);
                            //display dialog
                        })
                        break;
                    case 2://staff
                        var staffTmpl =  dataTemplates.getStaffTmpl();
                            staffTmpl.uid = uid,
                            staffTmpl.firstName = vm.user.firstName,
                            staffTmpl.lastName = vm.user.lastName,
                            staffTmpl.email = vm.user.email
                        var venue =  appGlobalVars.getVenueId();
                        profileService.createStaffProfile(staffTmpl).then(function (uid) {
                            $log.log('staff profile created',uid);
                            //add staff member to venue array
                            venueService.setVenueStaff(venue, uid).then(function (k) {
                                $log.log('setVenueStaff saved - Returned staff key :', k);
                            profileService.setVenueIdInStaffProfile(uid, venue).then(function (k) {
                                $log.log('setVenueIdInStaffProfile saved - Returned staff key :', k);
                                blockUI.stop();
                                vm.dataLoading = false;
                                vm.isToggled = false;
                                resetForm();
                                vm.ctrlFn({value : 'venue_staff'});
                            }, function (error) {
                                blockUI.stop();
                                vm.dataLoading = false;
                                //display error
                                $log.log('Error:', error);
                            })

                            }, function (error) {
                                blockUI.stop();
                                vm.dataLoading = false;
                                //display error
                                $log.log('Error:', error);
                            })

                        }, function (error) {
                            blockUI.stop();
                            vm.dataLoading = false;
                            $log.log('create staff Profile returned ', error);
                            //display dialog
                        })
                        break;
                    case 3://venue admin
                        createVenueAdminProfile(uid);
                        /*
                        var venueTmpl = dataTemplates.getVenueAdminTmpl();
                            venueTmpl.uid = uid,
                            venueTmpl.firstName =  vm.user.firstName,
                            venueTmpl.lastName = vm.user.lastName,
                            venueTmpl.email = vm.user.email,
                            profileService.createVenueAdminProfile(venueTmpl).then(function (uid) {
                                $log.log('venue admin profile created',uid);
                                //add new admin to venue
                                venueService.setVenueAdmin(appGlobalVars.getVenueId(), uid).then(function (k) {
                                    $log.log('setVenueAdmin - Returned staff key :', k);
                                    blockUI.stop();
                                    vm.dataLoading = false;
                                    vm.isToggled = false;
                                    resetForm();
                                }, function (error) {
                                    $log.log('Error:', error);
                                    blockUI.stop();
                                    vm.dataLoading = false;
                                    //display error
                                })

                            }, function (error) {
                                blockUI.stop();
                                vm.dataLoading = false;
                                $log.log('createProfile returned ', error);
                                //display dialog
                            })
                         */
                        break;
                    default:
                        break;
                }

            }
            function addAdminProfileToVenue(uid){
                venueService.setVenueAdmin(appGlobalVars.getVenueId(), uid).then(function (k) {
                    $log.log('setVenueAdmin - Returned staff key :', k);
                    addVenueIDToAdminProfile(uid);
                    /*
                    blockUI.stop();
                    vm.dataLoading = false;
                    vm.isToggled = false;
                    resetForm();
                    vm.ctrlFn({value : 'venue_staff'});
                    */
                }, function (error) {
                    $log.log('Error:', error);
                    blockUI.stop();
                    vm.dataLoading = false;
                    //display error
                })
            }

            function addVenueIDToAdminProfile(uid){
                $log.log('createProfileDirective - addVenueIDToAdminProfile ', uid)
                profileService.addVenueIdToAdminProfile(uid,appGlobalVars.getVenueId()).then(function () {
                    $log.log('addVenueIdToAdminProfile - Returned ok');
                    blockUI.stop();
                    vm.dataLoading = false;
                    vm.isToggled = false;
                    resetForm();
                }, function (error) {
                    $log.log('Error:', error);
                    blockUI.stop();
                    vm.dataLoading = false;
                    //display dialog error
                })


            }

            function createVenueAdminProfile(uid) {
                var venueTmpl = dataTemplates.getVenueAdminTmpl();
                venueTmpl.uid = uid,
                    venueTmpl.firstName =  vm.user.firstName,
                    venueTmpl.lastName = vm.user.lastName,
                    venueTmpl.email = vm.user.email,
                    profileService.createVenueAdminProfile(venueTmpl).then(function (uid) {
                        $log.log('venue admin profile created',uid);
                        addAdminProfileToVenue(uid);
                        vm.ctrlFn({value : 'venue_admin'});
                        //add new admin to venue
                        /*
                        venueService.setVenueAdmin(appGlobalVars.getVenueId(), uid).then(function (k) {
                            $log.log('setVenueAdmin - Returned staff key :', k);
                            blockUI.stop();
                            vm.dataLoading = false;
                            vm.isToggled = false;
                            resetForm();
                        }, function (error) {
                            $log.log('Error:', error);
                            blockUI.stop();
                            vm.dataLoading = false;
                            //display error
                        })
                        */

                    }, function (error) {
                        blockUI.stop();
                        vm.dataLoading = false;
                        $log.log('createProfile returned ', error);
                        //display dialog error
                    })
            }
            function createMetaProfile(uid) {
                var metaProfile = dataTemplates.getMetaTmpl();
                $log.log('createMetaProfile : metaProfile tmpl before adjusting', metaProfile)
                metaProfile.uid = uid;
                metaProfile.role = vm.creationType;
                $log.log('createMetaProfile called : ',metaProfile)
                profileService.createMetaProfile(metaProfile).then(function (uid) {
                    $log.log('meta profile created',uid);
                    createRoleProfile(uid)
                }, function (error) {
                    blockUI.stop();
                    $log.log('createProfile returned ', error);
                    //display dialog message
                })
            }

            function createUser () {
              var user = {
                  email: vm.user.email,
                  password: vm.user.password
              }
                Auth.$createUser(user).then(function (authData) {
                    $log.log('created new user in Firebase : ', authData.uid);
                    createMetaProfile(authData.uid);
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
                    //display dialog message
                });

            }
            function createProfile () {
                $log.log('createProfile type : ', vm.creationType)
                blockUI.start();
                vm.dataLoading = true;
                //may want to validate stuff here.
                createUser();
            }

            function toggleForm() {
                vm.isToggled = !vm.isToggled;
                $log.log('toggleForm ',vm.isToggled );
            }
        }
    }

})();
