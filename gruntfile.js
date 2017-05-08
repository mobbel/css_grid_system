module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    tags: {
	    build: {
	      options: {
			    linkTemplate: '<link rel="stylesheet" type="text/css" href="{{ path }}" media="screen"/>',
	        openTag: '<!-- start css template tags -->',
	        closeTag: '<!-- end css template tags -->'
	      },
	      src: [
	        'styles/**/*.css'
	      ],
	      dest: 'index.html'
	    }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['**/*.scss'],
          dest: 'styles',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 5 versions',
              'ie 9'
            ]
          })
        ]
      },
      dist: {
        src: 'styles/*.css'
      }
    },
    watch: {
      src: {
        files: ['**/*.scss'],
        tasks: ['sass', 'postcss']
      }
    }
  });

  grunt.registerTask('default', [
    'sass',
    'postcss',
    'tags',
    'watch'
  ]);

  grunt.registerTask('noWatch', [
    'sass',
    'postcss',
    'tags'
  ]);

  grunt.registerTask('onlyWatch', [
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'sass',
    'postcss',
    'tags'
  ]);

};
