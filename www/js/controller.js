app.controller('mainController', function($http, $scope){
	$scope.clients = [];
	$http({
		method: 'GET',
		url: 'http://dev04.sequenza.com.br:9090/api/Cliente'
	}).then(function(response){
		for (var i in response.data) {
			console.log(response.data[i])
			$scope.clients.push(response.data[i]);
		}
	}).catch(function(response) {
		console.log("error", response);
	})
})