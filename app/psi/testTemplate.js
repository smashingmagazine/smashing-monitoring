
var fs = require('fs'),
    dummy = JSON.parse(fs.readFileSync('../../dist/dummy.json'));
require('./generateTemplate')(dummy);