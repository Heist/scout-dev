// gulpfile.js
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
 
gulp.task('css', function () {
    return gulp.src([
        'app/src/css/vendor/normalise.css',
        'app/src/css/vendor/boilerplate.css',
        'app/src/css/style.css',
        'app/src/css/responsive.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/public/layout/css'));
});
 
gulp.task('fonts', function() {
    return gulp.src('app/src/fonts/*')
      .pipe(gulp.dest('dist/public/layout/fonts'));
});
 
gulp.task('images', function() {
    return gulp.src('app/src/img/*')
      .pipe(gulp.dest('dist/public/layout/assets'));
});
 
gulp.task('watch', function() {
    gulp.watch('app/src/css/**', ['css']);
    gulp.watch('app/src/js/**', ['browserify']);
    gulp.watch('app/src/fonts/**', ['fonts']);
    gulp.watch('app/src/img/**', ['images']);
});
 
gulp.task('build', ['css', 'browserify', 'fonts', 'images']);
 
gulp.task('default', ['watch']);