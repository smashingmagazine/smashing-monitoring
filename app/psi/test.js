runAllSites([]).done(function (data) {
    var tenantName = tenant.tenantName;
    data = mapRelated(data);
    data.tenant = tenantName;
    // Ergebnis speichern
    dynamoDb.saveSite(data)
        // alle Ergebnisse holen
        .then(dynamoDb.getSites)
        // CSV erzeugen
        .then(function (data) {
            csv(data)
                .then(compress)
                .then(uploadCsv);
            return new Promise.resolve(data);
        },function(err){
            console.log(err);
        })
        .then(function(data){
            template.rows(dataMapping.getLastRow(data)).then(compress).then(function(rows){
                uploadTemplate('rows.html', rows);
            },function(err){
                console.log(err);
            });
            return template.index(data);
        },function(err){
            console.log(err);
        })

        // gzippen
        .then(compress)
        // zu S3 hochladen
        .then(function (html) {
            return uploadTemplate('index.html', html);
        })
        .then(context.succeed, context.fail);
},context.fail);