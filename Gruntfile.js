module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			distDebug: {
				src: ['src/jsfxr.js','src/*.js'],
				dest: 'bin-debug/game.js'
			},
			distRelease: {
				src: ['src/requestAnimation.js','src/jsfxr.js','src/game-audio.js','src/game.js'],
				dest: 'bin-release/game.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'bin-release/game.js': 'bin-release/game.js'
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/game.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		copy: {
			'dist-debug': {
				expand:true,
				cwd    : 'src/',
				src: ['*.html'],
				dest: 'bin-debug/'
			},
			'dist-release': {
				expand:true,
				cwd    : 'src/',
				src: ['*.html'],
				dest: 'bin-release/'
			}
		},
		watch: {
			files: ['Gruntfile.js','src/**/*'],
			tasks: ['jshint', 'concat', 'uglify','copy']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['jshint', 'concat', 'uglify','copy']);

};