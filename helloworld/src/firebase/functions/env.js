const path = require("path");

var PROJ_HOME = path.join( __dirname, "../../.." );
var SRC_HOME = path.join( PROJ_HOME, "src" );
var FIREBASE_HOME = path.join( SRC_HOME, "firebase" );
var FUNCTION_HOME = path.join( FIREBASE_HOME, "functions" );

module.exports = {
  PROJ_HOME: PROJ_HOME,
  SRC_HOME: SRC_HOME,
  FIREBASE_HOME: FIREBASE_HOME,
  FUNCTION_HOME: FUNCTION_HOME
};
