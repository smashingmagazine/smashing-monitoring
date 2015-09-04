/*
	Copyright 2015, Google, Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
"use strict";

var path = require('path'),
	express = require('express'),
	config = require('./config'),
	app = express();




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', true);
app.locals.moment = require('moment');


// Books
var model = require('./model/model-mongodb')(config);
var psi = require('./psiScore/psi')(config);


app.get('/',function(req,res){
  res.set('Content-Type', 'text/html');
  model.list(100, '','http://www.stern.de/',
    function(err, entities) {
      if (err) return true;
      res.render('list.jade', {
        sites: entities
      });
    }
  );
});

/*app.get('/run', function (req, res) {
  psi.run(model.create);
  res.status(200).send('ok!');
});*/


// Basic error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Start the server
var server = app.listen(config.port, '0.0.0.0', function () {
  console.log('App listening at http://%s:%s MongoDB:%s', server.address().address, server.address().port,config.mongodb.url);
  console.log("Press Ctrl+C to quit.");
});

(function(){
  setInterval(function() {
	  psi.run(model.create);
  },600000);
})();