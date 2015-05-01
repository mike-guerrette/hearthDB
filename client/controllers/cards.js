'use strict';

angular.module('hdb')
    .controller('CardsController', ['$scope', 'CardService',
        function($scope, CardService) {

            $scope.currentPage = 1;
            $scope.limit = 15;

            $scope.sort_type = 'name';
            $scope.sort_desc = true;

            $scope.order = '-name';

            $scope.loadCards = function() {
                CardService.getList({
                        limit: $scope.limit,
                        page: $scope.currentPage,
                        order: $scope.order,
                        fields: ['name', 'type']
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

            $scope.sort = function($event) {
                var type = angular.element($event.target).text().trim().toLowerCase();
                if ($scope.sort_type === type) {
                    $scope.sort_desc = !$scope.sort_desc;
                } else {
                    $scope.sort_type = type;
                    $scope.sort_desc = true;
                }
                $scope.order = $scope.sort_desc ?
                '-' + $scope.sort_type : $scope.sort_type;

                $scope.loadCards();
            };

            $scope.sort_icon = function() {
                var dir = $scope.sort_desc ? 'bottom' : 'top';
                  return 'glyphicon glyphicon-triangle-' + dir
                          + ' pull-right sort-icon';
            };

            $scope.pageChanged = function() {
                $scope.loadCards();
            };
        }
    ]
);