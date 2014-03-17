module.exports = function(grunt) {

  grunt.initConfig({
	jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
		force: true,
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    nodeunit: {
		all: ['test/**/*_test.js']
	}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  
  grunt.registerTask('test', ['jshint', 'nodeunit']);

};