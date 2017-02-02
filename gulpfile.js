var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json'),
    destDir = tsProject.config.compilerOptions.outDir,
    mocha = require('gulp-mocha'),
    path = require('path'),
    rename = require('gulp-rename');
// or requiring in ES5
var tslint = require("gulp-tslint");
var merge = require('merge2');
var shell = require('gulp-shell');

gulp.task('ts-lint', ['clean-ts'], function () {
    return gulp.src(['./**/*.ts', '!typings/**/*.ts', '!node_modules/**/*.ts']).pipe(tslint({
    formatter: "prose"
}))
.pipe(tslint.report());
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', ['ts-lint'], function () {
    var tsProj = tsProject.src();
    // console.log('tsProj = ' + JSON.stringify(tsProj, null, 4));
    // var tsResult = tsProject.src()
    var tsResult = tsProj
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
    ]);
});

gulp.task('copy-json', ['compile-ts'], function () {
    var sourceJsonFiles = [
                            './src/*.json',                //path to typescript files
                            ];

 return gulp.src(sourceJsonFiles).pipe(gulp.dest(destDir /* 'dist/src/' */));

});

gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
                              destDir + '/**/*.*' //  './dist/**/*.*' */    // path to all JS files auto gen'd by editor
                           ];

  // delete the files
  return del(typeScriptGenFiles, cb);
});

gulp.task('test', ['copy-json'], function () {
	return gulp.src(destDir + '/test/**/*.spec.js', {read: false}) // 'dist/test/**/*.spec.js', {read: false})
		// gulp-mocha needs filepaths so you can't have any plugins before it
		.pipe(mocha({reporter: 'spec', timeout: '360000'})).once('error', () => {
            process.exit(1);
        });
});

gulp.task('pack', ['test'], shell.task([
        'npm pack'
    ])
);

gulp.task('default', ['clean-ts', 'ts-lint', 'compile-ts', 'copy-json', 'test']);
