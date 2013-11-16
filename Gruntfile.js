module.exports = function(grunt) {
    // Do Grunt things here
    
    // Proj config
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: "/* <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                src: "src/<%= pkg.name %>.js",
                dest: "build/<%= pkg.name %>.min.js"
            }
        }
    });
    
    // Load plugin which provides uglify task
    grunt.loadNpmTasks("grunt-contrib-uglify");
    
    // Default tasks
    grunt.registerTask("default", ["uglify"]);
};