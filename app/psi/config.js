/* global module */
module.exports = {
		'psiKey': 'AIzaSyBj4Ayjtf-mQo5MLbIxc-Qs_lWBI12BzZI',
		'bucketName':'speed-monitor',
		'region':'us-east-1',
		'dynamodbTableName': 'speed-monitor',
		'tenants': [
			{
				'tenantName': 'stern',
				'sites': [
					{'label':'desktop-with-ads','url': 'http://www.stern.de/', 'strategy': 'desktop'},
					{'label':'mobile-with-ads','url': 'http://mobil.stern.de/', 'strategy': 'mobile'},
					{'label':'desktop-with-ads-async','url': 'http://www.stern.de/?async=1', 'strategy': 'desktop'},
					{'label':'desktop-without-ads','url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop'},
					{'label':'mobile-without-ads','url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile'}
				]},
			{
				'tenantName': 'smashing',
				'sites': [
					{'label':'smashing','url': 'http://www.smashingmagazine.com/', 'strategy': 'desktop'},
					{'label':'smashing-mobile','url': 'http://www.smashingmagazine.com/', 'strategy': 'mobile'}
				]},
            {
                'tenantName': 'guardian',
                'sites': [
                    {'label':'guardian','url': 'http://www.theguardian.com/international', 'strategy': 'desktop'},
                    {'label':'guardian-mobile','url': 'http://www.theguardian.com/international', 'strategy': 'mobile'}
                ]},
            {
                'tenantName': 'publishers',
                'sites': [
                    {'label':'stern','url': 'http://www.stern.de', 'strategy': 'desktop'},
                    {'label':'zeit','url': 'http://www.zeit.de/index', 'strategy': 'desktop'},
                    {'label':'sz','url': 'http://www.sueddeutsche.de/', 'strategy': 'desktop'},
                    {'label':'spiegel','url': 'http://www.spiegel.de', 'strategy': 'desktop'},
                    {'label':'chefkoch','url':'http://www.chefkoch.de','strategy':'desktop'},
                    {'label':'guardian','url': 'http://www.theguardian.com/international', 'strategy': 'desktop'},
                    {'label':'tagesschau','url': 'http://www.tagesschau.de', 'strategy': 'desktop'}

                ]}
		]
};

