(function() {
    'use strict';

    angular.module('hdb').service('CardService',
        function($http) {
            this.getList = function(query, callback) {
                $http({
                    method: 'GET',
                    url: './api/cards',
                    params: query
                })
                    .error(function(res) {
                        callback(res.error, res.message);
                    })
                    .success(function(res) {
                        callback(null, res.data)
                    });
            }
        }
    );
})();