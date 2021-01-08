const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const css = require('./css.js');
const image = require('./image.js');
const js = require('./js.js');
const project = require('./project.js');
const template = require('./template.js');
const configuration = require('./configuration.js');

const fileAll = [
    configuration.homologation + '.htaccess',
    configuration.homologation + '*.txt',
    configuration.homologation + '*.xml',
];



gulp.task('buildProjectMove', () => {
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

gulp.task('initialize', gulp.series(
    'buildCss',
    'buildJs',
    'buildImage',
    'buildOther',
    'buildTemplate',
));

gulp.task('deploy', gulp.series(
    'buildCssMinify',
    'buildJsRemoveCode',
    'buildJsMinify',
    'buildProject',
    'buildTemplateMinify',
    'buildImageMinify',
));