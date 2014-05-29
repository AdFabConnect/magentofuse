module.exports = {
	dynamic : {
		files : [ {
			expand : true,
			cwd : 'images/',
			src : [ 'skin/frontend/'+design+'/**/*.{png,jpg,gif}' ],
			dest : 'skin/frontend/'+design+'/images/'
		} ]
	}
};