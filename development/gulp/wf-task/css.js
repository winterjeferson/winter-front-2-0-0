const gulp = require('gulp');
const sass = require('gulp-sass'); //npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
const csso = require('gulp-csso'); //npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/
const rename = require('gulp-rename'); //npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
const gulpStylelint = require('gulp-stylelint'); //npm install stylelint gulp-stylelint --save-dev //https://www.npmjs.com/package/gulp-stylelint

const configuration = require('./configuration.js');

const extension = 'css';
const extensionSass = `s${extension}`;
const filePrefix = `${configuration.prefix}${configuration.theme}`;
const filePrefixPlugin = `${configuration.prefix}${configuration.plugin}`;
const folder = `${configuration.development}${extension}/`;
const file = folder + `${filePrefix}/${configuration.index}.${extensionSass}`;
const filePlugin = folder + `${filePrefixPlugin}/${configuration.index}.${extensionSass}`;
const fileName = `${filePrefix}.${extension}`;
const fileNamePlugin = `${filePrefixPlugin}.${extension}`;
const fileAll = folder + configuration.allFolderFile;



gulp.task('buildCssSass', () => {
    return gulp
        .src(file)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildCssSassPlugin', () => {
    return gulp
        .src(filePlugin)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename(fileNamePlugin))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildCssMinify', () => {
    return gulp
        .src(`${configuration.homologation}${configuration.assets}${extension}/*.*`)
        .pipe(csso())
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}/`));
});

gulp.task('buildCssLint', function lintCssTask(done) {
    return gulp
        .src(fileAll)
        .pipe(gulpStylelint({
            failAfterError: true,
            reporters: [{
                formatter: 'verbose',
                console: true
            }, ],
            debug: true
        }));
    done();
});


gulp.task('buildCss', gulp.series(
    'buildCssLint',
    'buildCssSass',
    'buildCssSassPlugin',
));


module.exports = {
    fileAll: fileAll
};