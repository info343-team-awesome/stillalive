angular.module('Main', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/log-in.html',
                controller: 'LoginController'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/sign-up.html',
                controller: 'SignUpController'
            });
        $urlRouterProvider.otherwise('/index');
    })
    .controller('LoginController', function($scope, $http) {
        'use strict';
    })
    .controller('SignUpController', function($scope, $http) {
        'use strict';
    });
//
//angular.module(' ', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
//    .config(function($stateProvider, $urlRouterProvider) {
//        $stateProvider
//            .state('chooseContact', {
//                url: '/choose-contact',
//                templateUrl: 'views/notify-who.html',
//                controller: 'ContactController'
//            });
//        $urlRouterProvider.otherwise('/chooseContact');
//    })
//    .controller('ContactController', function($scope, $http) {
//        'use strict'
//    });