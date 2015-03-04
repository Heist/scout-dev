'use strict';
// /test/client/directives/test-fg-report-functions.js

// TODO: read up on rootScope.

describe('factory: fg-report-functions', function(){
	var reportFunctions;

	beforeEach(module('field_guide_controls'));
	beforeEach(inject(function(_reportFunctions_) {
    	reportFunctions = _reportFunctions_;
  	}));

  	it('Should return html if UT', function(){
  		expect(reportFunctions.videoRender(''))
  	});

  	it('should return a youtube code', function(){
  		expect(reportFunctions.videoRender('http://youtu.be/WYvji5AXOfk').toBe('{youtube: http://youtu.be/WYvji5AXOfk}'))
  	});

  	it('should reorder an array of objects and set their index value', function(){

  	});
});