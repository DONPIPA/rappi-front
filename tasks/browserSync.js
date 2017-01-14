var gulp = require('gulp');
var config = require('./config');
var browserSync = require('browser-sync').create(config.server.name);

//Normal site

gulp.task('browser:site', function() {
	var serverConfig = {
		server: {
			baseDir: config.server.baseDir
		},
		open: false
	};

	browserSync.init(serverConfig);
});

//Reload site

gulp.task('browser:reload', function() {
	return browserSync.reload();
});
