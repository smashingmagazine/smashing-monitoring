require('./dynamodb').run({'fail':function (err) {
	'use strict';
	console.log(err);
},'succeed':function(message){
	'use strict';
	//console.log(message);
}});