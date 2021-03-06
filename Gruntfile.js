module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      client: {
        files: [
          { src: ['public/client/*.js'], dest: 'public/dist/client.js' },
          { src: ['public/lib/jquery.js',
            'public/lib/underscore.js',
            'public/lib/backbone.js',
            'public/lib/handlebars.js'],
            dest: 'public/dist/lib.js' }
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      client: {
        files: [
          { src: ['public/dist/client.js'], dest: 'public/dist/client.min.js' },
          { src: ['public/dist/lib.js'], dest: 'public/dist/lib.min.js' }
        ]
      }
    },

    jshint: {
      all: ['public/client/*.js', '*.js', 'app/*.js', 'app/collections/*.js', 'app/models/*.js', 'lib/*.js'],
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      options: {

      },
      target: {
        files: {
          'public/output.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'test', 'concat', 'jshint', 'uglify', 'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {    // grunt deploy --prod
    if(grunt.option('prod')) {                      // prod --> azure
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);              // else (grunt deploy) --> local database / dev environment
    }
  });

  grunt.registerTask('deploy', [
    'build', 'upload'
  ]);


};
