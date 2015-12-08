angular.module('Main', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('firstpage-signup', {
                url: '/firstpage-signup',
                templateUrl: 'views/firstpage-signup.html',
                controller: 'FirstPageController'
            })
            .state('firstpage-login', {
                url: '/firstpage-login',
                templateUrl: 'views/firstpage-login.html',
                controller: 'FirstPageController'
            });
        $urlRouterProvider.otherwise('/firstpage-signup');
    })
    .controller('FirstPageController', function($scope, $http) {
        'use strict';

        $('#login-button').click(function() {
            $('#login-button').addClass('selected');
            $('#signup-button').removeClass('selected');
        });

        $('#signup-button').click(function() {
            $('#signup-button').addClass('selected');
            $('#login-button').removeClass('selected');
        });



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