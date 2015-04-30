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
                .state('cards', {
                    url: '/cards',
                    templateUrl: 'views/cards.html',
                    controller: 'CardsController'
                });
        }
    );
})();