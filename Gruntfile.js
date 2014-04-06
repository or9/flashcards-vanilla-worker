"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
							 '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
							 '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
							 '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
							 ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n',
		// Task configuration.

		path: {
					src: "src/**/*",
					dest: "bin/dist",
					spec: "spec/**/*"
		},

		connect: {
							 server: {
												 options: {
																		hostname: "localhost",
																		port: "9876",
																		base: "."
																	}
											 }
						 },

						 
		clean: {
						 files: ['bin']
					 },


		copy: {
						options: {
											 mode: true,
											 stripBanners: true
										 },
						main: {
										files: [{
														 expand: true,
														 cwd: "src",
														 dest: "<%= path.dest %>/",
														 src: ["**", "!**/*~", "!**/*.swp", "!**/test*", "!**/example*"]
													 }]
									}

					},

		concat: {
							options: {
												 banner: '<%= banner %>',
												 stripBanners: true
											 },
							// use files [{}] to move all files dynamically, rather than individually
							all: {
										 files: [{
															expand: true,
															cwd: "src",
															src: "**/*",
															dest: "<%= path.dest %>"
														}]
									 },
							main: {
											src: ["<%= path.src %>/*.js"],
											dest: "<%= path.dest %>/main.js"
										},
							model: {
											 src: ["<%= path.src %>/model/**/*.js"],
											 dest: "<%= path.dest %>/model.js"
										 },
							view: {
											src: ["<%= path.src %>/view/**/*.js"],
											dest: "<%= path.dest %>/view.js"
										},
							controller: {
														src: ["<%= path.src %>/controller/**/*.js"],
														dest: "<%= path.dest %>/controller.js"
													}

						},

		uglify: {
							options: {
												 //banner: '<%= banner %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
												 mangle:	{
																		//except: ["jquery"]
																		except: [""]
																	},
												 compress: {
																		 global_defs: {
																										"DEBUG": false
																									}
																	 },
												 beautify: {
																		 beautify: false,
																		 max_line_len: 320
																	 },
												 sourceMap: true,
												 preserveComments: "some"
											 },



							dist: {
											options: {
																 drop_console: true
															 },
											files: [{
															 expand: true,
															 cwd: "<%= path.dest %>",
															 src: ["**/*.js"],
															 dest: "<%= path.dest %>"
														 }]
										}
							/*workers: {
												 options: {
																		drop_console: true
																	},
												 files: [{
																	expand: true,
																	cwd: "<%= path.src %>",
																	src: "",
																	dest: "<%= path.dest %>/dist"
																}]
											 }*/
																
						},
		

		cssmin: {
							dist: {
											files: [{
															 expand: true,
															 cwd: "<%= path.dest %>",
															 src: ["**/*.css", "!**/*~"],
															 dest: "<%= path.dest %>"
														 }]
										}

						},

		jshint: {
							options: {
												 jshintrc: ".jshintrc"
											 },

							gruntfile: {
													 src: "Gruntfile.js"
												 },

							src: {
										 options: {
																jshintrc: 'src/.jshintrc'
															},
										 src: ['src/**/*.js']
										},

							test:	{
											options:	{
																	jshintrc: "spec/.jshintrc"
																},
											src: "*.js"
										},

							dist:	{
											src: "bin/dist/**/*"
										}
						},

		// run grunt karma:dev:start watch
		watch: {
						 gruntfile: {
													files: '<%= jshint.gruntfile.src %>',
													tasks: ['jshint:gruntfile']
												},

						 src: {
										files: '<%= jshint.src.src %>',
										tasks: ['jshint:src', 'jasmine:src']
									},

						 dist: {
										 files: "<%= jshint.dist.src %>",
										 tasks: ["jshint:dist", "jasmine:dist"]
									 },

						 test: {
										 files: '<%= jshint.test.src %>',
										 tasks: ['jshint:test', "jasmine:source:build"]
									 },
						 karma: {
											files: ["<%= path.src %>", "<%= path.spec %>"],
											tasks: ["karma:dev:run"]
										}
					 },

		karma: {
						 options: {
												configFile: "karma.conf.js"
												//runnerPort: "9876",
												//browsers: ["PhantomLocal"],
												//logLevel: "DEBUG" // [OFF|ERROR|WARN|INFO|DEBUG]
											},
						 build:	{
										singleRun: true,
										//browsers: ["PhantomLocal"] // has issues…
										//browsers: ["Chrome", "PhantomJS"]
										browsers: ["PhantomJS"]
									},
						 dev: {
										background: true
									}
					 }



	});


	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");


	//	grunt.registerTask("default", ["jshint", "jasmine", "clean", "concat", "uglify", "jasmine:dist"]);
	//	temporarily rm jshint. it doesn't know anything anyway
	//		grunt.registerTask("default", ["jasmine:source", "clean", "concat", "uglify", "jasmine:dist"]);
	//		grunt.registerTask("default", ["clean", "concat", "uglify", "jasmine:dist"]);
	//
	//		No need to concat
	//
	// run grunt karma:dev:start watch
	//grunt.registerTask("default", ["connect", "clean", "uglify", "karma:dev"]);
	grunt.registerTask("default", ["clean", "copy", "uglify", "cssmin", "karma:build"]);

};
