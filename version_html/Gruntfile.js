var crypto = require('crypto');
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        //Get some details from the package.json
        game: grunt.file.readJSON('package.json'),
        //Configure the connect server that will be run
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: ['_build/dev', 'node_modules']
                }
            }
        },
        //Typescript settings per build
        ts: {
            options: {
                module: 'amd',
                target: 'es5',
                sourceMap: false,
                declaration: false,
                noImplicitAny:true
            },
            dev: {
                src: ['vendor/references.ts','ts/**/*.ts'],
                reference: 'vendor/references.ts',
                dest: '_build/dev/<%= game.name %>.js'
            },
        },
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'assets', dest: '_build/dev/assets', src: ['**/*']},
                    {expand: true, cwd: 'templates', dest: '_build/dev', src: ['index.html']},
                    {expand: true, cwd: 'node_modules/phaser/build', dest: '_build/dev/vendor', src: ['phaser.min.js']}
                ]
            },
        },
        watch: {
            options: {
                livereload: true
            },
            typescript: {
                files: ['ts/**/*.ts', 'vendor/**/*.d.ts'],
                tasks: ['ts:dev']
            },
            assets: {
                files: ['assets/**/*.*', 'templates/index.html'],
                tasks: ['copy:dev']
            }
        },
        uglify: {
            options: {
                compress: {
                    // sequences: true,
                    // dead_code: true,
                    // conditionals: true,
                    // booleans: true,
                    // unused: true,
                    // if_return: true,
                    // join_vars: true,
                    // drop_console: false
                },
                mangle: false,
                beautify: true
            }
        },
    });

    //Development build, used for testing. Starts filewatcher and webserver
    grunt.registerTask('dev', [
        'copy:dev',
        'ts:dev',
        'connect:server',
        'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
};
