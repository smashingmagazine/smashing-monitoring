/*global require */
var psi = require('psi');
module.exports = function (config) {
  var sites = [
    {'url': 'http://www.stern.de/', 'strategy': 'desktop','ads':true},
    {'url': 'http://mobil.stern.de/', 'strategy': 'mobile','ads':true},
    {'url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop','ads':false},
    {'url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile','ads':false}
    ],

  run = function (cb) {
	 console.log('run');
    sites.forEach(function (site) {
      psi(site.url, {'key': config.psi.key, 'strategy': site.strategy}, function (err, data) {
        psiCallback(site, err, data, cb);
      });
    });
  },


    psiCallback = function (site, err, data, cb) {
      if (err) {
        console.log(site.url + ' ' + err);
        return;
      }
      // http://stackoverflow.com/questions/11486779/formatting-isodate-from-mongodb
      data.psiUrl = data.id;
	  delete data.id;
	  data.date = new Date();
      data.url = site.url;
      data.strategy = site.strategy;
      data.ads = site.ads;
      cb(data, function () {
        console.log(data.psiUrl +' saved');
      });


    },
    psi = require('psi');

  return {
    'run': run
  }
};