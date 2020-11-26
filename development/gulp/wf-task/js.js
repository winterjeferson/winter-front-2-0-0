const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes"); //npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const removeCode = require('gulp-remove-code'); //npm install gulp-remove-code --save-dev https://www.npmjs.com/package/gulp-remove-code
const eslint = require('gulp-eslint');

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

gulp.task('buildJsConcat', () => {
    return gulp
        .src(file)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildJsConcatPlugin', () => {
    return gulp
        .src(filePlugin)
        .pipe(concat(fileNamePlugin))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildJsMinify', () => {
    return gulp
        .src(`${configuration.homologation}${configuration.assets}${extension}/${configuration.allFile}`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}/`));
});

gulp.task('buildJsRemoveCode', () => {
    return gulp
        .src(`${configuration.homologation}${configuration.assets}${extension}/*.${extension}`)
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

gulp.task('buildJsLint', () => {
    return gulp
        .src(`${configuration.development}${extension}/${configuration.allFolderFile}`)
        .pipe(eslint({
            'extends': 'eslint:recommended',
            'rules': {
                'quotes': [1, 'single'],
                'semi': [1, 'always'],
                'eqeqeq': [1, 'always'],
                'no-alert': 1,
                'no-eval': 1,
                'no-var': 1,
                'no-redeclare': 1,
                'no-self-compare': 1,
                'no-unused-vars': [1, {
                    'vars': 'all',
                    'args': 'after-used',
                    'ignoreRestSiblings': false
                }],
            },
            'parserOptions': {
                'ecmaVersion': 6,
                'sourceType': 'module',
                'ecmaFeatures': {
                    'jsx': true
                }
            },
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});


gulp.task('buildJs', gulp.series(
    'buildJsLint',
    'buildJsConcat',
    'buildJsConcatPlugin',
));


module.exports = {
    fileAll: fileAll,
};