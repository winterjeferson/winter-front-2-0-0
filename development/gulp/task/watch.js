const gulp = require('gulp');
const webserver = require('gulp-webserver');

const css = require('./wf-css.js');
const img = require('./wf-image.js');
const js = require('./wf-js.js');
const other = require('./wf-other.js');
const template = require('./wf-template.js');
const configuration = require('./configuration.js');

gulp.task('webserver', () => {
    gulp.src(configuration.homologation)
        .pipe(webserver({
            port: configuration.port,
            livereload: true,
            host: configuration.ip,
            open: true,
        }))
});

gulp.task('watch', (callback) => {
    gulp.watch(css.fileAll, gulp.series('buildCssSass'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(js.fileJs_wf_, gulp.series('wf_js_default'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(js.fileJs_wf_Plugin, gulp.series('wf_js_plugin'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(img.fileAll, gulp.series('buildImage'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(other.fileOther, gulp.series('wf_other'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(template.wf_fileTemplateWatch, gulp.series('wf_template'))
        .on('change', (event) => {
            console.log(event);
        });

    callback();
});

gulp.task('default',
    gulp.series(
        'watch',
        'webserver',
    )
);