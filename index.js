
const express = require("express");
const app = express();
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
  app.use(express.static(__dirname + '/'));
  app.listen(3000);