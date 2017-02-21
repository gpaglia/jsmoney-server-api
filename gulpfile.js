var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json'),
    tsProjectTest = tsc.createProject('tsconfig.json', {declaration: false}), // for testing
    //mocha = require('gulp-mocha'),
    jasmine = require('gulp-jasmine'),
    path = require('path'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    print = require('gulp-print'),
    tslint = require("gulp-tslint"),
    merge = require('merge2'),
    shell = require('gulp-shell');

var destDir = tsProject.config.compilerOptions.outDir,
    destDirTest = destDir + '-test',
    noSpecs = filter(['**/*.ts', '!**/*.spec.ts']),
    withSpecs = filter(['**/*.ts']);

gulp.task('ts-lint', ['clean-ts-src'], function (done) {
    return 
        tsProject.src()
        .pipe(noSpecs)
        .pipe(tslint({formatter: "prose"}))
        .pipe(tslint.report())
        .on('end', done);
});

gulp.task('compile-ts', ['compile-ts-src', 'compile-ts-test']);
/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts-src', ['ts-lint'], function (done) {
    var tsProj = tsProject.src();
    // console.log('tsProj = ' + JSON.stringify(tsProj, null, 4));
    // var tsResult = tsProject.src()
    var tsResult = tsProj
    .pipe(noSpecs)
    //.pipe(print())
    .pipe(sourcemaps.init())
    .pipe(tsProject(tsc.reporter.defaultReporter()));
    // .pipe(tsc(tsProject));
    return merge([
        tsResult.dts.pipe(gulp.dest(destDir /*'dist'*/)),
        tsResult.js.pipe(sourcemaps.write('.', {
            // Return relative source map root directories per file.
            includeContent: false,
            sourceRoot: function (file) {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return "../" + path.relative(path.dirname(sourceFile), __dirname);
            }
        })).pipe(gulp.dest(destDir /* 'dist' */))
    ]).on('end', done);
});

/**
 * Compile TypeScript test files.
 */
gulp.task('compile-ts-test', ['clean-ts-test'], function (done) {
    var tsProj = tsProjectTest.src();
    // console.log('tsProj = ' + JSON.stringify(tsProj, null, 4));
    // var tsResult = tsProject.src()
    var tsResult = tsProj
    .pipe(withSpecs)
    //.pipe(print())
    .pipe(tsProjectTest(tsc.reporter.defaultReporter()))
    .pipe(gulp.dest(destDirTest))
    .on('end', done);
});

gulp.task('copy-json', function (done) {
    var sourceJsonFiles = ['./src/*.json'];
    return gulp.src(sourceJsonFiles).pipe(gulp.dest(destDir)).on('end', done);
});

gulp.task('clean-ts', ['clean-ts-src', 'clean-ts-test']);

gulp.task('clean-ts-src', function (done) {
  var typeScriptGenFiles = [destDir + '/**/*.*'];
  // delete the files
  return del(typeScriptGenFiles, done);
});

gulp.task('clean-ts-test', function (done) {
  var typeScriptGenFiles = [destDirTest + '/**/*.*'];
  // delete the files
  return del(typeScriptGenFiles, done);
});

gulp.task('test', ['compile-ts-test'], function (done) {
	return gulp.src('./dist-test/**')    //destDirTest + '/**/*.spec.js') 
        .pipe(jasmine({timeout: '360000'}));
});

gulp.task('pack', ['default'], shell.task([
        'npm pack'
    ])
);

gulp.task('default', ['clean-ts', 'ts-lint', 'compile-ts', 'copy-json', 'test']);
