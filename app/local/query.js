

var AWS = require('aws-sdk'),
    db,
    config = require('../psi/config');



AWS.config.update({region: 'us-east-1'});
db = new AWS.DynamoDB();
db.listTables(function(err, data) {
    //console.log(data.TableNames);
});

var table = new AWS.DynamoDB({params: {TableName: 'str'}});
var key = 'UNIQUE_KEY_ID';

// Write the item to the table

    table.getItem({Key:{'uuid':{ "S": 'werw' },'timestamp':{'N':'123'}}}, function(err, data) {
        console.log(data);
        //console.log(err); // print the item data

});