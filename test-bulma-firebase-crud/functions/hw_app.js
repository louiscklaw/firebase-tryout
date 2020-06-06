const express = require("express");
const cors = require("cors");

const vars = require(`${__dirname}/vars.js`);

const hw_app = express();

// Automatically allow cross-origin requests
hw_app.use(cors({ origin: true }));

/**
 * handle helloworld response
 */
function helloworld_res(res){
  res.send('helloworld');
}

hw_app.get("/helloworld", (req, res) => {
  helloworld_res(res);
});

module.exports = hw_app;