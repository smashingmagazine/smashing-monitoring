var items = ['http://www.bild.de','http://www.stern.de'],
	Promise = require('promise'),
	request = require('request');


var fn = function asyncMultiplyBy2(v){ // sample async action
	return new Promise(function(resolve){
		request(v,function(error,data){

			resolve(data.statusCode);
		});


	});
};
// map over forEach since it returns

var action = items.map(fn); // run the function over all items.

// we now have a promises array and we want to wait for it

var results = Promise.all(action); // pass array of promises

results.then(function(data){
	console.log(data); // [2, 4, 6, 8, 10]
});
