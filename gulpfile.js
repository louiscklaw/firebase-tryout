// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename --save -D
const {
    src,
    dest,
    parallel,
    series
} = require( 'gulp' );
const pug = require( 'gulp-pug' );
const less = require( 'gulp-less' );
const minifyCSS = require( 'gulp-csso' );
const concat = require( 'gulp-concat' );

const rename = require( 'gulp-rename' );
const javascriptObfuscator = require( 'gulp-javascript-obfuscator' );

const debug = require( 'gulp-debug' );

const PROJ_HOME = `${__dirname}`;
const SRC_DIR = `${PROJ_HOME}/src`;

const PAGES_DIR = `${SRC_DIR}/pages`;
const JS_DIR = `${PAGES_DIR}/js`;
const CSS_DIR = `${PAGES_DIR}/css`;

const BUILD_DIR = `${PROJ_HOME}/build`;

console.log( SRC_DIR );

function html() {
  return src( `${PAGES_DIR}/*.pug` )
        .pipe(debug())
        .pipe( pug() )
        .pipe( dest( BUILD_DIR ) )
}

function css() {
    return src( `${CSS_DIR}/*.less` )
        .pipe( less() )
        .pipe( minifyCSS() )
        .pipe( dest( 'build/css' ) )
}

function js() {
    return src( `${JS_DIR}/*.js`, {
            sourcemaps: true
    } )
        .pipe(debug())
        .pipe( concat( 'app.min.js' ) )
        .pipe( dest( `${BUILD_DIR}/js`, {
            sourcemaps: true
        } ) )
}

function js_compress() {
    return src( './build/js/app.js' )
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
exports.default = parallel( html, js, css );
