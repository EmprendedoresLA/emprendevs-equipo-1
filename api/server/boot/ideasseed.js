module.exports = function(app){

	return;

	var async = require('async');
	var Step = app.models.Step;
	var count = 0;
	var User = app.models.User;
	var Idea = app.models.Idea;


	setTimeout(createSeedData,200);

 	function createSeedData(){
 		
 		User.findById("564766b7fae35c3519e8549e",{include:'ideas'},function(err,res){
 	
 			var objectTreeIdea1 = [{body:'ir a sus oficinas y llevar mate',tree:
	 																												[{body:'tengo que comprar yerba',tree:
	 																																				[{body:'tengo que trabajar para comprar yerba'}]
	 																												}]
	 																	}];
 			var objectTreeIdea2 = [{body:'buscar documentacion',tree:
	 																												[{body:'aprender ingles',tree:
	 																																				[{body:'ir a un instituto de ingles'}]
	 																												}]
	 																	}];
	 		var object1Stringify = JSON.stringify(objectTreeIdea1);
	 		var object2Stringify = JSON.stringify(objectTreeIdea2);


	 			res.ideas.create(
	 							{'name':'robar prototipos a xeros', tree:object1Stringify
	 																	
	 							},function(err,res)	{
		 			console.log(res);
		 		});
	 			res.ideas.create(
	 							{'name':'aprender node', tree:object2Stringify
	 																	
	 							},function(err,res)	{
		 			console.log(res);
		 		});

 			});	

		
 	}


}