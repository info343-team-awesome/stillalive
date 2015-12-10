angular.module('Main', ['ui.router'])
    .factory('userData', function() {
        return {};
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

            //notify patent view
            .state('notifyPages', {
                url: '/m',
                templateUrl: 'views/notify/notifyPages_wrapper.html',
                controller: 'NotifyPagesController'
            })
            //children pages to notify
            .state('info', {
                parent: 'notifyPages',
                url: '/info',
                templateUrl: 'views/notify/phone.html'
            })
            .state('notify', {
                parent: 'notifyPages',
                url: '/confirm',
                templateUrl: 'views/notify/confirm.html',
                controller: 'confirmController'
            })
            .state('endpage', {
                parent: 'notifyPages',
                url: '/endpage',
                templateUrl: 'views/notify/endpage.html',
                controller: 'EndPageController'
            });
        $urlRouterProvider.otherwise('/i/about');
    })
    .controller('FirstPageController', function($scope, $http, $state, userData) {
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

        $scope.signup = function() {
            userData.fname = $scope.data.fname;
            $state.go('info');
        }

    })
    .controller('NotifyPagesController', function($scope, $http, $state, userData) {

        $scope.fname = userData.fname;

        $scope.data = {};

        $scope.notify = function() {
            userData.phoneNum = $scope.data.phoneNum.split('-').join('');
            console.log(userData.phoneNum);
            $state.go('notify');
        };
    })
    .controller('EndPageController', function($scope, $http, $state, userData) {
        $scope.fname = userData.fname;
        $scope.address = userData.address;

    })
    .controller('confirmController', function($scope, $http, $state, userData) {
        $scope.goNext = function() { $state.go('endpage'); };

        var userAddress; // address of user formatted as string (postal address)
        var addressLatLng; // latlng of user's address
        var geocoder = new google.maps.Geocoder();
        var bounds;
        //var map;
        var interval; //time interval to call function checkLocation
        var marker; // current marker on map


        // create the map based on the current position
        navigator.geolocation.getCurrentPosition(function (position) {
            // define latlng at current position
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // set mapOptions to center at latlng
            var mapOptions = {
                zoom: 15,
                center: latlng
            };
            // create map with center at latlng
            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        });

        // when find button is clicked display the address to user
        $('#button').click(function () {
            console.log('find');
            var address = document.getElementById("address").value;
            // use geocoder to find the user entered address
            geocoder.geocode({'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log(results[0].formatted_address);
                    //console.log(results[0].geometry.location);
                    userAddress = results[0].formatted_address;
                    addressLatLng = results[0].geometry.location; // latlng of user address
                    console.log('arrival address: ' + addressLatLng);

                    // define the bounds using user entered address
                    var latlngBoundsNE = new google.maps.LatLng(addressLatLng.lat()
                        + .00092, addressLatLng.lng() + .00092); //ne bounds
                    var latlngBoundsSW = new google.maps.LatLng(addressLatLng.lat()
                        - .00092, addressLatLng.lng() - .00092); //sw bounds
                    //console.log('latlngBounds1: ' + latlngBounds1);
                    //console.log('latlngBounds2: ' + latlngBounds2);
                    bounds = new google.maps.LatLngBounds(latlngBoundsSW, latlngBoundsNE);
                    console.log('bounds: ' + bounds);

                    $('#postalAddress').html("Is this your address: " + results[0].formatted_address);
                }
            });
        });

        // when yes button is clicked center map to user's address and display marker,
        // and start checking to see if they arrive at the address
        $('#yes-button').click(function () {
            console.log('Hello');

            $scope.map.setCenter(addressLatLng);

            //clear existing marker from map;
            if (marker != null) {
                //marker.setMap(null);
            }

            marker = new google.maps.Marker({
                map: $scope.map,
                position: addressLatLng
            });

            //every 5 seconds call another function that gets the current position
            // and checks if its close to the address entered
            interval = window.setInterval(checkPosition, 60000);

        });

        function checkPosition() {
            navigator.geolocation.getCurrentPosition(function(position) {
                var currentLatLng = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                console.log('currentLatLng: ' + currentLatLng);
                console.log(userData.phoneNum);

                if (bounds.contains(currentLatLng)) {
                    alert('Call your friend');

                    var request = $.ajax({
                        headers: {
                            Authorization: "Basic " + btoa("AC481de4d39673a55296705530e83931" +
                                "d1:4de9db859d01d78791c4c194ec51e16b")
                        },
                        method: "POST",
                        url: "https://api.twilio.com/2010-04-01/Accounts/AC481de4d39673" +
                        "a55296705530e83931d1/Messages.json",
                        data: {To: userData.phoneNum, From: '+17315034778',
                            Body: userData.fname + ' has arrived home.'} // arrived at + address
                    });

                    request.done(function (msg) {
                        console.log(msg);
                    });

                    request.fail(function (jqXHR, textStatus) {
                        console.log("Request failed: " + textStatus);
                    });

                    clearInterval(interval);
                }
            });
        }
    });