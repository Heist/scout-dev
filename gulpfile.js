// gulpfile.js
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
 
var src = {
    images  : 'public/layout/assets/',
    styles  : 'public/layout/css/',
    fonts   : 'public/layout/fonts',
    scripts : 'public/js/'
};

var dist = {
    images  : 'dist/public/layout/assets/',
    styles  : 'dist/public/layout/css/',
    fonts   : 'dist/public/layout/fonts',
    scripts : 'dist/public/js/',
};


gulp.task('css', function () {
    return gulp.src([
        src.styles + 'fieldguide.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dist.styles));
});
 
gulp.task('fonts', function() {
    return gulp.src(src.fonts+'*')
      .pipe(gulp.dest(dist.fonts));
});
 
gulp.task('images', function() {
    return gulp.src(dist.images+'*')
      .pipe(gulp.dest(dist.images));
});

gulp.task('build', ['css', 'browserify', 'fonts', 'images']);
 
gulp.task('default', ['watch']);