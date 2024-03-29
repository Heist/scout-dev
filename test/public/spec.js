// spec.js
'use strict';

beforeEach(function() {
	browser.get('http://127.0.0.1:8080/');


// slow up the interactions for watching
	// var origFn = browser.driver.controlFlow().execute;

	// browser.driver.controlFlow().execute = function() {
	// 	var args = arguments;

	// // queue 100ms wait
	// 	origFn.call(browser.driver.controlFlow(), function() {
	// 	return protractor.promise.delayed(100);
	// });

	// 	return origFn.apply(browser.driver.controlFlow(), args);
	// };
});

describe('Authentication capabilities', function() {
  var loginURL;
  var email = element(by.model('user.email'));
  var password = element(by.model('user.password'));
  var loginButton = element(by.id('loginSubmit'));
  var error = element(by.model('flashmessage'));
  var logout = element(by.id('logout'));
  var loginURL;

	it('should accept a valid email address and password', function() {
		loginURL = browser.getCurrentUrl();
	    // email.clear();
	    // password.clear();

	    email.sendKeys('login@heistmade.com');
	    password.sendKeys('login');
	    loginButton.click();
	    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8080/');
	  });

	it('should return to the login page after logout', function() {
	    var logoutButton =  element(by.id('logout'));
	    logoutButton.click();
	    expect(browser.getCurrentUrl()).toEqual(loginURL);
	  });

	it('should redirect to the login page if trying to load protected page while not authenticated', function(){
		browser.get('http://127.0.0.1:8080/overview');
		expect(browser.getCurrentUrl()).toEqual(loginURL);
	});

	it('should reject poorly-formed credentials', function(){
		email.sendKeys('login@');
	    password.sendKeys('test');
	    loginButton.click();
	    expect(browser.getCurrentUrl()).toEqual(loginURL);
	});
});

describe('Onboard Controller', function(){
	// get api test
	// overview stage one
	// overview stage two
	// overview stage three-six is in Run -
	// overview seven to nine is in Summary
})

describe('Overview Screen', function(){
	// check for a user in rootscope by scope injection
	// try adding a new test
	// check the location path
	// set the number of tests
	// go back to the test screen
	// tests should equal previous tests plus one
	// click edit edit should take one to the test edit screen
	// return to main screen
	// click report of the element called developer tests
	// report should take you to the summary screen
	// click delete, refresh screen
	// delete should remove the test that was deleted
	// click duplicate
	// duplicate should result in two tests with the same name and same number of sub-objects
})

describe('Test Editing', function(){
	// from overview click edit
	// edit should take you to main screen
	// anchor should be step 1
	// selecting interview or prototype should display appropriate value
	// setting information on those fields should store that information
	// clicking Add Tasks should take you to step 2

	// adding three tasks should result in five tasks

	// clicking the up button should result in the task list being reordered
	// exit to main screen, come back, and test task list order

	// clicking the down button should result in the task list being reordered
	// exit to main screen, come back, and test task list order

	// clicking "done" should take one to the overview screen

	// there should be no option to "run" unless tasks exist.
})

describe('Summary Controller', function(){
	// from overview
	// click report on developer test
	// report url should equal report url

	// left nav should have six elements
	// on clicking the down button for the element "summary" the second entry
	// should be "summary"
	// and the rest should be six entries all in order

	// on refresh the second element should remain in the same order
	// on entering data in the summary field, then clicking out, then clicking back
	// the summary field should still be set

	// on clicking "share" the report link should have a /p/ in it and be populated

	// on clicking the visibility of any element in the left nav
	// then clicking the report
	// that element should not be present in the left nav

	// each entry should have messages associated with them
	// messages should be listed under a user name
	// on clicking visible, the message should disappear on switching to preview

	// adding a message should work to nest a new message under user
	// adding a new message with a new tag should result in that tag turning up on the left nav
	// clicking on the new tag should show a message under a user with that message's content
	// and all other tags beneath the message

	// clicking on the eyeglasses should return to overview
})

describe('Run Controller', function(){
	//from overview, click run test
	// loading in a user should set the user

	// clicking cancel should return one to overview
	
	// dry run should not add a user to the test, 
	// and should permit the test to be run without the user

	// adding a message should push that message to the timeline

	// clicking "exit test" should send the test to the overview page
})

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