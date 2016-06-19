var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require("gulp-livereload");
var concat = require('gulp-concat');
var minify = require('gulp-clean-css');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('compile-sass', function() {
    gulp.src('app/assets/stylesheets/application.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/stylesheets/'))
        .pipe(livereload());
});

gulp.task('build-js', function() {
  var mergeStream = gulp.src([ 'vendor/assets/angular/angular.js',
                               'vendor/assets/angular-sanitize/angular-sanitize.js',
                               'vendor/assets/angular-ui-select/dist/select.js',
                               'vendor/assets/ui-bootstrap/ui-bootstrap-custom-1.3.3.min.js',
                               'vendor/assets/ui-bootstrap/ui-bootstrap-custom-tpls-1.3.3.min.js',
                               'app/assets/javascripts/app.js',
                               'app/assets/javascripts/mainCtrl.js',
                               'app/assets/javascripts/apiService.js'
                            ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('application.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/javascripts/'))
    .pipe(livereload());;
 return mergeStream;   
});

gulp.task('watch-html', function() {
  gulp.src('views/**/*.html')
  .pipe(livereload());
})

gulp.task('default', function() {
  livereload.listen();
  gulp.watch(['app/assets/stylesheets/*.scss'], ['compile-sass']);
  gulp.watch(['app/assets/javascripts/**/*.js'], ['build-js']);
  gulp.watch(['views/**/*.html'], ['watch-html']);
})