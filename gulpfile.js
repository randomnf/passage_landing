'use strict';

const	gulp = require('gulp'),
		fileinclude = require('gulp-file-include'),
		sass = require('gulp-sass'),
		cssmin = require('gulp-clean-css'),
		rename = require('gulp-rename'),
		htmlbeautify = require('gulp-html-beautify'),
		htmlmin = require('gulp-htmlmin'),
		jsmin = require('gulp-jsmin');

gulp.task("html",function(){
	gulp.src('src/html/*.html')
		.pipe(fileinclude({
			context: {
				title: "",
				page: ""
			}
		}))
		.pipe(htmlbeautify({
			"indent_size": 1,
			"indent_char": "	",
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('scss', function () {
	return gulp.src('src/css/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssmin())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest('build/css'));
});

gulp.task('scss-full', function () {
	return gulp.src('src/css/style.scss')
		.pipe(sass({
			outputStyle: 'expanded',
			indentType: 'tab',
			indentWidth: 1
		}).on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

gulp.task('jsmin', function () {
	return gulp.src('src/js/*.js')
		.pipe(jsmin())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('build/js'));
});

gulp.task("htmlmin",function(){
	gulp.src('src/html/*.html')
		.pipe(fileinclude())
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch('src/css/**/*.scss', ['scss']);
	gulp.watch('src/css/**/*.scss', ['scss-full']);
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/js/*.js', ['jsmin']);
});

gulp.task('default', ['html', 'scss', 'scss-full', 'jsmin', 'watch']);
