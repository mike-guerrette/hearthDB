(function() {
    'use strict';

    angular.module('hdb', ['ui.router', 'ngMaterial'])
        .controller('HomeController', ['$scope',
            function($scope) {
                $scope.message = 'Hello World! from scope';
            }
        ]
    );
})();