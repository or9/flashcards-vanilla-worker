"use strict";

module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + 
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + 
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + 
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>*/ \n',

		// Task configuration.

		path: {
			src: 	"src",
			spec: 	"spec",
			specTemplates: "spec/templates",
			dest: 	"bin/dist",
			test: 	"bin/test"
		},

		connect: {
			server: {
				options: {
					hostname: 	"localhost",
					keepalive: 	false,
					livereload: true,
					port: 			"9876",
					base: 			["./"]
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
					
					cwd: 	"src",
					
					dest: "<%= path.dest %>/",
					
					src: 	["**",
								"!main.*.js",
								"!**/*~", 
								"!**/*.swp", 
								"!**/test*", 
								"!**/example*"]
				}]
			}

		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			
			// used for watch dev task
			dev: {
				src: 	["<%= path.src %>/main.init.js",
							"<%= path.src %>/main.abstract.workerHandler.js",
							"<%= path.src %>/main.main.workerHandler.js",
							"<%= path.src %>/main.card.workerHandler.js",
							"<%= path.src %>/main.game.workerHandler.js",
							"<%= path.src %>/main.workerHandler.helper.js",
							"<%= path.src %>/main.utility.js"],
						
				dest: "<%= path.src %>/main.js"
				
			}

		},

		uglify: {
			options: {
				//banner: '<%= banner %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: {
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
					cwd: 	"<%= path.dest %>",
					src: 	["**/*.js"],
					dest: "<%= path.dest %>"
				}]
			}

		},


		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 	"<%= path.dest %>",
					src: 	["**/*.css", "!**/*~"],
					dest: "<%= path.dest %>"
				}]
			}

		},

		jshint: {
			options: {
				jshintrc: ".jshintrc",
				force: true
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

			dist: {
				src: "bin/dist/**/*"
			},

			dev: {
				options: {
					jshintrc: ".jshintrc"
				},
				src: 	["*.js", 
				     	 "<%= path.src %>/**/*.js", 
				     	 "!<%= path.src %>/main.*.js"]
			}
		},

		// run grunt karma:dev:start watch
		watch: {
			options: {
				//livereload: true
			},
			
			gruntfile: {
				files: 	"<%= jshint.gruntfile.src %>",
				tasks: 	["jshint:gruntfile"]
			},

			dist: {
				files: 	"<%= jshint.dist.src %>",
				
				tasks: 	["jshint:dist", 
				       	 "jasmine:dist"]
			},

			// run watch:dev:build
			dev: {
				files: 		["<%= path.src %>/**/*.js",
				       		 "!<%= path.src %>/main.js",
				       		 "<%= path.spec %>/**/*", 
				       		 "*.js"],
						
				tasks: 		["concat:dev",
				       		 "jasmine:dev"]
			},
			
			devserver: {
				livereload: true,
				
				files:		"<%= watch.dev.files %>",
				
				tasks:		"<%= watch.dev.tasks %>"
			}
		},
		
		jasmine: {
			options: {
				"--web-security": false,
				"--local-to-remote-url-access": true,
				
				specs: 		["spec/**/*.spec.js"],
				
				helpers: 	["spec/*.helper.js"],
				
				//vendor: 	["lib/**/*.js"], // only load if/when available
				
				summary: 	true,
				
				display: 	"full",
				
				template: require("grunt-template-jasmine-istanbul"),
				
				templateOptions: {
					coverage: "bin/test/coverage/json",
					report:	[{
						type: 'text',
						options: {
							dir: 'bin/test/coverage/text'
						}
					},
					{
						type: 'html',
						options: {
							dir: 'bin/test/coverage/html'
						}
					},
					{
						type: 'cobertura',
						options: {
							dir: 'bin/test/coverage/cober'
						}
					}],
					files: ["bin/dist/**/*.js"]
				}
			},
			
			dist: {
				options: {
					outfile: "<%= path.dest %>/_SpecRunner.html"
				},
				
				files: [{
					expand: true,
					
					cwd: 	"<%= path.dist %>",
					
					src: 	["main.js"]
				}]
			},
			
			dev: {
				options: {
					template: "<%= path.specTemplates %>/dom.tmpl"
				},
				
				files: [{
					expand: true,
					
					cwd: 	"<%= path.src %>",
					
					src: 	["main.js"]
				}]
			},
			
			devserver: {
				options: {
					template: 	"<%= path.specTemplates %>/dom.tmpl",
					
					styles: 	["<%= path.specTemplates %>/*.css"],
					
					outfile: 	"<%= path.src %>/_SpecRunner.html",
					
					host: 		"<%= connect.server.options.hostname %>:<%= connect.server.options.port %>"
				}
				
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
	grunt.loadNpmTasks("grunt-contrib-jasmine");


	// run grunt karma:dev:start watch
	//grunt.registerTask("default", ["clean", "copy", "uglify", "cssmin", "karma:build"]);
	grunt.registerTask("server", ["connect:server:livereload:keepalive"]);
	grunt.registerTask("dev", ["watch:dev:build"]);
	grunt.registerTask("devserver", ["watch:dev:build"]);
	grunt.registerTask("default", ["clean", "concat", "copy", "uglify", "cssmin", "jasmine:dist"]);

};
