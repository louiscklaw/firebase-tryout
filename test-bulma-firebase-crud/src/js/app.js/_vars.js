
var helloworld = 'helloworld';

var API_BASE_PATH = 'http://localhost:5001/test-bulma-firebase-crud/us-central1';

var METHOD_POST = { method: 'POST' };
var METHOD_PUT = { method: 'PUT' };
var METHOD_DELETE = { method: 'DELETE' };
var HEADERS_JSON = { headers: { 'Content-Type': 'application/json' } };

var ENV_DEBUG = true;

var record_fields = ['team', 'pld', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts' ];

var operations = ['details','edit','delete'];