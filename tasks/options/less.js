module.exports = {
	options : {
		sourceMap : true,
		sourceMapFilename : 'skin/frontend/'+design+'/css/style.css.map',
		sourceMapRootpath : 'http://'+domain
	},
	files : {
		'skin/frontend/rwd/default/css/styles.css' : 'skin/frontend/'+design+'/less/styles.less',
		'skin/frontend/rwd/default/css/styles-ie8.css' : 'skin/frontend/'+design+'/less/styles-ie8.less'
	}
};