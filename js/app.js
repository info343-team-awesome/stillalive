angular.module('Main', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('firstpage', {
                url: '/firstpage',
                templateUrl: 'firstpage/firstpage_wrapper.html',
                controller: 'FirstPageController'
            })
            .state('signup', {
                parent: 'firstpage',
                url: '/signup',
                templateUrl: 'views/signup.html',
                controller: 'FirstPageController'
            })
            .state('login', {
                parent: 'firstpage',
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'FirstPageController'
            });
        $urlRouterProvider.otherwise('firstpage/signup');
    })
    .controller('FirstPageController', function($scope, $http) {
        'use strict';

        function loginView() {
            $('#login-button').addClass('selected');
            $('#signup-button').removeClass('selected');
        }

        function signupView() {
            $('#signup-button').addClass('selected');
            $('#login-button').removeClass('selected');
        }

        function login() {
            // this should theoretically switch to a notify view
            // but since we aren't doing that yet, this just navigates
            // to the navigate page
            //this comment is just so I remember that fact
            window.location.href = 'notify.html'
        }

        function signup() {
            // this should theoretically switch to a notify view
            // but since we aren't doing that yet, this just navigates
            // to the navigate page
            //this comment is just so I remember that fact
            window.location.href = 'notify.html'
        }



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