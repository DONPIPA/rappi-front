var $ = require('gulp-load-plugins')();
var config = require('./config');
var browserSync = require('browser-sync').get(config.server.name);
var gulp = require('gulp');
var reload = browserSync.reload;

gulp.task('sass:linter', function() {
	return gulp.src(config.source.scss.paths)
		.pipe($.scssLint({ 'config': 'lint.yml' }));
});

gulp.task('sass:dev', ['sass:linter'], function() {
	return gulp.src(config.source.scss.base)
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}))
		.pipe($.autoprefixer())
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(config.source.scss.exportPath))
		.pipe(reload({stream: true}));
});
