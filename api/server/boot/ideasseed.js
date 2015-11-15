module.exports = function(app){

	

	var async = require('async');
	var Step = app.models.Step;
	var count = 0;
	var User = app.models.User;
	var Idea = app.models.Idea;


	setTimeout(createSeedData,200);

 	function createSeedData(){
 		
 		User.findById("564766b7fae35c3519e8549e",{include:'ideas'},function(err,res){
 				

 			
  			var tree1 ={tree:[
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
  					 

  					 ]};
  					


 	 		var tree1 = JSON.stringify(tree1);
				
 	 			Idea.find({filter:{ name:"Ground Control - Aplicación web"}},function(error,respuesta){

 	 				if(respuesta.length >0){
 	 					
 	 					return;
 	 				}


 					console.log("creando respuesta seed");
		 			res.ideas.create(
		 							{ name:"Ground Control - Aplicación web", tree:tree1
		 																	
		 							},function(err,res)	{
			 			console.log(res);
			 		});
			 		
	 			});
 			});	

		
 	}


}