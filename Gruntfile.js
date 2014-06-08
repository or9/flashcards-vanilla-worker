"use strict";

module.exports = function(grunt) {

var taskConfig = require("./task/TaskConfig");

	grunt.initConfig(taskConfig);

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jasmine");

	grunt.registerTask("server", ["connect:server:keepalive"]);
	grunt.registerTask("dev", ["watch:dev"]);
	grunt.registerTask("devserver", ["watch:devserver:build"]);
	grunt.registerTask("default", ["clean", "concat", "copy", "uglify", "cssmin", "jasmine:dist"]);

};

