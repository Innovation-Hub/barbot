HomeCtrl.$inject = ['$scope', '$routeParams', '$http'];
function HomeCtrl($scope, $routeParams, $http)
{
	$scope.recipes = [];
	$scope.isBusy = false;
	$scope.info = '';
	$scope.alcohol = 0;
	
	$http.get('/api/recipes').success(function(data, status)
    {
		$scope.recipes = data;
	});

	/*document.getElementById("purgeBtn").onclick = function()
	{
		$http.get('api/purge').success();
	};*/

	$scope.purge = function ()
	{
		$http.get('api/purge').success(function(data, status)
			{
				$scope.alcohol = data;
				$scope.info = 'Smelling ' + data + ' % of alcohol !';
			});
	}

	/*document.getElementById("emergencyBtn").onclick = function()
    {
    	$http.get('api/emergency').success();
    };*/

    $scope.emergency = function ()
	{
		$http.get('api/emergency').success();
	}

    /*document.getElementById("drunkBtn").onclick = function()
    {
    	$http.get('api/drunk').success();
    };*/

	$scope.drunk = function ()
	{
		$http.get('api/drunk').success();
	}

	$scope.order = function (recipe)
    {
        var that = this;

		if ($scope.isBusy)
        {
			$scope.info = 'Barbot is busy';
		}
        else
        {
			$scope.info = 'Order recipe: ' + recipe.name;
			this.isBusy = true;
			$http.post(recipe.endpoint)
				.success(function(data, status)
                {
					that.isBusy = false;
					$scope.info ='your ' + recipe.name + ' is brewing!';
				})
				.error(function (data, status)
                {
					that.isBusy = false;
					$scope.info = 'Error...check barbot';
				});
        }
    };
}

AboutCtrl.$inject = ['$scope', '$routeParams', '$http'];
function AboutCtrl($scope, $routeParams, $http)
{
}