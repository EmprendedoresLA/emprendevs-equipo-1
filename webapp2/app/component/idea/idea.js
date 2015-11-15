angular.module('idea', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.tree' ]);

angular.module('idea').config(function($stateProvider) {


	var modulePath = 'app/component/idea/';

	$stateProvider.state('idea', {
		url: 'idea/:ideaId',
		parent: 'main',
		views: {
			'body': {
				templateUrl: modulePath + 'partial/idea/idea.html',
				controller: 'ideaCtrl'
			}
		},
		goOptions: {
			reload: true
		},
		data: {
			title: '',
			modulePath: modulePath
		},
		resolve: {
			theIdea: function ( Idea, $stateParams ){

				return Idea.findById({ id: $stateParams.ideaId  }, function( theIdea ){
					
				})
			}
		}
	});


    /* Add New States Above */

});

