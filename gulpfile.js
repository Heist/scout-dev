// gulpfile.js
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var del = require('del');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var mainBowerFiles = require('main-bower-files');
var transform = require('vinyl-transform');

var bower = mainBowerFiles();

var bower = mainBowerFiles({
        checkExistence: true
    });

if(!bower.length) {
    throw new Error('No main files from Bower dependencies found!');
}

gulp.task('scripts', function () {
    return gulp.src( bower.concat('public/js/*') )
    .pipe(filter('*.js'))
    .pipe(uglify({mangle:false}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/public/js'));
});

gulp.task('css', function () {
    return gulp.src([
        'public/layout/css/*.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/public/layout/css'));
});

gulp.task('fonts', function() {
    return gulp.src(['public/layout/fonts/*'])
      .pipe(gulp.dest('dist/public/layout/fonts'));
});

gulp.task('images', function() {
    return gulp.src('public/layout/assets/*')
      .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
      .pipe(gulp.dest('dist/public/layout/assets'));
});

gulp.task('html', function() {
    return gulp.src(['public/index.html','public/partials/*'])
      .pipe(gulp.dest('dist/public/partials'));
});

gulp.task('clean', function(cb) {
    del(['dist/public/layout/css/', 'dist/public/layout/assets/', 'dist/public/js/', 'dist/public/partials/'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'fonts', 'html', 'images', 'scripts');
});