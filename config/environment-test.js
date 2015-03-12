// environment-test.js
// a small function to find an environment and return it by ip.address
'use strict';

module.exports = function(){
	var net = require('os').networkInterfaces();
	var list = function(ifaces){
		var address;
		Object.keys(ifaces).forEach(function (ifname) {
			var alias = 0;

			ifaces[ifname].forEach(function (iface) {
				if ('IPv4' !== iface.family || iface.internal !== false) {
				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
					return;
				}
				address = iface.address;
			});
		});
		return address;
	};
	
	var str = list(net).split('.');
	return (str[0].length > 2) ? 'production' : 'test';
}