var request = require('request');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        browserSync: {
            bsFiles: {
                src : ['./build/*.html','./build/*.css','./build/j.js','./build/partials/*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./build"
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty:true,
                    data: {
                        debug: false
                    }
                },
                files: {
                    "build/index.html": ["assets/index.jade"]
                }
            }
        },
        htmlmin:{
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS:true
                },
                files: {
                    'production/index.html': 'build/index.html'
                }
            }
        },
        concat: {
			js: {
				src: [
                    'assets/js/plugins/*.js',
                    'assets/js/*.js'
                ],
                dest: 'build/j.js',
			}
		},
        uglify: {
			js: {
                options:{
                    preserveComments:'some'
                },
				src: ['build/j.js'],
                dest: 'production/j.js',
			}
		},
        copy:{
            build: {
                files: [
                    {expand: true, flatten: true, src: ['assets/root_assets/*'], dest: 'build/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['assets/partials/*'], dest: 'build/partials/', filter: 'isFile'}
                ]
            },
            production: {
                files: [
                    {expand: true, flatten: true, src: ['assets/root_assets/*'], dest: 'production/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['assets/partials/*'], dest: 'production/partials/', filter: 'isFile'}
                ]
            }
        },
        sass: {
            build: {
                 options: {
                  style: 'compressed'// Can be nested, compact, compressed, expanded.
                },
                files: [
                  {
                      expand: true, // Recursive Output style.
                      cwd: "assets/sass/", // The startup directory
                      src: ["**/*.scss"], // Source files
                      dest: "build/", // Destination
                      ext: ".css" // File extension
                  }
                ]
            },
            production:{
                options:{
                     style: 'compressed',// Can be nested, compact, compressed, expanded.
                     sourcemap: 'none'
                },
                files: [
                  {
                      expand: true, // Recursive Output style.
                      cwd: "assets/sass/", // The startup directory
                      src: ["**/*.scss"], // Source files
                      dest: "production/", // Destination
                      ext: ".css" // File extension
                  }
                ]
            }
        },
        notify: {
            sass:{
                options:{
                    title: "CSS Files built",
                    message: "SASS task complete"
                }
            },
            jade:{
                options:{
                    title: "HTML Files built",
                    message: "JADE task complete"
                }
            },
            uglify:{
                options:{
                    title: "JavaScript Files built",
                    message: "Concatenation and Uglification tasks complete"
                }
            }
        },
		watch: {
            html: {
                files: [' assets/*.jade'],
                tasks: ['jade','htmlmin','notify:jade']
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat','uglify','notify:uglify']
            },
			css: {
				files: 'assets/sass/**/*.{scss,sass}',
				tasks: ['sass','notify:sass']
			},
            assets:{
                files: ['assets/partials/*','assets/root_assets/*'],
                tasks: ['copy']
            }
		}
	});
    grunt.registerTask('default',['concat','uglify','sass','copy','jade','browserSync', 'watch', 'notify']);
};
