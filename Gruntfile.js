design = 'rwd/themefuse';
domain = 'magento.local';

module.exports = function(grunt) {

	var loadConfig = function(path) {
		var glob = require('glob');
		var object = {};
		var key;

		glob.sync('*', {
			cwd : path
		}).forEach(function(option) {
			key = option.replace(/\.js$/, '');
			object[key] = require(path + option);
		});
		return object;
	};

	// Initial config
	var config = {
		pkg : grunt.file.readJSON('package.json')
	};

	// Load tasks from the tasks folder
	grunt.loadTasks('tasks');

	// Load all the tasks options in tasks/options base on the name:
	// watch.js => watch{}
	grunt.util._.extend(config, loadConfig('./tasks/options/'));

	grunt.initConfig(config);

	require('load-grunt-tasks')(grunt);

	// Default Task is basically a rebuild
	grunt.registerTask('default', [ 'compass', 'less', 'imagemin', 'styleguide']);
	grunt.registerTask('dev', [ 'watch' ]);

};