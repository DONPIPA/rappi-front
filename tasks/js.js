var $ = require('gulp-load-plugins')();
var config = require('./config');
var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync').get(config.server.name);
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var stylishReporter = require('jshint-stylish');
var buffer = require('vinyl-buffer');

gulp.task('js:linter', function() {
  return gulp.src(config.source.js.paths)
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylishReporter));
});

gulp.task('js:dev', ['js:vendors', 'js:linter'], function() {
  var b = browserify({
    entries: config.source.js.entries,
    debug: true
  });

  b.bundle()
    .pipe(source(config.source.js.filename))
    .pipe(buffer())
		.pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify({ mangle: false }))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(config.source.js.exportPath));

    return reload();
});

gulp.task('js:vendors', function() {
  return gulp.src(config.source.js.vendors)
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(config.source.js.exportPath));
});
