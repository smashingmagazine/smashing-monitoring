var gulp = require('gulp'),
	lambda = require('gulp-awslambda'),
	fs = require('fs'),
	zip = require('gulp-zip'),

	aws = JSON.parse(fs.readFileSync('./aws.json'));


gulp.task('psi', function () {
	return gulp.src('../app/psi/**/*')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params_psi, aws))
});


gulp.task('get', function () {
	return gulp.src('../app/get**/*')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params_get, aws))
});