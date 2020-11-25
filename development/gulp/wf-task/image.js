const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); //npm install gulp-imagemin --save-dev //https://www.npmjs.com/package/gulp-imagemin/
const newer = require('gulp-newer'); //npm install gulp-newer --save-dev // https://www.npmjs.com/package/gulp-newer/
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const configuration = require('./configuration.js');

const folder = 'img/';
const fileAll = configuration.development + folder + configuration.allFolderFile;


function clean(path) {
    return del(path, {
        force: true
    });
}

gulp.task('buildImageClean', () => {
    const file = `${configuration.homologation}${configuration.assets}${folder}!(dynamic)*`;
    return clean(file);
});

gulp.task('buildImageMove', (callback) => {
    return gulp
        .src(fileAll)
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${folder}`));
    callback();
});

// fix enoent problem: node node_modules/optipng-bin/lib/install.js
gulp.task('buildImageMinify', () => {
    return gulp
        .src(`${configuration.homologation}${configuration.assets}${folder}**`)
        .pipe(newer(`${configuration.production}${configuration.assets}${folder}`))
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${folder}`));
});

gulp.task('buildImage', gulp.series(
    'buildImageClean',
    'buildImageMove',
));

module.exports = {
    fileAll: fileAll,
};