module.exports = {
	options : {
		livereload : true,
	},
	scripts : {
		files : [ 'skin/frontend/'+design+'/js/*.js' ],
		tasks : [ 'jshint', 'concat', 'uglify' ],
		options : {
			spawn : false,
		}
	},
	sass : {
		files : [ 'skin/frontend/'+design+'/scss/*.scss', 'skin/frontend/'+design+'/scss/**/*.scss' ],
		tasks : [ 'compass', 'styleguide' ],
		options : {
			spawn : false,
		}
	},
	less : {
		files : [ 'skin/frontend/'+design+'/less/*.less' ],
		tasks : [ 'less', 'styleguide' ],
		options : {
			spawn : false,
		}
	},
	images : {
		files : [ 'skin/frontend/'+design+'/images/**/*.{png,jpg,gif}', 'skin/frontend/'+design+'/images/*.{png,jpg,gif}' ],
		tasks : [ 'imagemin' ],
		options : {
			spawn : false,
		}
	}
};