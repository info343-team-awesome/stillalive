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
    .directive('phonenumberDirective', ['$filter', function($filter) {
        /*
         Intended use:
         <phonenumber-directive placeholder='prompt' model='someModel.phonenumber'></phonenumber-directive>
         Where:
         someModel.phonenumber: {String} value which to bind only the numeric characters [0-9] entered
         ie, if user enters 617-2223333, value of 6172223333 will be bound to model
         prompt: {String} text to keep in placeholder when no numeric input entered
         */

        function link(scope, element, attributes) {

            // scope.inputValue is the value of input element used in template
            scope.inputValue = scope.phonenumberModel;

            scope.$watch('inputValue', function(value, oldValue) {

                value = String(value);
                var number = value.replace(/[^0-9]+/g, '');
                scope.phonenumberModel = number;
                scope.inputValue = $filter('phonenumber')(number);
            });
        }

        return {
            link: link,
            restrict: 'E',
            scope: {
                phonenumberPlaceholder: '=placeholder',
                phonenumberModel: '=model',
            },
            // templateUrl: '/static/phonenumberModule/template.html',
            template: '<input ng-model="inputValue" type="tel" class="phonenumber" placeholder="{{phonenumberPlaceholder}}" title="Phonenumber (Format: (999) 9999-9999)">',
        };
    }])
    .controller('FirstPageController', function($scope, $http, $state, userName) {
        'use strict';

        var imageIndex = 0;
        var imagesArray = [
            "img/stars_bckgrnd.jpeg",
            "img/umbrella_bckgrnd.jpeg"
        ];

        function changeBackground(){
            var index = imageIndex++ % imagesArray.length;
            $("body").css("background","url('"+ imagesArray[index] +"');" +
                "background-repeat: no-repeat; background-size: cover;");
        }

        $(document).ready(function() {
            console.log('ready');
            setInterval(changeBackground, 100);
        });

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