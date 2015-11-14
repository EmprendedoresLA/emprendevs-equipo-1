module.exports = function(app){

	var async = require('async');
	var Step = app.models.Step;
	var count = 0;
	var User = app.models.User;
	var Idea = app.models.Idea;


	setTimeout(createSeedData,200);

 	function createSeedData(){
 		
 		User.findById("564766b7fae35c3519e8549e",{include:'ideas'},function(err,res){
 			console.log(err);
 			console.log(res);
 			res.ideas.create({'name':'una idea'},function(err,res)	{
	 			console.log(res);
	 		});
	 			console.log(err);
 			/*res[0].ideas.create({'name':'una idea'},function(err,res)	{
	 			console.log(res);
	 		})
 			
	*/
 			
 			});	
 			/*
 			res[0].ideas.create({'name':'una idea'},function(err,res)	{
	 			console.log(err);
	 			console.log(res);
	 		})

 		
/*
	 	User.ideas.create({'name':'una idea'},function(err,res)	{
	 		console.log(err);
	 		console.log(res);
	 	})

 */		
		
 	}




/*
	setTimeout(createSeedData, 500);

	function createSeedData(){
	       
	        async.waterfall([
	                function(next){
	                        Step.destroyAll({}, function(err){
	                                next()
	                        });

	                       
	                },
	                function(next){
	                        async.whilst(
	                                function () { return count < 5; },
	                                function (callback) {
	                                        count++;

	                                        // Creamos un step
	                                        Step.create({ textContent: 'RootStep_#'+count },function(err, newStep){

	                                                // Acá creamos un nuevo step (child), relacionado al step anterior
	                                                newStep.childSteps.create({
	                                                        textContent: 'Children_of_#'+count
	                                                }, function(err, newChildrenStep){

	                                                        // Repetimos la creación de un step child, en este caso asociado al anterior

	                                                        newChildrenStep.childSteps.create({
	                                                                textContent: 'Grandchildren_of_#'+count
	                                                        }, function(err, newChildrenChildrenStep){

	                                                                return callback(err);

	                                                        });
	                                                });
	                                        })

	                                }, next )
	                }
	                ], function(err, result){

	                        Step.findOne({
	                                id: '5645ed7099bbd10a0e85f957',
	                                include: 'childSteps'
	                        }, function(err, stepList){

	                                console.log( stepList );
	                        })

	                       

	                });

	};

*/ 
}