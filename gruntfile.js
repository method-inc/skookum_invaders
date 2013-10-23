module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg    : grunt.file.readJSON('package.json'),
    clean  : require('./grunt/clean'),
    concat : require('./grunt/concat'),
    uglify : require('./grunt/uglify'),
    connect: require('./grunt/connect'),
    jade   : require('./grunt/jade'),
    stylus : require('./grunt/stylus'),
    watch  : require('./grunt/watch'),
    copy   : require('./grunt/copy')
  });

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('build', [ 'clean:dist',
                                'copy:dist',
                                'copy:scripts',
                                'concat:dist',
                                'jade:dist',
                                'stylus:dist',
                                'uglify']);

  grunt.registerTask('server', ['clean:local',
                                'copy:local',
                                'copy:scripts',
                                'concat:local',
                                'jade:local',
                                'stylus:local',
                                'connect:server',
                                'watch']);
};