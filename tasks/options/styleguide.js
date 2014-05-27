module.exports = {
	options : {
		template : {
			src : 'var/styleguide/kss'
		},
		framework : {
			name : 'kss'
		}
	},
	dev : {
		files : {
			'styleguide' : 'skin/frontend/'+design+'/scss/**.scss'
		}
	}
};