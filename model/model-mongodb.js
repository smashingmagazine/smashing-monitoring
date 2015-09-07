"use strict";

var MongoClient = require('mongodb').MongoClient;



module.exports = function(config) {

  var url = config.mongodb.url,
      collectionName = config.mongodb.collection;


  function fromMongo(item) {
    if (item.length) item = item.pop();
    item.id = item._id;
    delete item._id;
    return item;
  }




  function getCollection(cb) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      cb(null, db.collection(collectionName));
    });
  }


  function list(limit, token, url, cb) {
    token = token ? parseInt(token, 10000) : 0;
    getCollection(function(err, collection) {
      if (err) return cb(err);
      collection.find({'url':url})
        .sort({'date':-1})
        .skip(token)
        .limit(limit)
        .toArray(function(err, results) {
          if (err) return cb(err);
          cb(null, results.map(fromMongo), results.length === limit ? token + results.length : false);
        });
    });
  }

  function create(data, cb) {
    getCollection(function(err, collection) {
      if (err) return cb(err);
      collection.insert(data, {w: 1}, function(err, result) {
        if (err) return cb(err);
        var item = fromMongo(result.ops);
        cb(null, item);
      });
    });
  }




  return {
    create: create,
    list: list
  };

};
