// gulpfile.js
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');

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
    gulp.src( bower )
    .pipe(filter('*.js'))
    .pipe(uglify({mangle:false}))
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('dist/public/js'));

    gulp.src('public/js/*')
    .pipe(filter('*.js'))
    .pipe(uglify({mangle:false}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/public/js'));
});

gulp.task('default', ['scripts']);