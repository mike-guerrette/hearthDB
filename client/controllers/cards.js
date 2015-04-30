'use strict';

angular.module('hdb')
    .controller('CardsController', ['$scope', 'CardService',
        function($scope, CardService) {

            $scope.currentPage = 1;
            $scope.limit = 15;

            $scope.loadCards = function() {
                CardService.getList({
                        limit: $scope.limit,
                        page: $scope.currentPage
                    },
                    function(err, data) {
                        if (err) {
                            console.log(err, data);
                        } else {
                            $scope.cards = data.cards;
                            $scope.totalItems = data.count;
                        }
                    }
                );
            };

            $scope.loadCards();

            $scope.pageChanged = function() {
                $scope.loadCards();
            };
        }
    ]
);