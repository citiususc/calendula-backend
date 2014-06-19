module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    apidoc: { // apidoc configuration
      myapp: {
        src: "app/",
        dest: "docs/",
        options: {
          excludeFilters: [ "node_modules/" ]
        }
      }
    },

    // configuration for js hint
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'config/**/*.js', 'test/**/*.js']
    },

    // execute tests
    mochaTest: {
        test: {
            options: {
                reporter: "spec",
                timeout: 10000
            },
            src: ["test/**/*.js"]
        }
    },

    // configure app start
    execute: {
        target: {
            src: ['server.js']
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('test', ['jshint', 'mochaTest']);

  grunt.registerTask('default', ['apidoc','jshint']);
  grunt.registerTask('deploy', ['jshint','execute']);


};
