const gulp = require('gulp');

const css = require('./css.js');
const image = require('./image.js');
const js = require('./js.js');
const project = require('./project.js');
const template = require('./template.js');

gulp.task('deployWf', gulp.series(
        'buildCssMinify',
        'buildJsRemoveCode',
        'buildJsMinify',
        'buildProject',
        'buildTemplateMinify',
        'buildImageMinify',
));