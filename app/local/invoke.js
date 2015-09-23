setInterval(function(){
    require('https').get('https://1sq5ydx7kf.execute-api.us-east-1.amazonaws.com/prod/',function(res){
        console.log(res.statusCode);
    });
},10000);
