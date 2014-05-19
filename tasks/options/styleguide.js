module.exports = {
	options : {
		options : {
			template : {
				src : 'var/styleguide/kss',
				include : [ '*/*/css/style.css' ]
			},
			framework : {
				name : 'kss'
			}
		},
		dev : {
			options : {
			},
			files : {
				'styleguide' : 'skin/frontend/'+design+'/less/styles.less'
			}
		}
	}
};