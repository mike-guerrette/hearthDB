'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			bower_install: {
				command: 'bower install'
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
					data: grunt.file.readJSON('./client/assets.json')
				},
				files: {
					"./client/ionic/www/index.html": [
						"./server/views/index.ionic.jade"
					]
				}
			}
		},
		clean: ['client/ionic/www', '!client/ionic/www/config.js'],
		copy: {
			main: {
				expand: true,
				cwd: './client',
				src: [
					'lib/**',
					'views/**',
					'*.js'
				],
				dest: './client/ionic/www/'
			}
		},
		less: {
			dist: {
				files: {
					'./client/application.css': [
						'./client/less/**/*.less'
					]
				}
			}
		},
		watch: {
			less: {
				files: ['./client/less/**/*.less'],
				tasks: ['less']
			}
		},
		nodemon: {
			script: './server.js'
		}
	});

	grunt.registerTask('default', ['nodemon']);
	grunt.registerTask('build', ['shell:bower_install', 'clean', 'jade', 'copy']);
	grunt.registerTask('ionic', ['build']);
};