/*
* @Author: Administrator
* @Date:   2017-03-30 21:00:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-31 21:28:29
*/

'use strict';
var gulp=require("gulp");
var less=require("gulp-less");
var cssnano=require("gulp-cssnano");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');


gulp.task("style",function(){
	gulp.src(["src/styles/*.less","!src/styles/_*.less"])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest("dist/styles"))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
    
});

gulp.task("image",function(){
	gulp.src("src/images/*.*")
	.pipe(gulp.dest("dist/imgs"))
	.pipe(browserSync.reload({
      stream: true
    }));
})


var htmlmin=require("gulp-htmlmin");
gulp.task("html",function(){
	gulp.src("src/*.html")
	.pipe(htmlmin({
	  collapseWhitespace: true,
      removeComments: true
	}))
	.pipe(gulp.dest("dist"))
	.pipe(browserSync.reload({
      stream: true
    }));
});



gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });
  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['html']);
});