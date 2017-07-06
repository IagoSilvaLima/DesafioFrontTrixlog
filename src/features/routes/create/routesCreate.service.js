(function(){
    'use strict';

    angular.module('app.routes').service('$routesCreate', $routesCreate);

    $routesCreate.$inject = ['$http'];

    function $routesCreate($http){
        var self = this;

        self.create = function(vehicleId, name,stops){
            return $http.post('https://historic-capitol-reef-22374.herokuapp.com/route/createRoute/'
                     + vehicleId + '/' + name ,stops)
                .then(function(response){
                   return response.data; 
                });
        }
    }

})();