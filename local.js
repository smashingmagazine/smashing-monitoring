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

var path = require('path');


module.exports = {
	port: '8080',

	dataBackend: 'mongodb',

	/*
		This is the id of your project in the Google Developers Console.
	  */
	gcloud: {
		projectId: 'str-cctv'
	},


	mongodb: {
		url: 'mongodb://localhost:27017/mydb',
		collection: 'str-cctv'
	},
	psi: {
		"key": "AIzaSyBwLJimZwiW0wkClAnV5iAcv2wv2DkOxBU"
	}
};