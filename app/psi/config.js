/* global module */
module.exports = {
		'key': 'AIzaSyBj4Ayjtf-mQo5MLbIxc-Qs_lWBI12BzZI',
		'bucketName':'ida-123',
		'region':'us-east-1',
		'dynamodbTableName': 'ida',
		'tenants': [
			{
				'tenantName': 'stern',
				'sites': [
					{'label':'desktop-with-ads','url': 'http://www.stern.de/', 'strategy': 'desktop', 'ads': true},
					{'label':'mobile-with-ads','url': 'http://mobil.stern.de/', 'strategy': 'mobile', 'ads': true},
					{'label':'desktop-without-ads','url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop', 'ads': false},
					{'label':'mobile-without-ads','url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile', 'ads': false}
				]},
			{
				'tenantName': 'smashing',
				'sites': [
					{'label':'smashing','url': 'http://www.smashingmagazine.com/', 'strategy': 'desktop', 'ads': true},
					{'label':'smashing-mobile','url': 'http://www.smashingmagazine.com/', 'strategy': 'mobile', 'ads': true}
				]},
            {
                'tenantName': 'bildi',
                'sites': [
                    {'label':'home','url': 'http://www.bild.de/', 'strategy': 'desktop', 'ads': true}

                ]}
		]
};

