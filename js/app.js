angular.module('Main', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('firstpage', {
                url: '/firstpage',
                templateUrl: 'views/firstpage/firstpage_wrapper.html',
                controller: 'FirstPageController'
            })
            .state('signup', {
                parent: 'firstpage',
                url: '/signup',
                templateUrl: 'views/firstpage/signup.html'
            })
            .state('login', {
                parent: 'firstpage',
                url: '/login',
                templateUrl: 'views/firstpage/login.html'
            })
            .state('notifyPages', {
                url: '/firstpage',
                templateUrl: 'views/notify/notifyPages_wrapper.html',
                controller: 'NotifyPagesController'
            });
        $urlRouterProvider.otherwise('/firstpage/signup');
    })
    .controller('FirstPageController', function($scope, $http, $state) {
        'use strict';

        function loginView() { state.go('login') }

        function signupView() { state.go('signup') }

        function login() { state.go('notifyPages'); }

        function signup() { state.go('notifyPages'); }

    })
    .controller('NotifyPagesController', function($scope, $http, $state) {

    });