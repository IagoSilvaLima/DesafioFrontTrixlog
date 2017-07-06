(function(){
    'use strict';
	
    angular.module('app.routes').controller('routesCreateController', routesCreateController);

  	routesCreateController.$inject = ['$state','$routesCreate','$leafletMarkerData','$leafletMarkerConvert','SweetAlert'];

    function routesCreateController($state, $routesCreate, $leafletMarkerData,$leafletMarkerConvert, SweetAlert){
        var vm = this;
		vm.ngMarkers = [];
		vm.save = _save;
        vm.ngConfig = {
	        center : {
	            lat :  -3.71839,
	            lgt : -38.5434,
	            zoom :15
	        },
	        geoLocate : false,
	        options :{
	            zoomControl : true,
	            dragging : true    
	        },
	        zoomControlPosition : 'bottomright'
        }

		vm.ngConfigMarker = {
        	readOnly : false,
        	limit : 23
		}

		function _save(route){


			route.stops = $leafletMarkerData.getMarkers().map(function(marker){
				return	$leafletMarkerConvert.objectFromMarker(marker);
			});
			
			
			if(route.stops.length < 2){
				SweetAlert.swal('Foi encontrado um problema','Selecione no mínimo dois pontos','error');
			}else{
				$leafletMarkerData.clearMarkers();
				$routesCreate.create(route.vehicleId, route.name, route.stops)
					.then(function(response){
						SweetAlert.swal('Bom Trabalho','Rota cadastrada','success');
						$state.go('routes-list')
					})
			}

			
		}
		


    }

})();

