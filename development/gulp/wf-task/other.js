const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const configuration = require('./configuration.js');

const folder = 'other/';
const fileAll = [
    `${configuration.development}${folder}${configuration.allFolderFile}`,
    `${configuration.development}${folder}.htaccess`,
];
const fileAllPublic = [
    `${configuration.homologation}.txt`,
    `${configuration.homologation}.htaccess`,
];


function clean(path) {
    return del(path, {
        force: true
    }); // returns a promise
}

gulp.task('buildOtherClean', () => {
    return clean(fileAllPublic);
});

gulp.task('buildOtherMove', (done) => {
    return gulp
        .src(fileAll)
        .pipe(gulp.dest(configuration.homologation));
    done();
});

gulp.task('buildOther', gulp.series(
    'buildOtherClean',
    'buildOtherMove',
));



module.exports = {
    fileAll: fileAll,
};