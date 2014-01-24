module.exports = function(grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'skin/frontend/adfab/default/css/style.css.map',
                    // This is mandatory for Chrome to parse the less files
                    sourceMapRootpath: 'http://magento.local' 
                },
                files: {
                    'skin/frontend/adfab/default/css/style.css': 'skin/frontend/adfab/default/less/style.less'
                }
            }
        },
        watch: {
            all: {
                files: [
                        'skin/frontend/adfab/default/less/**/*.less',
                        // Remember to put the REAL path of the directories. Not the virtual links
                        'vendor/webcomm/magento-boilerplate/skin/frontend/boilerplate/default/less/**/*.less',
                        'vendor/webcomm/magento-boilerplate/skin/frontend/boilerplate/default/components/bootstrap/less/**/*.less'
                        ],
                tasks: ['less'],
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};