// debug
require('./index').handler({},{'succeed':function(msg){
	'use strict';
	console.log(msg);
	console.log('context succeed 🎉');
},'fail':function(err){
	'use strict';
	console.log(err);
	console.log('context err');
}});