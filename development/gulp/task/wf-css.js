var gulp = require('gulp');
var sass = require('gulp-sass');//npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
var concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
var csso = require('gulp-csso');//npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/
var rename = require("gulp-rename");//npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/

var configuration = require('./configuration.js');
var wf_project = require('./wf-project.js');
var wf_util = require('./wf-util.js');


var folderSass = 'wf-sass';
var wf_fileCssSass = [
    configuration.development + 'css/' + folderSass + '/sass-variable.scss',
    configuration.development + 'css/' + folderSass + '/sass-color.scss',
    configuration.development + 'css/' + folderSass + '/sass.scss',
];

var wf_fileCssDefault = [
    configuration.development + 'css/wf-sass/*.scss',
    configuration.development + 'css/wf-theme/*.scss',
];

var wf_fileCssDefaultIndex = [
    configuration.development + 'css/wf-theme/index.scss',
];

var wf_fileCssPlugintIndex = [
    configuration.development + 'css/wf-plugin/index.scss',
];

var wf_fileCssPlugin = [
    configuration.development + 'css/wf-sass/*.scss',
    configuration.development + 'css/wf-plugin/*.scss',
];

var wf_cssDefaultConcat = wf_fileCssSass.concat(wf_fileCssDefault);
var wf_cssPluginConcat = wf_fileCssSass.concat(wf_fileCssPlugin);
var wf_fileStyle = 'wf-theme';
var wf_filePlugin = 'wf-plugin';



gulp.task('wf_css_style_sass', function () {
    return gulp
        .src(wf_fileCssDefaultIndex)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename(wf_fileStyle + '.css'))
        .pipe(gulp.dest(configuration.homologation + configuration.assets + 'css/'));
});

gulp.task('wf_css_style', gulp.series(
    'wf_css_style_sass',
    'wf_beep'
));






gulp.task('wf_css_plugin_sass', function () {
    return gulp
        .src(wf_fileCssPlugintIndex)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename(wf_filePlugin + '.css'))
        .pipe(gulp.dest(configuration.homologation + configuration.assets + 'css/'));
});

gulp.task('wf_css_plugin', gulp.series(
    'wf_css_plugin_sass',
    'wf_beep'
));





gulp.task('wf_css_minify', function () {
    return gulp
        .src(configuration.homologation + configuration.assets + 'css/*.*')
        .pipe(csso())
        .pipe(gulp.dest(configuration.production + configuration.assets + 'css/'));
});




module.exports = {
    wf_cssDefaultConcat: wf_cssDefaultConcat,
    wf_cssPluginConcat: wf_cssPluginConcat,
};