const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes"); //npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const removeCode = require('gulp-remove-code'); //npm install gulp-remove-code --save-dev https://www.npmjs.com/package/gulp-remove-code

const configuration = require('./configuration.js');


const extension = 'js';
const filePrefix = `${configuration.prefix}${configuration.theme}`;
const filePrefixPlugin = `${configuration.prefix}${configuration.plugin}`;
const folder = `${configuration.development}${extension}/`;
const file = `${folder}${filePrefix}/${configuration.allFolderFile}`;
const filePlugin = [
    `${configuration.development}${extension}/${configuration.prefix}plugin/_WfDebug.${extension}`,
    `${configuration.development}${extension}/${configuration.prefix}translation/${configuration.allFolderFile}`,
    `${configuration.development}${extension}/${configuration.prefix}plugin/**/!(_)*.${extension}`,
    `${configuration.development}${extension}/${configuration.prefix}plugin/_WfManagementPlugin.${extension}`,
];
const fileName = `${filePrefix}.${extension}`;
const fileNamePlugin = `${filePrefixPlugin}.${extension}`;
const fileAll = folder + configuration.allFolderFile;

gulp.task('buildJsConcat', function () {
    return gulp.src(file)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildJsConcatPlugin', function () {
    return gulp.src(filePlugin)
        .pipe(concat(fileNamePlugin))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildJsMinify', function () {
    console.log(`${configuration.homologation}${configuration.assets}${extension}/${configuration.allFile}`);
    console.log(`${configuration.production}${configuration.assets}${extension}/`);
    return gulp.src(`${configuration.homologation}${configuration.assets}${extension}/${configuration.allFile}`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}/`));
});

gulp.task('buildJsRemoveCode', function () {
    return gulp.src(`${configuration.homologation}${configuration.assets}${extension}/*.${extension}`)
        .pipe(removeCode({
            production: true
        }))
        .pipe(removeCode({
            noDevFeatures: false,
            commentStart: '/*',
            commentEnd: '*/'
        }))
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}/`));
});


gulp.task('buildJs', gulp.series(
    'buildJsConcat',
    'buildJsConcatPlugin',
));


module.exports = {
    fileAll: fileAll,
};