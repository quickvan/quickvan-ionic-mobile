// Ionic Starter App
angular.module('quickvan.controllers', []);
angular.module('quickvan.services', []);
angular.module('quickvan.filters', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quickvan', [
  'ionic',
  'quickvan.controllers',
  'quickvan.services',
  'quickvan.filters',
  'ngResource',
  'ngCordova',
  'uiGmapgoogle-maps',
  'pusher-angular'
])

.constant('appConfig', {
  baseUrl: 'http://localhost',
  pusherKey: 'pusherKey'
})

.run(function($ionicPlatform, $window, appConfig) {
  $window.client = new Pusher(appConfig.pusherKey);

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function (
    $stateProvider,
    $urlRouterProvider,
    $provide,
    appConfig
) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('client', {
      abstract: true,
      cache: false,
      url: '/client',
      templateUrl: 'templates/client/menu.html',
      controller: 'ClientMenuController'
    })
    .state('client.travel', {
      url: '/travel',
      templateUrl: 'templates/client/travel.html',
      controller: 'ClientTravelController'
    })
    .state('client.view-travel', {
      cache: false,
      url: '/view-travel',
      templateUrl: 'templates/client/view-travel.html',
      controller: 'ClientViewTravelController'
    })
    /*
    .state('driver', {
      abstract: true,
      cache: false,
      url: '/driver',
      templateUrl: 'templates/driver/menu.html',
      controller: 'DriverMenuController'
    })
    .state('driver.travel', {
      url: '/travel',
      templateUrl: 'templates/driver/travel.html',
      controller: 'DriverOrderController'
    })
    .state('driver.view-travel', {
      cache: false,
      url: '/view-travel/:id',
      templateUrl: 'templates/driver/view-travel.html',
      controller: 'DriverViewOrderController'
    })*/;

    $urlRouterProvider.otherwise('/login');
});
