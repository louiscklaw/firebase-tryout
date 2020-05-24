// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename gulp-debug gulp-order --save -D
const { src, dest, parallel, series } = require("gulp");
const { exec } = require("child_process");

const pug = require("gulp-pug");
const less = require("gulp-less");
const minifyCSS = require("gulp-csso");
const concat = require("gulp-concat");

const rename = require("gulp-rename");
const javascriptObfuscator = require("gulp-javascript-obfuscator");

const debug = require("gulp-debug");
const order = require("gulp-order");

const PROJ_HOME = `${__dirname}`;
const SRC_DIR = `${PROJ_HOME}/src`;
const BUILD_DIR = `${PROJ_HOME}/build`;
const PUBLIC_ROOT = `${PROJ_HOME}/public`;

const cp = require('child_process');

function clean() {
  return exec(`rm -rf BUILD_DIR`);
}

function html() {
  return src(`${SRC_DIR}/pages/*.pug`)
    .pipe(debug())
    .pipe(pug())
    .pipe(dest(PUBLIC_ROOT));
}

function css() {
  return src(`${SRC_DIR}/less/*.less`)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest(`${PUBLIC_ROOT}/css`));
}

function get_js_dir(){
  return cp.execSync('find src/js/*.js -type d')
    .toString()
    .split('\n')
    .map(dir => dir.replace('src/js/',''))
    .filter(x => x != '');
}

function make_js_files(done) {
  get_js_dir()
  .forEach(js_filename => {
    src([`${SRC_DIR}/js/${js_filename}/*.js`], {
      sourcemaps: true
    })
      .pipe(concat(js_filename))
      .pipe(
        dest(`${PUBLIC_ROOT}/js`, {
          sourcemaps: true
        })
      );
  });
  cp.execSync('rsync -r src/firebase_auth public/js/');
  return done();
}

function js_compress() {
  return src(`${PUBLIC_ROOT}/js`)
    .pipe(
      javascriptObfuscator({
        compact: true
      })
    )
    .pipe(rename("app.min.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("build/js"));
}

function make_public_directory(done){
  cp.execSync('mkdir -p public');
  return done();
}

// exports.js = app_js;
exports.css = css;
exports.html = html;
exports.default = series(
  make_public_directory,
  parallel(
    html,
    make_js_files,
    css
  )
);
