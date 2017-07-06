(function(){
    'use strict';

    angular.module('app.routes').service('$routesList', $routesList);

    $routesList.$inject = ['$http'];

    function $routesList($http){
        var self = this;
        
        self.get = function(){
            return $http.get('https://historic-capitol-reef-22374.herokuapp.com/route')
                .then(function(response){
                   return response.data; 
                });
        }

        self.delete = function(id){
            return $http.delete('https://historic-capitol-reef-22374.herokuapp.com/route/' + id)
                .then(function(response){
                   return response; 
                });
        }
 }
 
})();