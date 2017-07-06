(function(){
    'use strict';

    angular.module('app.routes').service('$routesEdit', $routesEdit);

    $routesEdit.$inject = ['$http'];

    function $routesEdit($http){
        var self = this;
        self.edit = function(route){
            return $http.put('https://historic-capitol-reef-22374.herokuapp.com/route/',route)
                .then(function(response){
                   return response.data; 
                });
        }

        self.get = function(id){
            return $http.get('https://historic-capitol-reef-22374.herokuapp.com/route/' + id)
                .then(function(response){
                   return response.data; 
                });
        }
    }
})();