angular.module('Main', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/sign-up.html',
                controller: 'FirstPageController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/log-in.html',
                controller: 'FirstPageController'
            });
        $urlRouterProvider.otherwise('/signup');
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