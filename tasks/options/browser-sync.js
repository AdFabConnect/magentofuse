module.exports = {
	dev : {
		bsFiles : {
			src : [ 'skin/frontend/'+design+'/css/styles.css',
					'app/design/frontend/'+design+'/template/**/*.phtml',
					'var/styleguide/*.html' ]
		},
		options : {
			watchTask : true,
			proxy : {
				host : domain
			}
		}
	}
};