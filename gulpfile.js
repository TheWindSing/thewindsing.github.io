// gulpfile.js
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// Minify CSS
gulp.task('minify-css', () => {
  return gulp.src('source/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css'));
});

// Minify JS
gulp.task('minify-js', () => {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/js'));
});

// Optimize images
gulp.task('images', () =>
  gulp.src('source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'))
);

// Default task
gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'images'));
