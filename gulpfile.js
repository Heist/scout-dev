// gulpfile.js
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var addsrc = require('gulp-add-src');
var stripDebug = require('gulp-strip-debug');
var newer = require('gulp-newer');

var del = require('del');
var mainBowerFiles = require('main-bower-files');
var transform = require('vinyl-transform');

var bower = mainBowerFiles();

var bower = mainBowerFiles({
        checkExistence: true
    });

if(!bower.length) {
    throw new Error('No main files from Bower dependencies found!');
}
var libs = 'public/js/libs/*.js';

gulp.task('scripts', function () {
    return gulp.src( 
        bower
    )
    .pipe(filter('*.js'))
    .pipe(uglify())
    .pipe(addsrc.append('public/js/app.js'))
    .pipe(addsrc.append('public/js/controllers/*.js'))
    .pipe(addsrc.append('public/js/directives/*.js'))
    .pipe(addsrc.append('public/js/filters/*.js'))
    .pipe(addsrc.append('public/js/vendor/*.js'))
    // .pipe(jshint()).on('error', errorHandler)
    // .pipe(jshint.reporter('default'))
    .pipe(concat('build.js')).on('error', errorHandler)
    .pipe(gulp.dest('public/js'))
    .pipe(stripDebug()).on('error', errorHandler)
    .pipe(gulp.dest('dist/public/js'));
});

gulp.task('css', function () {
    return gulp.src([
        'bower_components/**/*.css',
        'public/layout/css/*.css'
    ])
    .pipe(concat('style.css')).on('error', errorHandler)
    .pipe(gulp.dest('dist/public/layout/css'));
});

gulp.task('fonts', function() {
    return gulp.src(['public/layout/fonts/*'])
      .pipe(gulp.dest('dist/public/layout/fonts'));
});

var imgDest = 'dist/public/layout/assets';
gulp.task('images', function() {
    return gulp.src('public/layout/assets/*')
      .pipe(newer(imgDest)).on('error', errorHandler)
      .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })).on('error', errorHandler)
      .pipe(gulp.dest(imgDest));
});

gulp.task('html', function() {
    return gulp.src(['public/partials/**/*.html'])
      .pipe(gulp.dest('dist/public/partials'));
});

gulp.task('clean', function(cb) {
    del(['dist/public/layout/css/', 'dist/public/js/', 'dist/public/partials/'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'fonts', 'html', 'images', 'scripts').on('error', errorHandler);
});

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}