module.exports = function(Idea) {

	var TreeModel = require('tree-model');
	var tree = new TreeModel({childrenPropertyName:'tree'});
	var async = require	('async');
	var _ = require('lodash');
 	

 	//Devuelve una idea con sus steps completos
	Idea.openIdea = function(ideaId,cb){

		Idea.fullFill(ideaId,function(err,stepListId){
			if(err)
				return cb(err,null);
			var ideaSteps = [];
			_.each(stepListId,function(stepId){

			})
		});

		
	}

	//Busca las ideas de un usuario determinado
	//Devuelve un array de ideas, sin el contenido de cada una
	Idea.getUserIdeas = function(userId,cb){
		console.log("performing a request");
		Idea.find({
				where:{
						userId:userId
				},
				filter:{
					
					tree:false

				}
			},function(err,res){
				if(err)
					return cb(new Error("something wrong finding the user ideas"))
				return cb(null,res);				
		});
		
	}

	Idea.createTreeObject = function createTreeObject(ideaId,cb){

		Idea.findById(ideaId,function(err,res){
			res.tree = JSON.parse(res.tree);
			var ideaTreeObject = tree.parse(res);			
			return cb(null,ideaTreeObject);
		});
	}

	
	//AVOID CALLBACK HELL, USE ASYNC
	 Idea.reparentStep = function reparentStep(ideaId,stepId, newParentId,cb){

	 	createTreeObject(ideaId,function(err,ideaTreeObject){
	 		var step = {};
		 	var newParent = {};
		 	
			//find the node in the tree
			findStep(ideaTreeObject,stepId,function(err,res){	
				step = res;
				//drop the node from the tree
				step.drop();


				//find the new parent for the step
				findStep(ideaTreeObject,newParentId,function(err,res){
					
					newParent = findStep(ideaTreeObject,newParentId);
					//add the previous step to this new parent
					newParent.addChild(step);
					Idea.persistData(ideaTreeObject);	
				})
			});

	 	})
	 	
		
	}

	 Idea.findStep = function findStep(ideaObject,stepId,cb){
		var step = ideaObject.first(function(node){
			return node.model.id === stepId;
		});
		return cb(null,step);
	}

	 Idea.findStepAll = function findStepAll(ideaObject,predicate,cb){
		var steps = ideaObject.all(predicate);
		return cb(null,steps);
	}
	
	Idea.getStepPath = function getPath(ideaObject,stepId,cb){
		var step = findStep(ideaObject,setpId);
		var stepPath = step.getPath();
		return cb(null,stepPath);

	}

	Idea.deleteStep = function deleteStep(ideaId,stepId,cb){

		createTreeObject(ideaId,function(err,ideaTreeObject){
			var step = {};
			findStep(ideaTreeObject,stepId,function(err,res){
				//find the node in the tree
				step = res;
				//drop the node from the tree
				step.drop();
				// now, ideaTreeObject should haven't the step dropped before.
				// i must to confirm this with the console in chrome.

				Idea.persistData(ideaTreeObject, function(){
					return cb(null);	
				});
			});
		});
	}


	Idea.persistData = function persistData(ideaObject,cb){
		
		var newTree = JSON.stringify(ideaObject);
		Idea.updateAttributes({tree:newTree},function(err,res){
			if(err)
				return cb(new Error("something wrong updating tree in DB"),null);

			//res is the model instance updated
			return cb(null,res);

		});

	}


	// para cambiar el orden de los nodos dentro de un objeto TreeModel
	// se manda el root, y los objetos a ser cambiados de lugar
	Idea.changeStepOrder = function changeStepOrder(ideaId,stepId,stepChildA,stepChildB,cb){

		createTreeObject(ideaId,function(err,ideaTreeObject){

			findStep(stepId,function(err,stepObject){

				var childrens = stepObject.model.tree;
				var updatedChildrens = swapSteps(childrens,stepChildA,stepChildB);
				var newTree = JSON.stringify(updatedChildrens);

				Idea.persistData(newTree,function(err,res){
					if (err)
						return cb(new Error("something wrong updating tree in DB"),null);
					return (res);
				});
			})
		})


	}

	Idea.fullFill =  function fullFill(ideaId,cb){
		//i have to do a recursive search in the idea childrens.
		createTreeObject(ideaId,function(err,ideaTreeObject){
			var arrayIds = [];
			recursiveSearch(ideaTreeObject.tree,array);
			return cb(null,arrayIds);
		});
	}

	var recursiveSearch = function recursiveSearch(treeObject, listIds) {

	    _.each(tree, function(item) {
	        listIds.push(item._id);
	        
		         if(item.tree) recursiveSearch(item.tree,listIds);
	    });

	    
	}


/*
	function findNode(id, currentNode) {
	    var i,
	        currentChild,
	        result;

	        // Use a for loop instead of forEach to avoid nested functions
	        // Otherwise "return" will not work properly
	        for (i = 0; i < currentNode.children.length; i += 1) {
	            currentChild = currentNode.children[i];

	            // Search in the current child
	            result = findNode(id, currentChild);

	            // Return the result if the node has been found
	            if (result !== false) {
	                return result;
	            }
	        }

	        // The node has not been found and we have no more options
	        return false;
	    }
	}
*/

	

	Idea.getSteps = function getSteps(idsArray,cb){
		//do a bulk find to return an array of InstanceModel objects of Steps
		return cb(null,stepArray)
	}	

	var swapSteps = function swapSteps(array,indexA,indexB){
		var temp = array[indexA];
		array[indexA] = array[indexB];
		array[indexB] = array[temp];
		return array;
	}
	Idea.remoteMethod(
	    'getUserIdeas', 
		    {
		     accepts: [
		     {arg: 'userId', type: 'string', required:true},
		     
		     ],
		     returns: { root: true, type: 'object' },
		     http: {verb: 'get', path: '/get_user_ideas' },
		     description: 'Returns an array of ideas without the content '
		   }
   );
	Idea.remoteMethod(
	    'openIdea', 
		    {
		     accepts: [
		     {arg: 'ideaId', type: 'string', required:true},
		     
		     ],
		     returns: { root: true, type: 'object' },
		     http: {verb: 'get', path: '/open_idea' },
		     description: 'Return the idea with all the steps filled'
		   }
   );
	Idea.remoteMethod(
	    'reparentStep', 
		    {
		     accepts: [
		     {arg: 'ideaId', type: 'string', required:true},
		     {arg: 'stepId', type: 'string', required:true },
		     {arg: 'newParentId', type: 'string', required:true }
		     ],
		     returns: { root: true, type: 'object' },
		     http: {verb: 'post', path: '/reparent_step' },
		     description: ''
		   }
   );
/*
   Idea.remoteMethod(
	    'getStepPath', 
		    {
		     accepts: [
		     {arg: 'ideaObject', type: 'object', required:true},
		     {arg: 'stepId', type: 'string', required:true },
		   
		     ],
		     returns: { root: true, type: 'object' },
		     http: {verb: 'get', path: '/get_step_path' },
		     description: ''
		   }
   ); */
    Idea.remoteMethod(
	    'changeStepOrder', 
		    {
		     accepts: [
		     {arg: 'root', type: 'object', required:true},
		     {arg: 'childA', type: 'object', required:true },
		     {arg: 'childB', type: 'object', required:true }
		     ],
		     returns: { root: true, type: 'object' },
		     http: {verb: 'post', path: '/change_step_order' },
		     description: ''
		   }
   );
   Idea.remoteMethod(
	    'deleteStep', 
		    {
		     accepts: [
		     {arg: 'ideaObject', type: 'object', required:true},
		     {arg: 'stepId', type: 'string', required:true },
		 
		     ],
		     returns: { root: true, type: 'object' },
		     http: {verb: 'post', path: '/delete_step_order' },
		     description: ''
		   }
   );	


};
