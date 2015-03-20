// config.js 
// Protractor configuration for end-to-end testing

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['test/public/spec.js']
	// 'browserName': 'phantomjs',
	// capabilities: {
	// 'browserName': 'phantomjs',
	// 'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
	// 'phantomjs.cli.args':['--logfile=phantom.log', '--loglevel=DEBUG']
	// }
}