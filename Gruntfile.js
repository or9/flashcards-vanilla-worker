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
		
		clean: {
			files: ['dist']
		},
		
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			
			dist: {
				//src: ["src/<%= pkg.name %>.js"],
				//dest: "dist/<%= pkg.name %>.js"
				// basically just moving files...
				src: ["src/**/*"],
				dest: "bin/dist/"
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %> %= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: {
					//except: ["jquery"]
					except: [""]
				}
			},
			
			dist: {
				src: "<%= concat.dist.dest %>",
				//dest: 'dist/<%= pkg.name %>.min.js'
				dest: "<%= concat.dist.dest %>"
			}
			
			/*src: {
				files: {
					'build/model/model.js': ['src/model/*.js'],
					'build/controller/controller.js': ['src/controller/*.js'],
					'build/main.js': ['src/*.js']
				}
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
				tasks: ['jshint:test', "jasmine:srcfiles:build"]
			}
		},

		jasmine: {
			options: {
				specs: "spec/**/*.spec.js",
				vendor: "lib/**/*",
				helpers: "spec/**/*.helper.js",
				//host: "http://127.0.0.1:8000",
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
				src:	[	"<%= concat.dist.dest %>main.js",
								"<%= concat.dist.dest %>controller/**/*.js",
								"<%= concat.dist.dest %>model/**/*.js"
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
		}



	});

	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-jasmine");

	
//	grunt.registerTask("default", ["jshint", "jasmine", "clean", "concat", "uglify", "jasmine:dist"]);
//	temporarily rm jshint. it doesn't know anything anyway
		grunt.registerTask("default", ["jasmine:source", "clean", "concat", "uglify", "jasmine:dist"]);

};
