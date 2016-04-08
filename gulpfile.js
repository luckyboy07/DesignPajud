var gulp        = require('gulp');
var browserSync = require('browser-sync');
 
gulp.task('serve', function () {
	browserSync.init({
        notify: false,
        port:9001,
        serve:  {
            baseDir: "./"
        }
    });

	gulp.watch(['index.html','app/**/*.*'])
		.on('change',browserSync.reload);
});
