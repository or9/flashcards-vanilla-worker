"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
							 '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
							 '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
							 '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
							 ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
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
																		//port: "8000",
																		port: "?",
																		base: "."
																	}
											 }
						 },

						 
		clean: {
						 files: ['bin']
					 },


		copy: {
						options: {
											 mode: true
										 },
						main: {
										files: [{
														 expand: true,
														 cwd: "src",
														 dest: "<%= path.dest %>/",
														 src: ["**", "!*~", "!.swp", "!test*", "!example*"]
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
												 banner: '<%= banner %> %= grunt.template.today("yyyy-mm-dd") %> */\n',
												 mangle: 	{
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
															 cwd: "<%= path.src %>",
															 src: "**/*.js",
															 dest: "<%= path.dest %>/dist"
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

																		test: {
																		options: {
																		jshintrc: "spec/.jshintrc"
																		},
																		src: "*.js"
																		},

																		dist: {
																		src: "bin/dist/**/*"
									 }
						},

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

		jasmine: {
							 options: {
													specs: "spec/**/*.spec.js",
													vendor: "lib/**/*",
													helpers: "spec/**/*.helper.js",
													host: "<%= connect.server.hostname %>:<%= connect.server.port %>",
													template: require("grunt-template-jasmine-istanbul"),
													templateOptions: {
														coverage: "bin/coverage",
														report: {
															type: "html",
															options: {
																dir: "<%= jasmine.options.templateOptions.coverage %>/"
															}
														}
													}
												},

							 source: {
												 src:	[	"src/main.js",
												 "src/controller/**/*.js",
												 "src/model/**/*.js"
													 ]
											 },

							 dist: {
											 src:	[	"<%= path.dest %>/main.js",
											 "<%= path.dest %>/controller/**/*.js",
											 "<%= path.dest %>/model/**/*.js"
												 ]
										 },

							 ci: {
										 options: {
																templateOptions: {
																									 report: {
																														 type: "cobertura",
																														 options: {
																															 dir: "<%= jasmine.options.templateOptions.coverage %>/"
																														 }
																													 }
																								 }
															},

										 src: ["<%= jasmine.source.src %>", "<%= jasmine.dist.src %>"]
									 }
						 },

		karma: {
						 options: {
												configFile: "karma.conf.js"
												//runnerPort: "9876",
												//browsers: ["PhantomLocal"],
												//logLevel: "DEBUG" // [OFF|ERROR|WARN|INFO|DEBUG]
											},
						 ci:	{
										singleRun: true,
										browsers: ["PhantomLocal"]
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
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-contrib-jasmine");


	//	grunt.registerTask("default", ["jshint", "jasmine", "clean", "concat", "uglify", "jasmine:dist"]);
	//	temporarily rm jshint. it doesn't know anything anyway
	//		grunt.registerTask("default", ["jasmine:source", "clean", "concat", "uglify", "jasmine:dist"]);
	//		grunt.registerTask("default", ["clean", "concat", "uglify", "jasmine:dist"]);
	//
	//		No need to concat

	//grunt.registerTask("default", ["connect", "clean", "uglify", "karma:dev"]);
	grunt.registerTask("default", ["clean", "copy", "uglify", "karma:dev"]);

};
