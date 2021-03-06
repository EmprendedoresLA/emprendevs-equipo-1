angular.module('idea').controller('ideaCtrl',function($scope, FcSession, theIdea, $timeout, StateNavigator, Idea, _ ){


	// DATA

	theIdea.$promise.then(function(theIdea){
		StateNavigator.setPageTitle( theIdea.name  );

		$scope.ideas = [{
			//name: theIdea.name,
			tree: JSON.parse(theIdea.tree || '[]')
		}];


	});


	// Reset newStep

	resetNewStep();



	//$scope.idea = theIdea;


	$scope.remove = function (step) {
		step.remove();
	};

	$scope.toggle = function (step) {
		step.toggle();
	};

	$scope.moveLastToTheBeginning = function () {
		var a = $scope.data.pop();
		$scope.data.splice(0, 0, a);
	};

	$scope.newSubItem = function (step) {
		console.log(step);
		var currentStep = step.$modelValue;
		currentStep.tree.push({
			content:"",
			tree: []
		});
	};

	$scope.collapseAll = function () {
		$scope.$broadcast('collapseAll');
	};

	$scope.expandAll = function () {
		$scope.$broadcast('expandAll');
	};




	function resetNewStep( editingTarget, content, cb ){
		$scope.newIdea = {
			getTarget: false,
			editingTarget: editingTarget || false,
			content: content || ''
		};

		if(_.isFunction(cb)){
			cb();
		}
	};




	$scope.addStep = function( newstepform ){

		var stepContent = $scope.newIdea.content;

		if( $scope.newIdea.editingTarget ){

			$scope.newIdea.editingTarget.content = stepContent;

			$scope.saveIdea();

		} else {

			

			$scope.ideas[0] = $scope.ideas[0] || [{
				name: theIdea.name,
				tree: JSON.parse(theIdea.tree || '[]')
			}];

			$scope.ideas[0].tree.push({
				content: stepContent,
				tree: []
			});

			$scope.saveIdea();
		};

		resetNewStep();

	};


	$scope.saveIdea = function(){


		var ideaTreeStringified = JSON.stringify( $scope.ideas[0].tree );

		Idea.prototype$updateAttributes({ id: theIdea.id }, { tree : ideaTreeStringified })
		.$promise.then(function() {

			console.log('Saved idea, succes!')

		});
	};


	$scope.doEditStepcontent = function( event, step ){


		resetNewStep( step, step.content, function(){
			$scope.newIdea.getTarget = true;
		} );



	};









});



/*


	$scope.ideas = [
	{name:"Ground Control - Aplicación web",
	tree:[
	{content:"Inscribirse en emprendevs",tree:[]},
	{content:"Pensar el producto a desarrollar",tree:[
	{content:"Pensar el producto a desarrollar",tree:[
	{content:"Armar un modelito bien básico de negocio",tree:[
	{content:"Segmento de clientes",tree:[]},
	{content:"Propuesta de valor",tree:[]}]}]}
	]},
	{content:"Preparar el terreno",tree:[
	{content:"definir un mvp",tree:[]},
	{content:"calcular tiempos de desarrollo reales",tree:[]},
	{content:"preparar espacios de trabajo",tree:[
	{content:"Trello",tree:[]},
	{content:"Invision",tree:[]},
	{content:"Git",tree:[]},
	{content:"Drive",tree:[]}
	]}
	]},
	{content:"Desarrollar Ground Control",tree:[
	{content:"Armar algunos wireframes",tree:[]},
	{content:"Hackear",tree:[]}
	]
},
{content:"Presentar la idea a modo de ejemplo de uso del producto",tree:[]}


]
}
];

*/