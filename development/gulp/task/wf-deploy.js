const gulp = require('gulp');

const project = require('./wf-project.js');
const image = require('./wf-image.js');
const js = require('./wf-js.js');
const template = require('./wf-template.js');

gulp.task('deployWf', gulp.series(
        'buildCssMinify',
        'wf_js_remove_code',
        'wf_js_minify',
        'wf_project_move_production',
        'wf_image_imagemin',
        'wf_template_minify',
));