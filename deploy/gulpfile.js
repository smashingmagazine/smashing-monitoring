var gulp = require('gulp'),
	lambda = require('gulp-awslambda'),
	fs = require('fs'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	zip = require('gulp-zip'),
	s3 = require("gulp-s3"),
	uglify = require('gulp-uglify'),
	aws = JSON.parse(fs.readFileSync('./aws.json'));


gulp.task('psi', function () {
	'use strict';
	return gulp.src('../app/psi/**/*')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params_psi, aws));
});


// Bucketname ist nicht nur an einer stelle notiert!
gulp.task('s3',function(){
	'use strict';
	gulp.src('../dist/**')
		.pipe(s3(aws));
});



gulp.task('js',function(){
	'use strict';
	return gulp.src(['../app/bower_components/moment/min/moment.min.js','../app/bower_components/moment/locale/de.js','../dist/custom.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename('app.js'))
		.pipe(gulp.dest('../dist/'));
});