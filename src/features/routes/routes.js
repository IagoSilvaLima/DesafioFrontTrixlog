(function(){

	angular.module('app.routes',[]);

	angular
		.module('app.routes')
		.config(function($stateProvider) {
			var routeListState = {
		    name: 'routes-list',
		    url: '/',
		    templateUrl: './features/routes/list/routesList.view.html',
		    controller: 'routesListController',
		    controllerAs: 'vm'
		  };

		  var routeCreateState = {
		    name: 'routes-create',
		    url: '/routes/create',
		    templateUrl: './features/routes/create/routesCreate.view.html',
		    controller: 'routesCreateController',
		    controllerAs: 'vm'
		  };

		  var routeEditState = {
		    name: 'routes-edit',
		    url: '/routes/edit/:id',
		    templateUrl: './features/routes/edit/routesEdit.view.html',
		    controller: 'routesEditController',
		    controllerAs: 'vm'
		  };

		  ///
			$stateProvider.state(routeListState);
			$stateProvider.state(routeCreateState);
			$stateProvider.state(routeEditState);
			$stateProvider.state("otherwise", { url : '/' })
		});

		angular.module("app").run(function($rootScope,$state){
   		$state.go("routes-list"); 
		});

})();