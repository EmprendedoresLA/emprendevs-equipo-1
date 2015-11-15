angular.module('FocusMe').directive('focusMe', function( $timeout, $parse ) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.focusMe);
			scope.$watch(model, function(value) {
				
				if(value === true) { 
					$timeout(function() {
						element[0].focus(); 
					});
				} else {
					$timeout(function() {
						element[0].blur(); 
					});
				};
			});

			// element.bind('blur', function() {
			// 	console.log('blur');
			// 	scope.$apply(model.assign(scope, false));
			// });
		}
	};
});