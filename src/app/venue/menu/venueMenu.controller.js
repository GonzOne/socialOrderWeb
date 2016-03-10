(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .controller('VenueMenuController', VenueMenuController);

    /** @ngInject */
    function VenueMenuController($state, $location, $anchorScroll, dataTemplates, appGlobalVars, menuService, venueService, blockUI, $uibModal,  $log) {
        var vm = this;
        vm.hasMenu;
        vm.draftBeers;
        vm.canBeers;
        vm.bottleBeers;
        vm.cocktails;
        vm.sparklingwine;
        vm.whitewine;
        vm.redwine;
        vm.beerColumnDef = [
                { field: 'id', name: '', cellTemplate: 'app/venue/partials/buttons/edit-beer-button.html', width: 34 },
                { name: 'Brand', field: 'name', width: 150, enableCellEdit: false },
                { name: 'Desc', field: 'desc', width: 150, enableCellEdit: false  },
                { name: 'Price', field: 'cost', width: 70, enableCellEdit: false  }];
        vm.cocktailColumnDef = [
                { field: 'id', name: '', cellTemplate: 'app/venue/partials/buttons/edit-cocktail-button.html', width: 34 },
                { name: 'Name', field: 'name', width: 150, enableCellEdit: false },
                { name: 'Desc', field: 'desc', width: 200, enableCellEdit: false  },
                { name: 'Price', field: 'cost', width: 70, enableCellEdit: false  }];
        vm.wineColumnDef = [
                { field: 'id', name: '', cellTemplate: 'app/venue/partials/buttons/edit-wine-button.html', width: 34 },
                { name: 'Name', field: 'name', width: 150, enableCellEdit: false },
                { name: 'Desc', field: 'desc', width: 200, enableCellEdit: false  },
                { name: 'Region', field: 'region', width: 100, enableCellEdit: false},
                { name: 'Varietal', field: 'varietal', width: 150, enableCellEdit: false},
                { name: 'Year', field: 'year', width: 70, enableCellEdit: false},
                { name: 'Glass', field: 'glass_cost', width: 70, enableCellEdit: false},
                { name: 'Bottle', field: 'bottle_cost', width: 70, enableCellEdit: false}
        ];
        vm.subNavButtons = [ {label: 'Back', style:'btn btn-link pull-left', action:'back', icon:true, iconStyle:'fa fa-chevron-left'},
            {label: 'Draft Beer', style:'btn btn-primary', action:'draftBeer', icon:false, iconStyle:''},
            {label: 'Bottled Beer', style:'btn btn-primary', action:'bottleBeer', icon:false, iconStyle:''},
            {label: 'Can Beer', style:'btn btn-primary', action:'canBeer', icon:false, iconStyle:''},
            {label: 'Sparkling Wine', style:'btn btn-primary', action:'sparklingWine', icon:false, iconStyle:''},
            {label: 'White Wine', style:'btn btn-primary', action:'whiteWine', icon:false, iconStyle:''},
            {label: 'Red Wine', style:'btn btn-primary', action:'redWine', icon:false, iconStyle:''},
            {label: 'Cocktails', style:'btn btn-primary', action:'cocktails', icon:false, iconStyle:''}
        ]
        //export
        vm.createMenu = createMenu;
        vm.updateGrid = updateGrid;
        vm.editBeerRow = editBeerRow;
        vm.editWineRow = editWineRow;
        vm.editCocktailRow = editCocktailRow;
        vm.gotoAnchor = gotoAnchor;

        (function initController() {
            gotoAnchor('navTop');
            $log.log('VenueMenuController get profile', appGlobalVars.getVenueId());
            var vKey = appGlobalVars.getVenueId();
            venueService.getVenueById(vKey).then(function (data) {
                $log.log('Retieved Venue :', data);
                if (data.menu_id != ''){
                    vm.hasMenu = true;
                    appGlobalVars.setMenuId(data.menu_id);
                    $log.log('we have a menu id', data.menu_id);
                    //add list of items to grids
                    getDraftBeers();
                    getCanBeers();
                    getBottledBeers();
                    //
                    getSparklingWines();
                    getWhiteWines();
                    getRedWines();
                    //
                    getCocktails();
                } else {
                    vm.hasMenu = false;

                    $log.log('menu id is empty');


                }
                //display admin grid and menu button if an Admin role is detected
                if(appGlobalVars.getUserRole() === 0) {
                    vm.isAdmin = true;
                }else{
                    vm.isAdmin = false;
                }

            }, function (error) {
                $log.log('Error:', error);
            })

        })();
        function gotoAnchor (val){
            $log.log('gotoAnchor ', val)
            if(val === 'back') {
                if(appGlobalVars.getUserRole() === 0) {
                     $state.go('admin.detail');
                }

            } else {
                $location.hash(val);
                $anchorScroll();
            }
        }
        function editBeerRow(grid, row) {
            $log.log('editBeerRow : g ', grid, ' r: ', row, ' obj ', row.entity, ' key ', row.entity.key, 'type ',row.entity.type )
            var beerId = row.entity.key;
            var beerType = row.entity.type;
            var modalInstance = $uibModal.open({
                templateUrl: 'app/venue/partials/beerModal/editBeerModal.html',
                controller: 'EditBeerModalController',
                controllerAs: 'editBeerModalController',
                size: 'lg',
                resolve: {
                    beerId: function () {
                        return beerId;
                    },
                    beerType: function () {
                        return beerType;
                    }
                }
            });

            modalInstance.result.then(function (val) {
                $log.log('closed modal', val);
                updateGrid (val);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }
        function editWineRow(grid, row) {
            $log.log('editWineRow : g ', grid, ' r: ', row, ' obj ', row.entity, ' key ', row.entity.key, 'type ',row.entity.type )
            var wineId = row.entity.key;
            var wineType = row.entity.type;
            var modalInstance = $uibModal.open({
                templateUrl: 'app/venue/partials/wineModal/editWineModal.html',
                controller: 'EditWineModalController',
                controllerAs: 'editWineModalController',
                size: 'lg',

                resolve: {
                    wineId: function () {
                        return wineId;
                    },
                    wineType: function () {
                        return wineType;
                    }
                }
            });

            modalInstance.result.then(function (val) {
                $log.log('closed modal ', val);
                updateGrid (val);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }
        function editCocktailRow(grid, row) {
            $log.log('editCocktailRow : g ', grid, ' r: ', row, ' obj ', row.entity, ' key ', row.entity.key, 'type ',row.entity.type )
            var cocktailId = row.entity.key;
            var cocktailType = row.entity.type;
            var modalInstance = $uibModal.open({
                templateUrl: 'app/venue/partials/cocktailModal/editCocktailModal.html',
                controller: 'EditCocktailModalController',
                controllerAs: 'editCocktailModalController',
                size: 'lg',

                resolve: {
                    cocktailId: function () {
                        return cocktailId;
                    },
                    cocktailType: function () {
                        return cocktailType;
                    }
                }
            });

            modalInstance.result.then(function (val) {
                $log.log('closed modal ', val);
                updateGrid (val);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function updateGrid (val) {
            $log.log('updateGrid ', val)

            switch (val) {
                case 'draft':
                    getDraftBeers();
                    break;
                case 'can':
                    getCanBeers();
                    break;
                case 'bottle':
                    getBottledBeers();
                    break;
                case 'cocktail':
                    getCocktails();
                    break;
                case 'sparkling':
                    getSparklingWines();
                    break;
                case 'white':
                    getWhiteWines();
                    break;
                case 'red':
                    getRedWines();
                    break;
                default:
            }
        }
        function getDraftBeers() {
            var m = appGlobalVars.getMenuId();
            menuService.getDraftBeersByMenuId(m).then(function (draftBeerList) {
                $log.log('getDraftBeersByVenueId returned ', draftBeerList)
                vm.draftBeers = draftBeerList;
            }, function (error) {
                vm.draftBeers = [];
                $log.log('getDraftBeersByVenueId ', error)
            })
        }
        function getCanBeers() {
            var m = appGlobalVars.getMenuId();
            menuService.getCanBeersByMenuId(m).then(function (canBeerList) {
                $log.log('getCanBeersByMenuId returned ', canBeerList)
                vm.canBeers = canBeerList;
            }, function (error) {
                vm.canBeers = [];
                $log.log('getCanBeersByMenuId ', error)
            })
        }
        function getBottledBeers() {
            var m = appGlobalVars.getMenuId();
            menuService.getBottleBeersByMenuId(m).then(function (bottleBeerList) {
                $log.log('getBottleBeersByMenuId returned ', bottleBeerList)
                vm.bottleBeers = bottleBeerList;
            }, function (error) {
                vm.bottleBeers =[];
                $log.log('getBottleBeersByMenuId ', error)
            })
        }
        function getSparklingWines() {
            var m = appGlobalVars.getMenuId();
            menuService.getSparklingWineByMenuId(m).then(function (sparklingWineList) {
                $log.log('getSparklingWineByMenuId returned ', sparklingWineList)
                vm.sparklingwine = sparklingWineList;
            }, function (error) {
                vm.sparklingwine =[];
                $log.log('getSparklingWineByMenuId ', error)
            })
        }
        function getWhiteWines() {
            var m = appGlobalVars.getMenuId();
            menuService.getWhiteWineByMenuId(m).then(function (whiteWineList) {
                $log.log('getWhiteWineByMenuId returned ', whiteWineList)
                vm.whitewine = whiteWineList;
            }, function (error) {
                vm.sparklingwine =[];
                $log.log('getWhiteWineByMenuId ', error)
            })
        }
        function getRedWines() {
            var m = appGlobalVars.getMenuId();
            menuService.getRedWineByMenuId(m).then(function (redWineList) {
                $log.log('getRedWineByMenuId returned ', redWineList)
                vm.redwine = redWineList;
            }, function (error) {
                vm.redwine =[];
                $log.log('getRedWineByMenuId ', error)
            })
        }
        function getCocktails() {
            var m = appGlobalVars.getMenuId();
            menuService.getCocktailsByMenuId(m).then(function (cocktailList) {
                $log.log('getCocktailsByMenuId returned ', cocktailList)
                vm.cocktails  = cocktailList;
            }, function (error) {
                vm.cocktails  =[];
                $log.log('getRedWineByMenuId ', error)
            })
        }
        function addMenuIdToVenue (m_id) {
            $log.log('add menu key : ', m_id, 'to venue : ', appGlobalVars.getVenueId() );
            venueService.setVenueMenu(appGlobalVars.getVenueId(), m_id).then(function () {
                $log.log('addMenuIdToVenue : successfull');
                vm.hasMenu = true;
                appGlobalVars.setMenuId(m_id);
                blockUI.stop();
            }, function (error) {
                blockUI.stop();
                $log.log('addMenuIdToVenue : returned ', error);
                //display message
            })

        }

        function createMenu () {

            if (!vm.hasMenu) {
                blockUI.start();
                var tmpl = dataTemplates.getVenueMenuTmpl();
                tmpl.venue_id = appGlobalVars.getVenueId();
                tmpl.menu =  dataTemplates.getMenuTmpl();
                $log.log('createMenu for venue : ', tmpl.venue_id, ' menu obj : ', tmpl);
                menuService.createMenu(tmpl).then(function (m_id) {
                    $log.log('menu created successfuly: key - ',m_id);
                    addMenuIdToVenue(m_id)
                }, function (error) {
                    vm.dataLoading = false;
                    blockUI.stop();
                    $log.log('menu returned ', error);
                    //display message
                })

            }
        }
    }
})();
