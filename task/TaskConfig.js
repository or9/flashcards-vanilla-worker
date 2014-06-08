"use strict";

//var grunt 	= null;
//var pkg 		= null;
//var banner	= null;

var grunt = require("grunt");
var pkg = grunt.file.readJSON("package.json");
var banner = getBanner();
var path 		= {
	src: 		"src",
	spec:		"spec",
	specTemplates:	"spec/templates",
	dest:		"bin/dist",
	test:		"bin/test"
};

var taskConfig = new TaskConfig();

module.exports = taskConfig;

function TaskConfig(_grunt) {
	//init(grunt);
	//grunt = _grunt;
	//pkg = _grunt.file.readJSON("package.json");
	//banner = "";

	this.connect = connect();
	this.clean = clean();
	this.copy = copy();
	this.concat = concat();
	this.uglify = uglify();
	this.cssmin = cssmin();
	this.jshint = jshint();
	this.watch = watch();
	this.jasmine = jasmine();

}

function init(_grunt) {
	grunt = _grunt;
	pkg = _grunt.file.readJSON("package.json");
	banner = "";
}

function getBanner() {
	//return "/*! " + pkg.title || pkg.name + "- v" + pkg.version + " - " + grunt.template.today("yyyy-mm-dd") + "\n" + pkg.homepage + "\n * Copyright (c)" + grunt.template.today("yyyy") + pkg.author.name + " Licensed " + _.pluck(pkg.licenses, "type").join(", ") + "\n";
	return "";
}

function connect(grunt) {
	return {
		server: {
			options: {
				hostname:		"localhost",
				keepalive:	false,
				livereload:	true,
				port:				"9876",
				base:				["./"]
			}
		}

	};
}

function clean() {
	return {
		files: ["bin"]
	};
}

function copy() {
	return {
		options: {
			mode:	true,
			stripBanners:	true
		},
		main:	{
			files:	[{
				expand:	true,
				cwd:		"src",
				dest:		path.dest + "/",
				src:		["**",
								"!main.*.js",
								"!**/*~",
								"!**/*.swp",
								"!**/test*",
								"!**/example*"]
			}]
		}

	};
}

function concat() {
	return {
		options: {
			banner: banner,
			stripBanners:	true
		},

		// used for watch dev task
		dev: {
			src:	[path.src + "/main.init.js",
						path.src + "/main.abstract.workerHandler.js",
						path.src + "/main.main.workerHandler.js",
						path.src + "/main.card.workerHandler.js",
						path.src + "/main.game.workerHandler.js",
						path.src + "/main.workerHandler.helper.js",
						path.src + "/main.utility.js"],

			dest:	path.src + "/main.js"
		}
	};
}

function uglify() {
	return {
		options: {
			// banner: banner + grunt.template.today("yyyy-mm-dd") + "*/\n",
			mangle: {
				//except: ["jquery"]
				except:	[""]
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
				cwd:		path.dest,
				src:		["**/*.js"],
				dest:		path.dest
			}]
		}
	};
}

function cssmin() {
	return {
		dist: {
			files: [{
				expand:	true,
				cwd:		path.dest,
				src:		["**/*.css", "!**/*~"],
				dest:		path.dest
			}]
		}

	};
}

function jshint() {
	return {
		options: {
			jshintrc:	".jshintrc",
			force:		true
		},

		gruntfile:	{
			src:	"Gruntfile.js"
		},

		src: {
			options: {
				jshintrc:	"src/.jshintrc"
			},
			src:	["src/**/*.js"]
		},

		dist: {
			src: "bin/dist/**/*"
		},

		dev: {
			options: {
				jshintrc:	".jshintrc"
			},
			src:	["*.js",
						path.src + "/**/*.js",
						"!" + path.src + "/main.*.js"]
		}
	};
}

function watch() {
	return {
		options:		options(),
		gruntfile:	gruntfile(),
		dist:				dist(),
		dev:				dev(),
		devserver:	devserver()
	};

	function options() {
		return {
			// livereload:	true	
		};
	}

	function gruntfile() {
		return {
			files:	jshint().gruntfile.src,
			tasks:	["jshint:gruntfile"]
		};
	}

	function dist() {
		return {
			files:	jshint().dist.src,
			tasks:	["jshint:dist",
							"jasmine:dist"]
		};

	}

	function dev() {
		return {
			files:	[path.src + "/**/*.js",
							"!" + path.src + "/main.js",
							path.spec + "/**/*",
							"*.js"],

			tasks:	["concat:dev",
							"jasmine:dev"]
		};

	}

	function devserver() {
		return {
			livereload:	true,
			files:			dev().files,
			tasks:			dev().tasks + ":build"
		};
	}
}

function jasmine() {
	return {
		options: options(),
		dist: {
			options: {
				outfile: path.dest + "/_SpecRunner.html"
			},

			files: [{
				expand: true,
				//cwd: 	path.dist,
				cwd:	path.dest,
				src: 	["main.js"]
			}]
		},

		dev: { 
			options: {
				template: path.specTemplates + "/dom.tmpl"
			},

			files: [{
				expand: true,
				cwd: 	path.src,
				src: 	["main.js"]
			}]
		},

		devserver: {
			options: {
				template: path.specTemplates + "/dom.tmpl",
				styles: 	[path.specTemplates + "/*.css"],
				outfile: 	path.src + "/_SpecRunner.html",
				host: 		connect().server.options.hostname + ":" + connect().server.options.port,
				build:		true
			}

		}

	};

	function options() {
		return {
			"--web-security": false,
				"--local-to-remote-url-access": true,

				specs: 		["spec/**/*.spec.js"],

				helpers: 	["spec/*.helper.js"],

				vendor: 	["lib/**/*.js"], // only load if/when available

				summary: 	true,

				display: 	"full",

				template: require("grunt-template-jasmine-istanbul"),

				templateOptions: templateOptions()
		};

		function templateOptions() {
			return {
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
			};
		}
	}
}
