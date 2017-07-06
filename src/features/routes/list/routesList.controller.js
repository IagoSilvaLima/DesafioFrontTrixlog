(function(){
    'use strict';

    angular.module('app.routes').controller('routesListController', routesListController);

  	routesListController.$inject = ['$state','$routesList','$leafletMarkerConvert','$leafletMarkerData','SweetAlert'];

    function routesListController($state, $routesList , $leafletMarkerConvert, $leafletMarkerData, SweetAlert){
        var vm = this;		
		vm.delete = _delete;
		vm.ngMarkers = [];
		vm.path = '';
		vm.showMap = _showMap;
		vm.edit = _edit;

		

		vm.ngConfig = {
	    	center : {
	        	lat :  -3.71839,
	            lgt : -38.5434,
	            zoom :12
	        },
			geoLocate : false,
			options :{
				zoomControl : true,
				dragging : true    
			},
			zoomControlPosition : 'bottomright'
        };

		vm.ngConfigMarker = {
        	readOnly : true,
        	limit : 23
		}

		_lista();

			
		function _delete(id){
			SweetAlert.swal({
			title: "Quer mesmo deletar esta rota?",
			text: "Depois de deletada não tem como voltar atrás!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Sim, eu tenho!",
			closeOnConfirm: true}, 
			function(isConfirm){ 
				if(isConfirm){
					$routesList.delete(id)
						.then(function(response){
							console.log(response);
							_lista();
					 	})
				}	
			});

			

			
		}

		function _edit(id){
			$state.go('routes-edit',{id : id})
		}

		function _lista(){
			$leafletMarkerData.clearMarkers();
			$routesList.get()
			.then(function(response){
				vm.routes = response;
				if (vm.routes.length > 0 )  {
					vm.showMap(vm.routes[0]);
				}
				else{
					vm.ngMarkers = [];
					vm.path = "";
				}
			});		
		}	

        function _showMap(route){
			vm.ngMarkers = route.stops.map(function(stop){
				return $leafletMarkerConvert.createMarker(stop.latitude, stop.longitude, false);		
			});

			vm.path = route.path;
        }
    }

})();

