'use strict';

angular.module('hdb')
    .controller('CardsController', ['$scope', 'CardService',
        function($scope, CardService) {

            $scope.limitOpts = [10, 20, 30];
            $scope.maxPages = 15;

            $scope.fields = {
                name: true,
                type: true,
                faction: false,
                rarity: false,
                cost: false,
                attack: false,
                health: false,
                text: false,
                flavor: false,
                artist: false
            };

            $scope.currentPage = 1;
            $scope.limit = $scope.limitOpts[0];

            $scope.sort_type = 'name';
            $scope.sort_desc = true;

            $scope.order = 'name';

            $scope.loadCards = function() {
                CardService.getList({
                        query: $scope.query,
                        limit: $scope.limit,
                        page: $scope.currentPage,
                        order: $scope.order,
                        fields: Object.keys($scope.fields).filter(function(key) {
                            return $scope.fields[key] === true
                        })
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

            $scope.setLimit = function(option) {
                $scope.limit = option;
                $scope.loadCards();
            };

            $scope.sort_icon = function() {
                var dir = $scope.sort_desc ? 'bottom' : 'top';
                  return 'glyphicon glyphicon-triangle-' + dir
                          + ' pull-right sort-icon';
            };

            $scope.isSelected = function(isSelected) {
                if (isSelected) {
                    return 'active';
                }
            };

            $scope.toggleOption = function(option) {
                $scope.fields[option] = !$scope.fields[option];
                $scope.loadCards();
            };

            $scope.search = function(query) {
                $scope.query = query;
                $scope.loadCards();
            };

            $scope.pageChanged = function() {
                $scope.loadCards();
            };
        }
    ]
);