## Scout-dev

This is the development git for Scout, a private Heist project to do qualitative analysis and validation with users. 

Scout helps you find the way through your validation process to a better design.

## Motivation

This is for someone other than the developer to sort out, my motivation for this role is _pretty_ clear.

## Installation

Install *MongoDB* and *Node.js* locally.

Clone this repo into your favoured project directory. $> = at the terminal line.

```
$> cd scout-dev
$> npm install
$> node server
```

## Database How-To

**To Take A Backup:**

from your command line, within $> scout-dev:

-- mkdir yourNewDir && cd yourNewDir
-- mongodump --db scoutApp ( this takes a backup of the database )


**To Wipe Your Local Database:**

from your command line, anywhere

-- mongo (mongo should do something to your command line)
-- use scoutApp
-- db.dropDatabase();

control-C to exit Mongo.


**To Restore The DB from A Dump:**

$> cd yourNewDir/dump
$> mongorestore --port 27017 scoutApp

That will build out whatever was in your DB when you took an earlier backup.


**Is Mongo instantly quitting on $> mongod?**

1. Try running '$> mongod --repair'


## Application Structure
```
|- app						<< *THE BACK END* of the app
	|- models	  			<< where the Mongoose models live.
		|- session.js 		<< this is the _only model we touch_, right now.
		| >>>> all of the below are for cleanliness/future dev sake.
		|- flow.js
		|- message.js
		|- step.js
		|- test.js
	|- *routes.js* 			<< *all our database routes in ugly pile. This is v. important.*

|- bower_components 		<< things installed using bower, pls. to not touch directly.
|- config
	|- db.js 				<< the database connection file, for modification when pushed to Modulus
|- node_modules 			<< where Node.js things live, pls. to not touch directly.
|- public					<< THE FRONT END of the app
	|- assets				<< things Tom made that aren't CSS, I never go here.

	|- css					<< Scout CSS, etc.
		|- scout.css
	|- fonts				<< maybe some letter things I hear they're great

	|- js					<< front-end app brains!
		|- libs				<< AngularJS and AngularUI for now
		|- *moderator.js* 	<< *the app brain*

	|- partials				<< html bits
		|- reference and other << leftovers
		|- flow.html 		<< *edit* the flow, add steps and questions
		|- overview.html 	<< add Tests, add flows to Tests
		|- run.html 		<< run a test - also called "active"
		|- test.html 		<< durr what. not even a thing.

	|- reference			<< where I've been hiding references for partials
	|- index.html 			<< this loads all contents of /libs/ and a bunch of CDN stuff and wraps 
.gitignore 					<< what Git doesn't store
package.json 				<< /node_module 's source list
Procfile 					<< for Heroku
README.md 					<< this file
*server.js* 				<< The main application file which does surprisingly little.
```

## API/Database Reference

Scout posts its DB calls to /api/ as a base URL, which is presently _public_, which is why Scout is not on Heroku right now.

/:sessionID gets your current test list
/:sessionID/flow/:flowID does various things to flows within a session
/:sessionID/test/:testID is the SESSION, which is unique, and the session's test ID.

A Test ID is used in reporting to collect all sessions associated with that test ID.
A Test's sessions share flows and steps, but are intended to have unique users, as well as possessing an _enforced_ unique _id. 

Each Session is a document in our MongoDB, which is addressed by Mongoose because sometimes schemas make things nicer.

Pretty much all actions in Scout take place on a single Session document at a time, which stores all things related to itself. This will change as we move into reporting.

## API/Angular Reference 
Front-end routes are different than back-end routes. In Scout, we're making use of Angular-UI, a third party library that provides nested views and stateful routing, which I don't really use but may be handy in future and are certainly clean.

Back end routes to the DB are _passed_ from moderator.js - the $scope definition file for Angular - to routes.js, which is the Mongoose frontend for our database.

When something gets .put in moderator.js (via whatever partials/xxx.html), it goes to the db via routes.js.

## ToDo Long Term

These are things that will make the code base more maintainable and less of a rat's nest. It's functional! Now it should be clean, etc.

1. controllers should be separated and reincluded from moderator.js as they are finished.
2. models in mongoose should be separated and reincluded as well.
3. Before this goes up on Heroku, there will need to be authentication.
4. Profit.

