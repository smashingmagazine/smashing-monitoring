require('./index').handler({},{succeed:function(message){
    console.log(message);
},'error':function(){}});