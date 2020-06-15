// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename gulp-debug --save -D
const { src, dest, parallel, series } = require( 'gulp' );
const { exec } = require('child_process');

const pug = require( 'gulp-pug' );
const less = require( 'gulp-less' );
const minifyCSS = require( 'gulp-csso' );
const concat = require( 'gulp-concat' );

const rename = require( 'gulp-rename' );
const javascriptObfuscator = require( 'gulp-javascript-obfuscator' );

const debug = require( 'gulp-debug' );
const order = require( 'gulp-order' );

const PROJ_HOME = `${__dirname}`;
const SRC_DIR = `${PROJ_HOME}/src`;
const BUILD_DIR = `${PROJ_HOME}/build`;
const PUBLIC_ROOT = `${PROJ_HOME}/public`;

function clean() {
    return exec(`rm -rf BUILD_DIR`);
}

function html() {
    return src( `${SRC_DIR}/*.pug` )
        .pipe( debug())
        .pipe( pug() )
        .pipe( dest( PUBLIC_ROOT ) )
}

function css() {
    return src( 'client/templates/*.less' )
        .pipe( less() )
        .pipe( minifyCSS() )
        .pipe( dest( 'build/css' ) )
}

function js() {
    return src( `${SRC_DIR}/js/*.js`, {
            sourcemaps: true
    } )
        .pipe( order( [
            '_vars.js',
            '_common.js',
            '*.js'
        ]))
        .pipe( concat( 'app.js' ) )
        .pipe( dest( `${PUBLIC_ROOT}/js`, {
            sourcemaps: true
        } ) )
}

function js_compress() {
    return src( `${PUBLIC_ROOT}/js` )
        .pipe( javascriptObfuscator( {
            compact: true
        } ) )
        .pipe( rename( 'app.min.js' ) )
        .pipe( sourcemaps.write() )
        .pipe( dest( 'build/js', ) )
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(
    html,
    js
);
