// spec.js
'use strict';

beforeEach(function() {
	browser.get('http://127.0.0.1:8080/');


// slow up the interactions for watching
	var origFn = browser.driver.controlFlow().execute;

	browser.driver.controlFlow().execute = function() {
		var args = arguments;

	// queue 100ms wait
		origFn.call(browser.driver.controlFlow(), function() {
		return protractor.promise.delayed(100);
	});

		return origFn.apply(browser.driver.controlFlow(), args);
	};
});

describe('Authentication capabilities', function() {
  var loginURL;
  var email = element(by.model('user.email'));
  var password = element(by.model('user.password'));
  var loginButton = element(by.id('loginSubmit'));
  var error = element(by.model('flashmessage'));
  var logout = element(by.id('logout'));

	it('should accept a valid email address and password', function() {
		loginURL = browser.getCurrentUrl();
	    // email.clear();
	    // password.clear();

	    email.sendKeys('login@heistmade.com');
	    password.sendKeys('login');
	    loginButton.click();
	    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8080/');
	  });

  // it('should redirect to the login page if trying to load protected page while not authenticated', function() {
  //   browser.get('/login');
  //   loginURL = browser.getCurrentUrl();

  //   browser.get('/overview');
  //   expect(browser.getCurrentUrl()).toEqual(loginURL);
  // });

  // it('should return to the login page after logout', function() {
  //   var logoutButton =  element(by.id('logout'));
  //   logoutButton.click();
  //   expect(browser.getCurrentUrl()).toEqual(loginURL);
  // });
});

  // it('should warn on missing/malformed credentials', function() {
  //   email.clear();
  //   password.clear();

  //   password.sendKeys('test');
  //   loginButton.click();
  //   expect(error.getText()).toMatch('missing email');

  //   email.sendKeys('test');
  //   loginButton.click();
  //   expect(error.getText()).toMatch('invalid email');

  //   email.sendKeys('@example.com');
  //   password.clear();
  //   loginButton.click();
  //   expect(error.getText()).toMatch("unauthorized request");
  // });




// describe('LoginController', function(){
// 	var userEmail = element.all(by.model('user.email')).first();
// 	var userPassword = element.all(by.model('user.password')).first();

// 	it('should enter data onscreen', function(){
// 		userEmail.sendKeys('login@heistmade.com');
// 		userPassword.sendKeys('login');
// 	})


// });


// describe('PasswordController', function() {
//   beforeEach(module('app'));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));

//   describe('$scope.grade', function() {
//     it('sets the strength to "strong" if the password length is >8 chars', function() {
//       var $scope = {};
//       var controller = $controller('PasswordController', { $scope: $scope });
//       $scope.password = 'longerthaneightchars';
//       $scope.grade();
//       expect($scope.strength).toEqual('strong');
//     });
//   });
// });

// describe('LoginController', function() {
//   beforeEach(module('field_guide_app'));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));

//   describe('$scope.grade', function() {
//     it('sets the strength to "strong" if the password length is >8 chars', function() {
//       var $scope = {};
//       var controller = $controller('PasswordController', { $scope: $scope });
//       $scope.password = 'longerthaneightchars';
//       $scope.grade();
//       expect($scope.strength).toEqual('strong');
//     });
//   });
// });