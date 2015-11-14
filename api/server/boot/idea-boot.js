module.exports = function ideaBoot ( app ) {

	var Idea = app.models.Idea;

	Idea.create({
		name: 'mi priemra idea',
		tree: '[{ blabla: [ {uno: 1},{ dos: 2 }] }]'
	})
}