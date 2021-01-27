const express = require('express');
const bodyParser = require('body-parser');

const loaders = require('./loaders/index');

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

require('./modules/users');

loaders.initialize();

process.on('unhandledRejection',function(err){
  console.log('-------------->',err);
  process.exit(1);
});
