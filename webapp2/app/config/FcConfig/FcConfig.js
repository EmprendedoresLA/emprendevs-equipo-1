angular.module('config').factory('FcConfig',function() {

	var FcConfig = {

		app: {
			mainState: 'main',
			stateToGoOnLogout: 'account.login',
			auth: {
				role: []
			},
			unauthorizedAppRedirect: ''
		}
		
	};

	return FcConfig;
});