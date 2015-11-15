angular.module('sidebar').directive('sidebar', function( FcConfigMenu, $state, FcSession, User, StateNavigator, Idea, _ ) {
	return {
		restrict: 'EA',
		replace: true,
		scope: {

		},
		templateUrl: 'app/common/web_component/sidebar/directive/sidebar/sidebar.html',
		link: function(scope, element, attrs, fn) {

			var userId = FcSession.user.id;

			var theUser = User.findById({
				id: userId,
				filter: {
					include: 'ideas'
				}
			}, function( theUser ){
				scope.ideas = theUser.ideas;
			});

			//scope.ideas = theUser.ideas;

			scope.doEditIdeaName = function( event, idea ){

				event.preventDefault();

				scope.ideas.forEach(function(idea){
					idea.editName = false;
				});

				idea.editName = !!!idea.editName;

				


			};

			scope.updateIdeaName = function( idea ){

				idea.editName = false;

				var newIdeaName = idea.name;

				Idea.prototype$updateAttributes({ id: idea.id }, { name : newIdeaName })
				.$promise.then(function() {

					StateNavigator.setPageTitle( newIdeaName  );

				});

				

			};
			
			




			scope.doSelectIdea = function doSelectIdea( idea ){
				$state.go('idea', { ideaId: idea.id });
			};


			scope.doCreateIdea = function doCreateIdea(){

				User.ideas.create(
					{ id: userId },
					{ name: 'Nueva Idea' }, function( theNewIdea ){
						console.log('nueva idea:', theNewIdea );
						scope.ideas.push( theNewIdea );

						$state.go('idea', { ideaId: theNewIdea.id });
						
					});
			};

			scope.doDeleteIdea = function( event, idea ){

				event.preventDefault();



				Idea.deleteById( { id: idea.id } ).$promise.then(function(theIdea){

					_.remove( scope.ideas, function(anIdea){
						return anIdea.id == idea.id; 
					});
					
					$state.go( 'idea' );


				});;


			};

			// var configMenu = FcConfigMenu;

			// scope.state = $state;

			// scope.menuList = configMenu.menuList;

			// scope.menuItmClicked = function( $event, menuItm ){ 

			// 	if( menuItm.dropdown && menuItm.dropdown.length ){

			// 		menuItm.dropdownState = menuItm.dropdownState === undefined ? false : menuItm.dropdownState;

			// 		menuItm.dropdownState = !menuItm.dropdownState;

			// 	};

			// 	if( menuItm.uisref ){

			// 		$state.go( menuItm.uisref );

			// 	};
			// };



		}
	};
});
