
const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '/index.html'));
});
  app.use(express.static(__dirname + '/'));
  app.listen(3000);
  console.log('Server started at http://localhost:' + port);