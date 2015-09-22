var db = require('./dynamodb');
require('./index').handler({
	fail:function(err){
		console.log(err);
	}
},{
	succeed : function(data){
		var row = data[0];
		row.related = [];
		row.related.push(data[1]);
		row.related.push(data[2]);
		row.related.push(data[3]);


		db(row);
	}
});