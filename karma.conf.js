module.exports = function(config) {
	config.set({
		// Base path for [in|ex]cluding files
		basePath: "./",

		frameworks: ["jasmine"],

		// Include files and patterns
		files: [
			"src/main.html",
			"bin/dist/main.html",
			"spec/**/*.helper.js",
			"spec/**/*.spec.js"
		],

		exclude: [

		],

		preprocessors: {
			// Source files for which to gen coverage
			// Don't include tests or libs
			// Files will be instrumented by Istanbul
			"src/**/*.js": ["coverage"],
			"bin/dist/**/*.js":	["coverage"]
		},


		reporters: ["coverage", "dots", "progress"],

		coverageReporter: {
			reporters: [
				{type: "cobertura", dir: "bin/test/reports"},
				{type: "html", dir: "bin/test/reports"},
				{type: "text-summary"}
			]
		},


		// Web server port
		port: 9876,

		// Enable colors in output (reporters, logs)
		colors: true, 

		logLevel: config.LOG_INFO, // [LOG_DEBUG|LOG_INFO|LOG_WARN|LOG_ERROR]

		autoWatch: false,

		browsers: ["PhantomLocal"],

		customLaunchers: {
			"PhantomLocal": {
				base: "PhantomJS",
				options: {
					windowName: "PhantomJS Local",
					settings: {
						webSecurityEnabled: false
					}
				},
				// PhantomJS supported flags can be found here, https://github.com/ariya/phantomjs/wiki/API-Reference
				flags: ["--remote-debugger-port=9996"]
			}
		},

		captureTimeout: 7500,

		singleRun: true,

		reportSlowerThan: 500



	});

};
