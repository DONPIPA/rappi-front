var gulp = require('gulp');
var config = require('./config');

//Watch styles
// Watch sass files and run sass:dev task

gulp.task('watch:styles', function() {
	return gulp.watch(config.source.scss.paths, ['sass:dev']);
});

//Watch html
// Watch html files changes and run browser:reload task

gulp.task('watch:html', function() {
	return gulp.watch(config.source.html, ['copy:html', 'browser:reload']);
});

//Watch js
// Watch js files changes and run js:dev

gulp.task('watch:js', function() {
	return gulp.watch(config.source.js.paths, ['js:dev']);
});

//Watch
// Global Watch task

gulp.task('watch', [
  'watch:html',
	'watch:js',
	'watch:styles'
]);
