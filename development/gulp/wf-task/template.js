const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render'); //npm install gulp-nunjucks-render --save-dev // https://zellwk.com/blog/nunjucks-with-gulp/
const rename = require("gulp-rename"); //npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
const htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev  //https://www.npmjs.com/package/gulp-htmlmin/
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const configuration = require('./configuration.js');
const helper = require('./helper.js');

const extension = 'html';
const folder = `${configuration.development}template/`;
const file = `${folder}*.${extension}`;
const fileAll = folder + configuration.allFolderFile;
const fileClean = `${configuration.homologation}*.${extension}`;




gulp.task('buildTemplateClean', (done) => {
    clean(fileClean);
    done();
});


gulp.task('buildTemplateInclude', () => {
    return gulp
        .src(file)
        .pipe(nunjucksRender({
            path: [folder]
        }))
        .pipe(gulp.dest(configuration.homologation));
});

gulp.task('buildTemplateMinify', () => {
    return gulp
        .src(`${configuration.homologation}*.${extension}`)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(configuration.production));
});

gulp.task('buildTemplate', gulp.series(
    'buildTemplateClean',
    'buildTemplateInclude',
));



module.exports = {
    fileAll: fileAll,
};