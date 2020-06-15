const express = require('express');
const cors = require('cors');

debug_app = express();

debug_app.use(cors({origin: true}));

debug_app.get("/echo", (req, res) => {
  res.send(req.query);
});

debug_app.post("/echo", (req, res) => {
  res.send(req.body);
});

module.exports = debug_app;
