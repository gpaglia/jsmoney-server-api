'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';
        this.dist = './dist';
        this.test = './test';
        this.allJavaScript = [this.dist + '/**/*.js'];
        this.allTypeScript = this.source + '/**/*.ts';
        this.allTypeScriptNoSpecs = [this.source + '/**/*.ts', '!' + this.source + '/**/*.spec.ts']

    }
    return gulpConfig;
})();
module.exports = GulpConfig;