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
        styleguide: {
            options: {
                template: {
                    src: 'var/styleguide/kss',
                    include: ['skin/frontend/adfab/default/css/style.css']
                },
                framework: {
                    name: 'kss'
                }
            },

            dev: {
                options: {
                    // task options 
                },
                files: {
                    'styleguide': 'skin/frontend/adfab/default/less/style.less'
                }
            }
        },
        browser_sync: {
            dev: {
                bsFiles: {
                    src : [
                           'skin/frontend/adfab/default/css/style.css',
                           'app/design/frontend/adfab/default/template/**/*.phtml',
                           'styleguide/*.html',
                          ]
                },
                options: {
                    watchTask: true,
                    proxy: {
                        host: "magento.local",
                    }
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
                tasks: ['less', 'styleguide'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-styleguide');
    grunt.loadNpmTasks('grunt-browser-sync');
    
    grunt.registerTask('default', ['browser_sync', 'watch']);
};