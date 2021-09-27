/**
 * Gulp Files
 */
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    prefix      = require('gulp-autoprefixer'),
    sass        = require('gulp-sass'),
    image       = require('gulp-image'),
    uglify      = require('gulp-uglify');

/**
 * Imagecompress - convert images into small size
 */
gulp.task('Imagecompress', function(){
        return gulp.src('assets/images-original/**/*')
                .pipe(image())
                .pipe(gulp.dest('assets/images'))
});

/**
 * SASS - Compile SASS files into CSS
 */
gulp.task('SASSCompile',function(){
    return gulp.src('assets/scss/style.scss')
            .pipe(sass())
            .pipe(prefix('last 2 versions'))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('assets/css'))
});

/**
 * JsCompress - compile js vendors into one file
 */
gulp.task('JsCompress',function(){
  return gulp.src('assets/js/plugins/*.js')
          .pipe(concat('plugins.js'))
          .pipe(uglify())
          .pipe(gulp.dest('source/assets/js'))
});

/**
 * Gulp Watch and Tasks
 */

 gulp.task('watch',function(){
    gulp.watch('assets/images/**/*',gulp.series('Imagecompress'));
    gulp.watch('assets/scss/*.scss',gulp.series('SASSCompile'));
    gulp.watch('assets/js/plugins/*.js',gulp.series('JsCompress'));
 });

// Gulp Tasks
 gulp.task('default',['watch']);