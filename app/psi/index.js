var config = require('./config'),
    psi = require('./psiWrapper'),
    Promise = require('promise'),
    csv = require('./csv'),
    dynamoDb = require('./database/dynamoDb'),
    mapPsiData = require('./psiWrapper/mapPsiData'),
    mapRelated = require('./psiWrapper/mapRelated'),
    template = require('./template'),
    uploadTemplate = require('./upload/uploadTemplate'),
    uploadCsv = require('./upload/uploadCsv'),
    dataMapping = require('./dataMapping'),
    compress = require('./compress'),
    uploadScreenshot = require('./upload/uploadScreenshot');


exports.handler = function (event, context) {
    'use strict';
    var tenants = config.tenants,


        runAllSites = function (tenant) {
            return Promise.all(function(){
                var arr = [];
                tenant.sites.forEach(function(site){
                    arr.push(runSite(tenant.tenantName,site))
                });
                return arr;
            }());
        },

        runAllTenants = function (tenants) {
            return Promise.all(function () {
                var arr = [];
                tenants.forEach(function (tenant) {

                    var p = new Promise(function (fulfill, reject) {
                        runAllSites(tenant).done(function (data) {
                            console.log(tenant.tenantName);
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
                                        .then(function(csvData){
                                            return uploadCsv(tenantName,csvData);

                                        })
                                        .then(function(){

                                        },function(err){
                                            reject(err);

                                        });
                                    return new Promise.resolve(data);
                                    // keine Error handling!!


                                }, function (err) {
                                    console.log(err);
                                })
                                .then(function (data) {

                                    data.tenant = tenantName;
                                    template.rows(data).then(compress).then(function (rows) {
                                        uploadTemplate(tenantName,'rows.html', rows);
                                    }, function (err) {
                                        console.log(err);
                                    });

                                    return template.index(tenantName, data);
                                }, function (err) {
                                    console.log(err);
                                })

                                // gzippen
                                .then(compress)
                                // zu S3 hochladen
                                .then(function (html) {
                                    return uploadTemplate(tenantName,'index.html', html);
                                })
                                .then(function () {
                                    fulfill({});
                                }, reject);
                        }, reject);
                    });
                    arr.push(p);


                });
                return arr;
            }());
        },


        runSite = function (tenant,site) {
            return new Promise(function (resolve) {
                psi(site)
                    // Ergebnis mappen (müsste kein Promise haben)
                    .then(function (data) {
                        return mapPsiData(site, data);
                    })
                    // Screenshot hochladen
                    .then(function(site){

                        return uploadScreenshot(tenant,site);
                    })
                    .then(function () {
                        resolve(site);

                    }, function (err) {
                        console.log(err);
                    });

            });

        };


    runAllTenants(tenants).done(function (data) {
        console.log('all done');


    }, function (err) {
        console.log(err);
    });


};

