// gulpfile.js
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var usemin = require('gulp-usemin');
var loader = require('gulp-load-plugins');

var mainBowerFiles = require('main-bower-files');
var transform = require('vinyl-transform');

var src = {
    images  : 'public/layout/assets/',
    styles  : 'public/layout/css/',
    fonts   : 'public/layout/fonts/',
    scripts : 'public/js/',
    bower   : 'bower_components/'
};

var dist = {
    images  : 'dist/public/layout/assets/',
    styles  : 'dist/public/layout/css/',
    fonts   : 'dist/public/layout/fonts',
    scripts : 'dist/public/js/',
};

gulp.task('scripts', function () {
    gulp.src([
        mainBowerFiles(),
        src.scripts
    ])
    .pipe(filter('*.js'))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist.scripts));
});

// gulp.task('css', function () {
//     return gulp.src([
//         src.styles + 'fieldguide.css'
//     ])
//     .pipe(concat('style.css'))
//     .pipe(gulp.dest(dist.styles));
// });
 
// gulp.task('fonts', function() {
//     return gulp.src(src.fonts+'*')
//       .pipe(gulp.dest(dist.fonts));
// });
 
// gulp.task('images', function() {
//     return gulp.src(dist.images+'*')
//       .pipe(gulp.dest(dist.images));
// });



// gulp.task('build', ['css', 'browserify', 'fonts', 'images', 'scripts']);
gulp.task('build', ['scripts']);
 
gulp.task('default', ['watch']);