(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueDetailController', VenueDetailController);

    /** @ngInject */
    function VenueDetailController($state, $previousState, $timeout, $location, $anchorScroll, $uibModal,  profileService, menuService, appGlobalVars, venueService, dataTemplates, usStatesOptions, Upload, KEYS, blockUI, $log) {
        var vm = this;
        vm.states = usStatesOptions.getStatesOptions();
        vm.error = false;
        vm.deleteEnabled = false;
        vm.submitType;
        vm.errors = [];
        vm.place = null;
        vm.result;
        vm.file;
        vm.uploadingImage = false;
        vm.uploadAlerts = [];
        vm.progress= 0;
        vm.status ='';
        vm.activeOptions = [{label: 'Online', val: 1 },{ label: 'Offline', val: 0 }];
        vm.venueAdminColumnDef = [
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-venue-detail-admin-button.html', width: 34 },
            { name: 'First',field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }];
        vm.venueStaffColumnDef =[
            { field: 'id', name: '', cellTemplate: 'app/admin/partials/buttons/edit-venue-detail-staff-button.html', width: 34 },
            { name: 'First',field: 'firstName', minWidth: 150, enableCellEdit: false },
            { name: 'Last', field: 'lastName', minWidth: 150, enableCellEdit: false  },
            { name: 'Email', field: 'email', minWidth: 150, enableCellEdit: false  }
        ]
        vm.typeOptions = [
            {label: 'Bar', val: 0},
            {label: 'Cafe', val: 1},
            {label: 'Club', val: 2},
            {label: 'Dispensary', val: 3}
        ];
        vm.dataLoading;
        vm.subNavButtons = [ {label: 'Back', style:'btn btn-link pull-left', action:'back', icon:true, iconStyle:'fa fa-chevron-left'},
            {label: 'Venue', style:'btn btn-primary', action:'venue', icon:false, iconStyle:''},
            {label: 'Admin', style:'btn btn-primary', action:'admin', icon:false, iconStyle:''},
            {label: 'Staff', style:'btn btn-primary', action:'staff', icon:false, iconStyle:''},
            {label: 'Menu', style:'btn btn-primary', action:'menu', icon:false, iconStyle:''}];

        //export
        vm.saveData = saveData;
        vm.editVenueAdminRow = editVenueAdminRow;
        vm.editVenueStaffRow = editVenueStaffRow;
        vm.addMenu = addMenu;
        vm.editMenu =  editMenu;
        vm.updateGrid = updateGrid;
        vm.gotoAnchor = gotoAnchor;
        vm.deleteVenue = deleteVenue;
        vm.displayPlace = displayPlace;
        vm.uploadFiles = uploadFiles;
        vm.closeAlert = closeAlert;

        (function initController() {
            gotoAnchor('navTop');
            $log.log('init venue detail controller get venue id ', appGlobalVars.getVenueId());
            if (!appGlobalVars.getVenueId()) {
                $log.log('we dont have a venue id yet')
                vm.submitType = 'Save';
                vm.venue = dataTemplates.getVenueTmpl();
                //not needed for MVP come back to when necessary
               // vm.hours = dataTemplates.getVenueHoursTmpl();
                vm.menuActive = false;
            } else {
                $log.log('we have a venue id ', appGlobalVars.getVenueId())
                vm.submitType = 'Update';
                getVenue ();
                vm.deleteEnabled = true;
            }
            //display admin grid and menu button if an Admin role is detected
            if(appGlobalVars.getUserRole() === 0) {
                vm.isAdmin = true;
            }else{
                vm.isAdmin = false;
            }


        })();

        function closeAlert(index) {
            vm.uploadAlerts.splice(index, 1);
        }
        function displayPlace () {
            vm.venue.placeId = vm.place.place_id;
            vm.result =  vm.place.geometry.location;
        }
        function deleteVenue () {
            var header = 'WARNING!'
            var msg = ' Woah buddy, Are you sure you want to do that? You are about to remove the Venue data, including Venue Admins, Staff and Menus!'
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/venue/partials/deleteConfirmModal/deleteConfirmModal.html',
                controller: 'DeleteConfirmModalController',
                controllerAs: 'deleteConfirmModalController',
                size: 'sm',
                resolve: {
                    header: function () {
                        return header;
                    },
                    message: function () {
                        return msg;
                    }
                }


            });

            modalInstance.result.then(function (val) {
                if (val === 'confirmed') {
                    removeVenue();
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

        function removeVenue () {
            if(vm.venue) {
                var v = vm.venue;
                if (typeof v.admin != 'undefined'){
                  $log.log('admin ',v.admin);
                  removeVenueAdmins();

                }

                if (v.menu_id  != '') {
                    $log.log('venue has menu ', v.menu_id );
                  menuService.removeMenuById(v.menu_id)

                }

                //display staff
                if (typeof v.staff != 'undefined'){
                  removeVenueStaff();

                }
                venueService.removeVenueById(appGlobalVars.getVenueId());
                appGlobalVars.clearVenue();
            }
            $state.go('admin.venues')
        }
        function removeVenueStaff () {
            var v = vm.venue;
            $log.log('removeVenueStaff - staff : ', v.staff);
            var ids = [];
            for (var key in v.staff) {
                $log.log("obj." + key + " = " + v.staff[key].uid);
                ids.push(v.staff[key].uid)
            }

            var len = ids.length;
            for (var i = 0; i < len; i++) {
              profileService.removeMetaProfileById(ids[i]);
              profileService.removeStaffProfileById(ids[i]);
            }
        }
        function removeVenueAdmins () {
            var v = vm.venue;
            $log.log('removeVenueAdmins - admins : ', v.admin);
            var ids = [];
            for (var key in v.admin) {
                $log.log("obj." + key + " = " + v.admin[key].uid);
                ids.push(v.admin[key].uid)
            }

            var len = ids.length;
            for (var i = 0; i < len; i++) {
              profileService.removeMetaProfileById(ids[i]);
              profileService.removeVenueAdminProfileById(ids[i]);
            }
        }
        function editVenueAdminRow(grid,row) {
            $log.log('editVenueAdminRow : g ', grid, ' r: ', row)
        }
        function editVenueStaffRow(grid, row) {
            $log.log('editVenueAdminRow : g ', grid, ' r: ', row)
        }
        function getVenue (){
            var vKey =  appGlobalVars.getVenueId();
            $log.log('VenueDetailController - getVenue : vKey ',vKey);
            venueService.getVenueById(vKey).then(function (data) {
                $log.log('getVenue - Retrieved venue :', data);
                vm.venue = data;
                //vm.selectedItem = data.active;
                $log.log('vm.selectedItem ', vm.selectedItem)

                if (typeof data.admin != 'undefined'){
                    $log.log('admin ',data.admin);
                    venueService.getVenueAdminListById(vKey).then(function (data) {
                        $log.log('admin list', data)
                        createAdminList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                }
                $log.log('has menu ', data.menu_id )
                //display edit or add button for menu
                if (data.menu_id  != ''){
                    $log.log('venue has menu ', data.menu_id );
                    vm.menuActive = true;

                }else {
                    $log.log('venue does not have a  menu ', data.menu_id );
                    vm.menuActive = false;
                }

                //display staff
                if (typeof data.staff != 'undefined'){
                    $log.log('staff ',data.staff);
                    venueService.getVenueStaffListById(vKey).then(function (data) {
                        $log.log('staff list', data)
                        createStaffList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                }
                if (data.photo_url) {
                    vm.venuePic = data.photo_url;
                }

            }, function (error) {
                $log.log('Error:', error);
            })
        }
        function addMenu(){
            $state.go('admin.menu');
        }
        function editMenu(){
            $state.go('admin.menu');
        }
        function createStaffList(inArray) {
            $log.log('createStaffList in Array ', inArray)
            vm.venueStaff = [];
            var len = inArray.length;
            $log.log('createStaffList array length ', inArray.length)
            for (var i=0; i < len; i++) {
                var uid  = inArray[i].uid;
                $log.log('getting uid ', uid)

                profileService.getVenueStaffProfileById(uid).then(function (data) {
                    $log.log('createStaffList returned ',data);
                    vm.venueStaff.push(data);

                }, function (error) {
                    $log.log('createStaffList returned error : ', error);
                })

            }
        }
        function createAdminList(inArray){
            $log.log('createAdminList ', inArray)
            vm.venueAdmin = [];
            var len = inArray.length;
            $log.log('createAdminList array length ', inArray.length)
            for (var i=0; i < len; i++) {
                var uid  = inArray[i].uid;
                $log.log('getting uid ', uid)
                // START HERE - this is failing .....
                profileService.getVenueAdminProfileById(uid).then(function (data) {
                    $log.log('createAdminList returned ',data);
                    vm.venueAdmin.push(data);

                }, function (error) {
                    $log.log('createAdminList returned error : ', error);
                })

            }

        }
        function createVenue () {
            $log.log('createVenue ', vm.venue)
            venueService.createVenue(vm.venue).then(function (v_id) {
                $log.log('venue created successfuly',v_id);
                appGlobalVars.setVenueId(v_id);
                blockUI.stop();
                getVenue();
                vm.submitType = 'Update';
                vm.deleteEnabled = true;
            }, function (error) {
                vm.dataLoading = false;
                blockUI.stop();
                $log.log('venue returned ', error);
                //display message
            })

        }
        function gotoAnchor (val){
            $log.log('gotoAnchor ', val)
            if(val === 'back') {
                if(appGlobalVars.getUserRole() === 0) {
                    $state.go('admin.venues');
                }
            } else {
                $location.hash(val);
                $anchorScroll();
            }

        }
        function saveData () {
            $log.log('saveData called');
            blockUI.start();
            if (!appGlobalVars.getVenueId()) {
                $log.log('no venue asscociation');
                createVenue();
            } else {
                $log.log('save data', vm.venue);
                var updateObj = {
                    name: vm.venue.name,
                    type: vm.venue.type,
                    desc: vm.venue.desc,
                    address: vm.venue.address,
                    city: vm.venue.city,
                    state: vm.venue.state,
                    zipcode: vm.venue.zipcode,
                    venue_phone: vm.venue.venue_phone,
                    contact_phone: vm.venue.contact_phone,
                    contact_email: vm.venue.contact_email,
                    lat: vm.venue.lat,
                    lng: vm.venue.lng,
                    placeId: vm.venue.placeId,
                    website_url: vm.venue.website_url,
                    facebook_url: vm.venue.facebook_url,
                    active: vm.venue.active
                }
                venueService.updateVenueDetails(appGlobalVars.getVenueId(), updateObj).then(function () {
                    blockUI.stop();
                }, function (error) {
                    $log.log('Error:', error);
                })
            }
        }

        function uploadFiles () {

            $log.log('uploadFiles ', vm.file);
            if (!vm.file) return;
            vm.uploadingImage = true;
            Upload.upload({
                url: KEYS.cloudinary.apiBase + KEYS.cloudinary.cloudName + '/upload',
                data: {
                    upload_preset: KEYS.cloudinary.preset,
                    tags: 'mobile_upload',
                    file: vm.file
                }
            }).progress(function (e) {
                vm.progress = Math.round((e.loaded * 100.0) / e.total);
                vm.status = "Uploading... " + vm.progress + "%";
                $log.log('loaded ', e.loaded, 'progress', vm.progress, 'status ', vm.status);
            }).success(function (data, status) {
                //$rootScope.photos = $rootScope.photos || [];
               // data.context = {custom: {photo: $scope.title}};
               // file.result = data;
                vm.uploadingImage = false;
                $log.log('success ', data, 'status ', status)
                vm.venuePic = data.url;
                updateVenuesPhotoUrl(data.url);
                vm.uploadAlerts.push({ type: 'success', msg: 'Success! ' + vm.file.name +' has been uploaded '});
                vm.file = null;
            }).error(function (data, status) {
                //file.result = data;
                $log.log('error ', data, 'status ', status);
                vm.uploadAlerts.push({ type: 'danger', msg: 'Oh snap! Try to upload your image again!' });
            });

        }
        function updateVenuesPhotoUrl (file) {
            venueService.setVenueProfilePic(appGlobalVars.getVenueId(), file).then(function () {
                $log.log('updateVenuesPhotoUrl saved ');
            }, function (error) {
                $log.log('updateVenuesPhotoUrl Error:', error);
            })
        }
        function updateGrid (val) {
            $log.log('venueDetailController : updateGrid ', val)
            var vKey =  appGlobalVars.getVenueId();
            switch (val) {
                case 'venue_admin':

                    venueService.getVenueAdminListById(vKey).then(function (data) {
                        $log.log('admin list', data)
                        createAdminList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                    break;
                case 'venue_staff':

                    venueService.getVenueStaffListById(vKey).then(function (data) {
                        $log.log('staff list', data)
                        createStaffList(data)
                    }, function (error) {
                        $log.log('Error:', error);
                    })

                    break;
                default:
            }
        }

    }
})();
