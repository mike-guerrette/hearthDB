'use strict';

angular.module('hdb')
    .controller('HomeController', ['$scope',
        function($scope) {
            $scope.message = 'Hello World! from scope';
        }
    ]
);