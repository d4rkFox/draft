let gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  ttf2woff = require('gulp-ttf2woff'),
  include = require('gulp-file-include')


gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.css'
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
});

gulp.task('script', function () {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('html', function () {
  return gulp
    .src(['src/*.html', '!src/components/**/*.html'])
    .pipe(
      include({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(gulp.dest("app/"))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('ttf2woff', function () {
  return gulp.src(['app/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('app/fonts/'));
});

gulp.task('ttf2woff2', function () {
  return gulp.src(['src/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('app/fonts/'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch(['src/*.html','src/components/**/*.html'], gulp.parallel('html'))
  gulp.watch('src/js/*js', gulp.parallel('js'))
  gulp.watch('src/fonts/**/*.ttf', gulp.parallel('ttf2woff2', 'ttf2woff'));

})

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync', 'ttf2woff2', 'ttf2woff'))

