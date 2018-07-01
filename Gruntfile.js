'use strict';

module.exports = function exports(grunt) {
  grunt.initConfig({
    copy: {
      app: {
        src: 'index.min.html',
        dest: 'dist/index.html',
      },
      html: {
        expand: true,
        flatten: true,
        src: 'public/partials/*',
        dest: 'dist/public/partials/',
      },
      fonts: {
        expand: true,
        src: 'public/style/fonts/**/*',
        dest: 'dist/',
      },
      img: {
        expand: true,
        src: 'public/img/*',
        dest: 'dist/',
      },
    },
    concat: {
      options: {
        separator: '\n',
      },
      app: {
        src: ['public/js/**/*.js'],
        dest: 'dist/public/app.min.js',
      },
      vendor: {
        src: ['bower_components/angular/angular.min.js', 'bower_components/**/*.min.js'],
        dest: 'dist/public/vendor.js',
      },
      css: {
        src: ['public/style/css/*.css'],
        dest: 'dist/public/style.min.css',
      },
    },
    'string-replace': {
      js: {
        files: {
          'dist/public/app.min.js': 'dist/public/app.min.js',
        },
        options: {
          replacements: [{
            pattern: /\;\'use\sstrict\'\;/g,
            replacement: '\n',
          }],
        },
      },
      css: {
        files: {
          'dist/public/style.min.css': 'dist/public/style.min.css',
        },
        options: {
          replacements: [{
            pattern: /\.\.\/\.\.\//g,
            replacement: '../public/',
          }, {
            pattern: /\.\.\/fonts\//g,
            replacement: 'style/fonts/',
          }],
        },
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/public/app.min.js': ['dist/public/app.min.js'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['copy', 'concat', 'string-replace', 'uglify:dist']);
};
