

var AWS = require('aws-sdk'),
    dyn,
    config = require('../psi/config')(),
    params;


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();
dyn.query({
    TableName: config.dynamodbTableName,
    IndexName: 'date',
    KeyConditions: {
        date: {
            ComparisonOperator: "EQ"

        }
    },
    ScanIndexForward: false
}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});

