var // Config = require('./gulpfile.config'),
    gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json'),
    tsProjectTest = tsc.createProject('tsconfig.json', { declaration: false }), // for testing
    //mocha = require('gulp-mocha'),
    jasmine = require('gulp-jasmine'),
    path = require('path'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    print = require('gulp-print'),
    tslint = require("gulp-tslint"),
    merge = require('merge2'),
    shell = require('gulp-shell'),
    sequence = require('gulp-sequence');

var destDir = tsProject.config.compilerOptions.outDir,
    rootDir = tsProject.config.compilerOptions.rootDir,
    srcFiles = rootDir + '/**/*',
    testDir = rootDir + '/../test',
    noSpecs = ['**/*.ts', '!**/*.spec.ts'],
    withSpecs = ['**/*.ts'],
    onlySpecsJS = ['**/*.spec.js'],
    onlyJson = ['**/*.json'];

console.log("Gulp running on: \n");
console.log("rootDir: " + rootDir + "\n");
console.log("destDir: " + destDir + "\n");
console.log("testDir: " + testDir + "\n");
console.log("srcFiles: " + srcFiles + "\n");

gulp.task('list', function () {
    return gulp.src(srcFiles)
        .pipe(filter(noSpecs))
        .pipe(print());
});

gulp.task('ts-lint', ['clean-ts-src'], function () {
    return gulp.src(srcFiles)
        .pipe(filter(noSpecs))
        .pipe(tslint({ formatter: "prose" }))
        .pipe(tslint.report());
});

gulp.task('compile-ts', ['compile-ts-src', 'compile-ts-test']);
/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts-src', ['ts-lint'], function () {
    var tsResult = gulp.src(srcFiles)
        .pipe(filter(noSpecs))
        .pipe(sourcemaps.init())
        .pipe(tsProject(tsc.reporter.defaultReporter()));
    
    return merge(
            tsResult.dts,
            tsResult.js.pipe(sourcemaps.write('.', {
                // Return relative source map root directories per file.
                includeContent: false,
                sourceRoot: function (file) {
                    var sourceFile = path.join(file.cwd, file.sourceMap.file);
                    return "../" + path.relative(path.dirname(sourceFile), __dirname);
                }
            }))
    ).pipe(gulp.dest(destDir)); 
});

/**
 * Compile TypeScript test files.
 */
gulp.task('compile-ts-test', ['clean-ts-test'], function () {
    return gulp.src(srcFiles)
        .pipe(filter(withSpecs))
        .pipe(tsProjectTest(tsc.reporter.defaultReporter()))
        .pipe(gulp.dest(testDir));
});

gulp.task('copy-json', function () {
    return gulp.src(srcFiles)
            .pipe(filter(onlyJson))
            .pipe(gulp.dest(destDir));
});

gulp.task('clean-ts', function (done) {
    sequence(['clean-ts-src', 'clean-ts-test'], done);
});

gulp.task('clean-ts-src', function () {
    var typeScriptGenFiles = [destDir + '/**/*'];
    // delete the files
    return del(typeScriptGenFiles);
});

gulp.task('clean-ts-test', function () {
    var typeScriptGenFiles = [testDir + '/**/*'];
    // delete the files
    return del(typeScriptGenFiles);
});

gulp.task('dotest', function () {
    return gulp.src(testDir + '/**') 
        .pipe(filter(onlySpecsJS))
        .pipe(print())
        .pipe(jasmine({ timeout: '360000' }));
});

gulp.task('test', sequence('compile-ts-test', 'dotest'));

gulp.task('pack', ['default'], shell.task([
    'npm pack'
])
);

gulp.task('default', sequence('compile-ts', 'copy-json', 'test'));
