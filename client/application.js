(function() {
    'use strict';

    angular.module('hdb', ['ui.router'])
        .controller('HomeController', ['$scope',
            function($scope) {
                $scope.message = 'Hello World! from scope';
            }
        ]
    )
})();