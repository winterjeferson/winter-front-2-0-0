const gulp = require('gulp');

const project = require('./wf-project.js');
const image = require('./wf-image.js');
const js = require('./wf-js.js');
const template = require('./wf-template.js');

gulp.task('deployWf', gulp.series(
        'buildCssMinify',
        'buildJsRemoveCode',
        'buildJsMinify',
        'wf_project_move_production',
        'wf_template_minify',
        'buildImageMinify',
));