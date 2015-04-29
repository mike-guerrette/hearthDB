(function() {
    'use strict';

    angular.module('hdb', ['ui.router', 'ngMaterial', 'ionic'])
        .controller('HomeController', ['$scope',
            function($scope) {
                $scope.message = 'Hello World! from scope';
            }
        ]
    )
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if(window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });
})();