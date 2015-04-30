'use strict';

angular.module('hdb')
    .controller('CardsController', ['$scope', 'CardService',
        function($scope, CardService) {
            CardService.getList(function(err, data) {
                if (err) {
                    console.log(err, data);
                } else {
                    $scope.cards = data;
                }
            });
        }
    ]
);