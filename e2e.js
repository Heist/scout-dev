// config.js 
// Protractor configuration for end-to-end testing

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['/test/public/spec.js']
}