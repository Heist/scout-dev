// config.js 
// Protractor configuration for end-to-end testing

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	// seleniumServerJar: 'node_modules/selenium-server/lib/runner/selenium-server-standalone-2.38.0.jar',
	specs: ['test/public/spec.js'],
	// multiCapabilities: [{
	// 	browserName: 'firefox'
	// }, {
	// 	browserName: 'chrome'
	// }]
}