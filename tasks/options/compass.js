module.exports = {
	dist : {
		options : {
			sassDir : 'skin/frontend/' + design + '/scss',
			cssDir : 'skin/frontend/' + design + '/css',
			environment : 'production'
		}
	},
	dev : {
		options : {
			sassDir : 'skin/frontend/' + design + '/scss',
			cssDir : 'skin/frontend/' + design + '/css',
		}
	}
};