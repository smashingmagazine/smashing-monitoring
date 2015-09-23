'use strict';
require('./index').handler({},{
	fail:function(err){
		console.log(err);
	},
	succeed : function(message){
		console.log('success');
	}
});