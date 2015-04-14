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
var ngAnnotate = require('gulp-ng-annotate');
var stripDebug = require('gulp-strip-debug');
var newer = require('gulp-newer');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

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
    .pipe(addsrc.append('public/js/vendor/ui-bootstrap-custom-tpls-0.12.1.js'))
    // .pipe(addsrc.append('public/js/vendor/ui-bootstrap-custom-0.12.1.min.js'))
    .pipe(addsrc.append('public/js/app.js'))
    .pipe(addsrc.append('public/js/controllers/*.js'))
    .pipe(addsrc.append('public/js/directives/*.js'))
    .pipe(addsrc.append('public/js/filters/*.js'))
    .pipe(addsrc.append('public/js/vendor/vendor.js'))
    .pipe(concat('build.js')).on('error', errorHandler)
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(stripDebug()).on('error', errorHandler)
    .pipe(gulp.dest('dist/public/js'))
    .pipe(notify({ message: "JS: Your files are now organized" }));
});

// Compile CSS
var sassDest = '';
gulp.task('sass', function() {
  return gulp.src('public/layout/sass/*.scss')
    .pipe(newer('public/layout/sass/*.scss')).on('error', errorHandler)
    .pipe(sass({ style: 'expanded' }))
    .pipe(addsrc.append('bower_components/**/*.css'))
    .pipe(gulp.dest('public/layout/css'))
    .pipe(gulp.dest('dist/public/layout/css'))
    // .pipe(notify({ message: "CSS: Your files are now organized" }));
});

gulp.task('fonts', function() {
    return gulp.src(['public/layout/fonts/*'])
        .pipe(newer('public/layout/fonts/*')).on('error', errorHandler)
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

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch('public/js/**/*.js', ['scripts']);
    gulp.watch('public/layout/sass/*.scss', ['sass']);
});

gulp.task('clean', function(cb) {
    del(['dist/public/layout/css/', 'dist/public/js/', 'dist/public/partials/'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'fonts', 'html', 'images', 'scripts').on('error', errorHandler);
});

// Handle the error
function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}