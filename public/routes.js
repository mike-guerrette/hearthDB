(function() {
    'use strict';

    angular.module('hdb').config(
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                    controller: 'HomeController'
                })
                .state('test', {
                    url: '/test/:num',
                    templateUrl: 'views/home.html',
                    controller: function($scope, $stateParams) {
                        $scope.message = 'TEST: Number = ' + $stateParams.num;
                    }
                });
        }
    );
})();