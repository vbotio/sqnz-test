var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var connect = require("gulp-connect")


var paths = {
    sass: ['./scss/*.scss']
};

gulp.task('default', ['connect', 'sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('/www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('connect', function(){
    connect.server({
        root: 'www'
    });
})

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
             gutil.colors.red('Git nao instalado.'), 
                '\n  Git, é necessário.',
                '\n  Download git aqui:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  qdo estiver instalado, run \'' + gutil.colors.cyan('gulp install') + '\' novamente.'
        );
        process.exit(1);
    }
    done();
});