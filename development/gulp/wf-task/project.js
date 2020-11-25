const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const configuration = require('./configuration.js');
const fileAll = [
    configuration.homologation + '.htaccess',
    configuration.homologation + '*.txt',
];



gulp.task('buildProjectMove', function () {
    gulp
        .src(fileAll)
        .pipe(gulp.dest(configuration.production));

    return gulp
        .src(`${configuration.homologation}${configuration.assets}font/${configuration.allFolderFile}`)
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}font/`));
});


gulp.task('buildProject', gulp.series(
    'buildProjectMove',
));