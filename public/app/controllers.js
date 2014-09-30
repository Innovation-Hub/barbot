HomeCtrl.$inject = ['$scope', '$routeParams', '$http'];
function HomeCtrl($scope, $routeParams, $http)
{
	$scope.recipes = [];
	$scope.isBusy = false;
	$scope.info = '';
	
	$http.get('/api/recipes').success(function(data, status)
    {
		$scope.recipes = data;
	});
	
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