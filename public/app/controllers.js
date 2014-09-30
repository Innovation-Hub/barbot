HomeCtrl.$inject = ['$scope', '$routeParams', '$http'];
function HomeCtrl($scope, $routeParams, $http)
{
	$scope.recipes = [];
	$scope.isBusy = false;
	$scope.info = '';
	$scope.alcohol = '...';
	
	$http.get('/api/recipes').success(function(data, status)
    {
		$scope.recipes = data;
	});

	$scope.purge = function ()
	{
		$http.post('api/purge').success();
	};

    $scope.emergency = function ()
	{
		$http.post('api/emergency').success();
	};

	$scope.drunk = function ()
	{
		$http.get('api/drunk').success(function(data, status)
			{
				console.log(data.drunk);
				if (data.drunk < 800)
				{
					$scope.alcohol = "Nah, you're clean.";
				}
				else if(data.drunk >= 800 && data.drunk <= 1500)
				{
                    // Green + Blue
					$scope.alcohol = "Just a little...";
				}
				else if (data.drunk > 1500 && data.drunk <= 3000)
				{
                    // Green + Red
					$scope.alcohol = "Drunk ;)";
				}
				else if (data.drunk > 3000)
				{
                    // Red
					$scope.alcohol = "Almost dead !";
				}
			});
	};

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