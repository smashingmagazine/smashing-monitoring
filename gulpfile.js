var gulp = require('gulp'),
	config = require('./app/psi/config.js'),
	lambda = require('gulp-awslambda'),
	fs = require('fs'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	zip = require('gulp-zip'),
    minifyCss = require('gulp-minify-css'),
    awspublish = require("gulp-awspublish"),
	uglify = require('gulp-uglify'),
	aws = JSON.parse(fs.readFileSync('./aws.json'));


gulp.task('default',['js','css'], function () {
	'use strict';
	return gulp.src('./app/psi/**/*')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params_psi, aws));
});



gulp.task('proxy',['js','css'], function () {
	'use strict';
	return gulp.src('./app/gateway-proxy/**/*')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params_proxy, aws));
});

gulp.task('s3', function() {
	'use strict';
    // create a new publisher using S3 options
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
    var publisher = awspublish.create({
        params: {
            Bucket: config.bucketName
        }
    });


    return gulp.src('./dist/*')
        // gzip, Set Content-Encoding headers and add .gz extension
        //.pipe(awspublish.gzip({ ext: '.gz' }))
        .pipe(publisher.publish())
        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        //.pipe(publisher.publish(headers))

        // create a cache file to speed up consecutive uploads
        //.pipe(publisher.cache())

        // print upload updates to console
        .pipe(awspublish.reporter());
});




gulp.task('js',function(){
	'use strict';
	return gulp.src(['./app/bower_components/zepto/zepto.js','./app/bower_components/moment/min/moment.min.js','./app/bower_components/moment/locale/de.js','./app/bower_components/chartist/dist/chartist.js','./app/frontend-src/custom.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./app/psi/template/assets'));
});



gulp.task('css',function(){
	'use strict';
	return gulp.src(['./app/bower_components/bootstrap/dist/css/bootstrap.css','./app/bower_components/chartist/dist/chartist.min.css','./app/frontend-src/custom.css'])
        .pipe(concat('app.css'))
        .pipe(minifyCss())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('./app/psi/template/assets'));
});