'use strict';
// /test/overview.js

// TODO: read up on rootScope.

describe('overview', function(){
	beforeEach(module('field_guide_controls'));

	describe('initialization', function(){
		var scope;
		var controller;
		var $httpBackend;

		beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
			$httpBackend = _$httpBackend_;
			// underscores are magic in ngMock documentation

			scope = $rootScope.$new();
			controller = $controller('overview', {$scope:scope}); 
			$httpBackend.when('GET', '/api/session/')
				.respond([{thing: 1},{thing: 2},{thing: 3}]);
			// this creates the overview controller and 
			// sets the scope to the one used in the test.
		}));

		it('delivers sessions for initialization', function(){
			$httpBackend.flush();
			expect(scope.sessions).toEqual([{thing: 1},{thing: 2},{thing: 3}]);
			expect(scope.selected).toEqual({thing: 1});
		});
	});

	describe('$scope.select', function(){
		var scope;
		var controller;

		beforeEach(inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			controller = $controller('overview', {$scope:scope}); 

		}));

		it('sets displayed element of the page to being the working element selected', function(){
			expect(scope.selected).toBe(undefined);
			scope.select('a known value');
			expect(scope.selected).toBe('a known value');
		});


	});
});