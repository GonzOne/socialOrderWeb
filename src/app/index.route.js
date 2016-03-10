(function() {
  'use strict';

  angular
    .module('socialOrderWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainController'

      })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'

        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'register'

        })
        .state('admin', {
          'abstract': true,
          url: '/admin',
          templateUrl: 'app/admin/app/app.html',
            resolve: {
                loggedIn: function(AuthService){
                    return AuthService.isLoggedIn();
                },
                isAdmin: function(AuthService){
                    return AuthService.isAdmin();
                }
            }
        })
        .state('admin.dashboard', {
            url: '/dashboard',
            title: 'Dashboard',
            templateUrl: 'app/admin/dashboard/dashboard.html',
            controller: 'AdminDashboardController',
            controllerAs: 'adminDashboardController'

        })
        .state('admin.profiles', {
            url: '/profiles',
            title: 'Profiles',
            templateUrl: 'app/admin/profiles/profiles.html',
            controller: 'AdminProfilesController',
            controllerAs: 'adminProfilesController'
        })
        .state('admin.venues', {
            url: '/venues',
            title: 'Venues',
            templateUrl: 'app/admin/venues/venues.html',
            controller: 'AdminVenuesController',
            controllerAs: 'adminVenuesController'
        })
        .state('admin.detail', {
            url: '/detail/:venueId',
            title: 'Detail',
            templateUrl: 'app/venue/detail/venue.detail.html',
            controller: 'VenueDetailController',
            controllerAs: 'venueDetailController',
            resolve: {
                venue: ['$stateParams', 'venueService',
                    function($stateParams, venueService) {
                        return venueService.getVenueById($stateParams.venueId);
                    }
                ],
                role: ['AuthService',
                    function(AuthService) {
                        return AuthService.getUserRole();
                    }
                ]
            }

        })
        .state('admin.menu', {
            url: '/menu/:menuId',
            title: 'Menu',
            templateUrl: 'app/venue/menu/venue.menu.html',
            controller: 'VenueMenuController',
            controllerAs: 'venueMenuController',
            resolve: {
                menu: ['$stateParams', 'menuService',
                    function($stateParams, menuService) {
                        return menuService.getMenuById($stateParams.menuId);
                    }
                ],
                role: ['AuthService',
                    function(AuthService) {
                        return AuthService.getUserRole();
                    }
                ]
            }

        })
        .state('venue', {
             'abstract': true,
              url: '/venue',
              templateUrl: 'app/venue/app/venue.app.html',
              resolve: {
                  isLoggedIn: function (AuthService) {
                      return AuthService.isLoggedIn();
                  }
              }
         })
         .state('venue.dashboard', {
              url: '/dashboard',
              title: 'Dashboard',
              templateUrl: 'app/venue/dashboard/venue.dashboard.html',
              controller: 'VenueDashboardController',
              controllerAs: 'venueDashboardController'
          })
          .state('venue.staff', {
                url: '/staff',
                title: 'Staff',
                templateUrl: 'app/venue/staff/venue.staff.html',
                controller: 'VenueStaffController',
                controllerAs: 'venueStaffController'
          })
          .state('venue.detail', {
              url: '/detail',
              title: 'Detail',
              templateUrl: 'app/venue/detail/venue.detail.html',
              controller: 'VenueDetailController',
              controllerAs: 'venueDetailController'
          })
          .state('venue.account', {
            url: '/account',
            title: 'Account',
            templateUrl: 'app/venue/account/venue.account.html',
            controller: 'VenueAccountController',
            controllerAs: 'venueAccountController'
          })
          .state('venue.events', {
            url: '/events',
            title: 'Events',
            templateUrl: 'app/venue/events/venue.events.html',
            controller: 'VenueEventsController',
            controllerAs: 'venueEventsController'
          })
          .state('venue.menu', {
              url: '/menu/:menuId',
              title: 'Menu',
              templateUrl: 'app/venue/menu/venue.menu.html',
              controller: 'VenueMenuController',
              controllerAs: 'venueMenuController',
                menu: ['$stateParams', 'menuService',
                    function($stateParams, menuService) {
                        return menuService.getMenuById($stateParams.menuId);
                    }
                ]
          }).
            state('logout', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'mainController',
                resolve: {
                    logout: function(AuthService){
                        AuthService.logout();
                    }
                }
            });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();
