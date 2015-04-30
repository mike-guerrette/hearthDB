(function() {
    'use strict';

    angular.module('hdb').service('CardService',
        function($http) {
            this.getList = function(callback) {
                $http.get('./api/cards')
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