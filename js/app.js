angular.module('Main', ['ui.router'])
    .factory('userName', function() {
        return [];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            //firstpage parent view
            .state('firstpage', {
                url: '/i',
                templateUrl: 'views/firstpage/firstpage_wrapper.html',
                controller: 'FirstPageController'
            })
            //children view to firstpage
            .state('about', {
                parent: 'firstpage',
                url: '/about',
                templateUrl: 'views/firstpage/about.html'
            })
            .state('signup', {
                parent: 'firstpage',
                url: '/signup',
                templateUrl: 'views/firstpage/signup.html'
            })

            //children patent view
            .state('notifyPages', {
                url: '/m',
                templateUrl: 'views/notify/notifyPages_wrapper.html',
                controller: 'NotifyPagesController'
            })
            //children pages to notify
            .state('info', {
                parent: 'notifyPages',
                url: '/info',
                templateUrl: 'views/notify/phoneAddress.html'
            })
            .state('notify', {
                parent: 'notifyPages',
                url: '/confirm',
                templateUrl: 'views/notify/confirm.html'
            });
        $urlRouterProvider.otherwise('/i/about');
    })
    .controller('FirstPageController', function($scope, $http, $state, userName) {
        'use strict';

        $scope.data = {};

        //function loginView() { state.go('login') }
        //
        //function signupView() { state.go('signup') }

        function login() { state.go('notifyPages'); }

        $scope.signup = function() {
            userName[0] = $scope.data.fname;
            $state.go('info');
        }

    })
    .controller('NotifyPagesController', function($scope, $http, $state, userName) {

        $scope.fname = userName[0];

        $scope.notify = function() { $state.go('notify'); };

        $scope.save = function() {

        }
    });