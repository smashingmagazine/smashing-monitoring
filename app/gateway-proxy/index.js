var AWS = require('aws-sdk'),
    params = {
        FunctionName: 'cctv', /* required */
        InvocationType: 'Event',
        LogType: 'None'
    },
    lambda;
AWS.config.update({region: 'us-east-1'});
lambda = new AWS.Lambda();

exports.handler = function (event, context) {
    lambda.invoke(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    context.succeed('lambda called');

};