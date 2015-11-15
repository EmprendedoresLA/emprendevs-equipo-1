angular.module('sidebar').directive('sidebar', function( FcConfigMenu, $state, FcSession, User ) {
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

			console.log( theUser )
			
			



			// scope.ideas = [
			// {name: 'idea1', id: '5647521c5ca36bff2a3765a7'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea1', id: 'idOfidea1'},
			// {name: 'idea2', id: 'idOfidea2'},
			// {name: 'idea2', id: 'idOfidea2'},
			// ];



			scope.doSelectIdea = function doSelectIdea( idea ){
				$state.go('idea', { ideaId: idea.id });
			};


			scope.doCreateIdea = function doCreateIdea(){

				User.ideas.create(
					{ id: userId },
					{ name: 'Nueva Idea' }, function( theNewIdea ){
						console.log('nueva idea:', theNewIdea );
						scope.ideas.push( theNewIdea );
					});
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
