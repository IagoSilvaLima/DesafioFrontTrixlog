const gulp = require('gulp');
const bowerMain = require('gulp-main-bower-files');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');

gulp.task('bower',['clear'],function(){
    return gulp.src('./bower.json')
        .pipe(bowerMain())
        .pipe(gulp.dest('./src/libs'));
});

gulp.task('clear',function(){
    return gulp.src('./src/libs')
        .pipe(clean());
})





