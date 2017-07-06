(function(){
    'use strict';

    angular.module('app.routes').controller('routesEditController', routesEditController);

  	routesEditController.$inject = ['$state','$routesEdit','$leafletMarkerConvert','$leafletMarkerData','SweetAlert'];

    function routesEditController($state,$routesEdit,$leafletMarkerConvert,$leafletMarkerData, SweetAlert){
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

		_getRoute($state.params.id);

		function _getRoute(id){
			$routesEdit.get(id)
				.then(function(response){
					console.log(response);
					vm.route = response;
					vm.ngMarkers = vm.route.stops.map(function(stop){
						return $leafletMarkerConvert.createMarker(stop.latitude, stop.longitude, true);
					});
				});
		}

		function _save(route){
			route.stops = $leafletMarkerData.getMarkers().map(function(marker){
				return	$leafletMarkerConvert.objectFromMarker(marker);
			});
			
			

			if(route.stops.length < 2){
				SweetAlert.swal('Foi encontrado um problema','Selecione no mínimo dois pontos','error');
			}else{
				$leafletMarkerData.clearMarkers();
				$routesEdit.edit(route)
					.then(function(response){
						SweetAlert.swal('Bom Trabalho','Rota editada','success');
						$state.go('routes-list')
				})
			}
		}
    }

})();

