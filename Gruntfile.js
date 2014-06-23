module.exports = function(grunt) {

  var reportDir = 'public/coverage/';

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    apidoc: { // apidoc configuration
      myapp: {
        src: "app/",
        dest: "public/docs/",
        options: {
          excludeFilters: [ "node_modules/" ]
        }
      }
    },

    // configuration for js hint
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'config/**/*.js', 'test/**/*.js'],
      options:{
        ignores: ['public/coverage/**/*.js']
      }
    },

    // execute tests
    mochaTest: {
        test: {
            options: {
                reporter: "spec",
                timeout: 10000
            },
            src: ["test/**/*.js"]
        },
        testNoLog:{
            options: {
              reporter: "nyan",
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
    },

    shell: {
        coverage: {
            command: 'istanbul cover node_modules/mocha/bin/_mocha --dir ./public/coverage/ -- -R spec'
        }
    }




  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-shell');


  grunt.registerTask('default', ['jshint','mochaTest:test','apidoc']);
  grunt.registerTask('coverage', ['shell:coverage']);
  grunt.registerTask('test', ['jshint', 'mochaTest:test']);
  grunt.registerTask('deploy', ['jshint', 'coverage', 'mochaTest:testNoLog', 'apidoc', 'execute']);

  // Travis CI task
  grunt.registerTask('travis', ['jshint', 'mochaTest:testNoLog']);

};
