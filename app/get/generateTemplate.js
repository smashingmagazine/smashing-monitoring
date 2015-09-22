var jade = require('jade'),
	http = require('http'),
	moment = require('moment');




module.exports = function(data){

	jade.renderFile('./views/list.jade', {sites:data,'moment':moment}, function(err, html){
		console.log('eeeeeeee');
		if (err) {
			console.log(err);
		}

		http.createServer(function (req, res) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(html);
		}).listen(8002);
	});

};
