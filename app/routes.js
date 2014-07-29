// routes.js
var express = require('express');
var router = express.Router();  // get an instance of the express Router
var util = require('util');
var mongoose = require('mongoose'); // so we can generate ObjectIDs for tests

// load models for routes
// var Step 	= require('./models/step');
// var Flow 	= require('./models/flow');
var Session = require('./models/session');
var Summary = require('./models/summary');

// small useful functions =====================================================

// sorts an array of objects by key.
function keysrt(key,desc) {
  return function(a,b){
   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}


// console logging =====================================================

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// backend routes ======================================================

// get/post to /api routes.
router.route('/')
	// this returns all sessions in the DB. Sessions are our basic document unit.
	// it is important for testing that a basic call results in a dump.
	.get(function(req, res) {
			Session.find(function(err, sessions) {
				if (err)
					res.send(err);

				res.json(sessions);
			});
		})
	// this needs to *only* be touched when creating a new Session, not a new test.
	// sessions cannot be individually deleted until reporting.
	.post(function(req, res){
			var session = new Session(); // here is where all that save stuff is happening
 			
 			session.name = 'New Session';
 			session.testKey = req.body.testKey;		

			console.log(req.body);      // your JSON
  			res.send(req.body);  		// echo the result back
			 			
 			session.save(function(err) {
				if (err)
					res.send(err);

				Session.find({}, function(err, session) {
					if (err)
						res.send(err);
					res.json(session);
					console.log(session.length)
				});
			});
		});



	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			

// TEST routes =========================================================

// routest for returning test sets - return all sessions.
// on front end, remove sessions that are not models, but count them.
router.route('/test/')
	.get(function(req,res){
		console.log('touched /test');
		Session.find({}, function(err, test) {
				if (err)
					res.send(err);
				res.json(test);
			});
	})

	// controller addTest uses this
	.post(function(req,res){
		var ptype = new Session();		

		ptype.name 		= 'Prototype';
		ptype.testKey 	= req.body.testKey; // reminder: this has to live on the front end. flows.
		ptype.ismodel	= req.body.ismodel;

		ptype.save(function(err) {
				if (err)
					res.send(err);

				Session.find({}, function(err, session) {
					if (err)
						res.send(err);
					res.json(session);
					console.log('I have added and saved a session');
				});
		});

	});

// /test/testId routes:
// add a new session to the db with .post
// add a flow to a test with .put (controller AddAFlow)
// TODO remove all sessions with test-id test .delete 
router.route('/test/:testId')
	// route for adding a test to a db - 
	// testId is actually a front-end randomly generated number
	// _not_ an ObjectID at all. This is why it works.
	.post(function(req,res){
		Session.findOne({'testKey':req.params.testId, 'ismodel' : true}).exec(
    		function(err, session) {
   
    			session._id = undefined;
        		
        		var s1 = new Session( session );
        		var id = mongoose.Types.ObjectId();

        		console.log('this is your session '+session.flows);
    			
    			s1.ismodel = false;
    			s1._id = id;
    			
    			s1.save(function(err, data) {
					if (err)
						res.send(err);
					res.json(data);
					console.log('new session created '+data);
				});
  		 	 }
		);
	})
	// route for adding flows to tests
	// needs to return values to the front end or you can't edit them.
	// controller addAFlow uses this
	.put(function(req,res){
		Session.findOne({'testKey': req.params.testId, 'ismodel':true}, function(err, session) {
				if (err)
					res.send(err);
				
				if (req.body.flow){
					console.log('touched req.body.flow singular');
					var sub_doc = session.flows.create(req.body.flow);
					session.flows.push(sub_doc); // adds new flow to session in play
				}

			// save the session object 'test' - this is not returning anything about the flow _id.
			session.save(function(err, data) {
				if (err)
					res.send(err);

				console.log('new flow data '+ data);
				// pass the session data object to the front end?
				res.json( data );
			});
		});
	})
	.delete(function(req, res) {
		console.log(req.params.testId);
		Session.remove({
			'testKey': req.params.testId
		}, function(err, session) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted all tests with '+req.params.testId });
		});
	});

// Do functions on a single session within a test- add usernames in active, 
// get a single new session, delete a single specific session
router.route('/test/:testId/session/:sessionId')
	.get(function(req,res) {
			Session.findById(req.params.sessionId, function(err, session) {
				if (err)
					res.send(err);
				console.log('touched /:sessionId');
				res.json(session);
			});
		})
	.put(function(req, res) {
		// put is used both in active sessions to apply usernames.
		// put only puts updates to individual sessions, not test sets
		Session.findById(req.params.sessionId, function(err, session) {

			if (err)
				res.send(err);
			
			if (req.body.user){
				session.user = req.body.user;
				console.log('new user', session.user);
			}
			else {
				session.flows.id(req.body._id).remove();
				session.flows.push(req.body);
				console.log('flow updated',(util.inspect(session.flows.id(req.body._id), {showHidden: false, depth: null})));
				
			}
			// save the session object - this is not saving anything about the flow _id.
			session.save(function(err) {
				if (err)
					res.send(err);
				res.json( req.body );
			});
		});
	})
	.delete(function(req, res) {
		Session.remove({
			_id: req.params.sessionId
		}, function(err, session) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// Add and remove steps from flows in tests
router.route('/test/:testId/session/:sessionId/flow/:flowId')
	.get(function(req,res) {
		Session.findById(req.params.sessionId, function(err, session) {
			if (err)
				res.send(err);
		var flow = session.flows.id(req.params.flowId);
		res.json(flow);
		console.log(flow);
		console.log('touched flow');
		});
	})
	.put(function(req, res) {
		var query = { _id : req.params.flowId}
		var flow = req.body.flow;

		console.log('touched flow update');
		// console.log('_id', query);
		// console.log('flow', flow);

		Session.findById(req.params.sessionId, function(err, session) {
			if ( query = flow._id){
				console.log('touched put flow');
				session.flows.id(query).remove();
				session.flows.push(flow); 
			}

			session.save(function(err) {
				if (err)
					res.send(err);

				res.json( req.body );
			});
		})
	})
	.delete(function(req, res) {
		console.log(req.params.flowId);
		
		Session.findById(req.params.sessionId).exec(
    		function(err, session) { 
    			if (session.flows.id(req.params.flowId)){
    			console.log('found');
    			session.flows.id(req.params.flowId).remove();

    			session.save(function(err) {
						if (err)
							res.send(err);
						
						res.json(session);				

				});

    			}
   			}
		);
	});
// a route for generating a new summary from an existing collection of flows.
router.route('/test/:testId/flow/:flowName')
	.get(function(req,res) {
		console.log('touched flowcollector');
		
		// .find returns an array []
		Session.find({'testKey' : req.params.testId}, function(err, data) {
				if (err)
					res.send(err);
				
				var flowcollector = {};
					flowcollector.flows = [];
			

			// this gathers and sorts similar flows from the returned
			// session array[].
				for (var i = 0; i < data.length -1 ; i++){
					for (var j = 0; j < data[i].flows.length; j++){
						var name = data[i].flows[j].title;
						name = name.replace(/ /g,'');

						if (name === req.params.flowName){
							var pushdata = data[i].flows[j];
							flowcollector.flows.push( pushdata );
						}
					}
				}
				console.log('flowcollector flows '+flowcollector.flows.length);
				

		// Let's organize these flows into something worth having

            // early experiments in appropriate data structures.

            function step(name, messages){
                this.name = name;
                this.messages = messages;
            }

            var stepcollector = [];
            var stepnamecheck = [];
            var counter;
            var flowname = flowcollector.flows[0].title;
            
            // this finds all messages in all steps in the stack and pushes them up
            for (var j = 0; j < flowcollector.flows.length; j++){
                var name = flowcollector.flows[j].title;
                name = name.replace(/ /g,'');

                for (var k = 0;  k < flowcollector.flows[j].steps.length; k++){
                    var step = flowcollector.flows[j].steps[k];
                    var name = step.title;                    
                    if (!(stepnamecheck.indexOf(name) != -1)){
                        stepnamecheck.push(name);
                        stepcollector.push({name : name, session_by_user : [], pass_fail : false, summary: step.summary });
                    } else if (stepnamecheck.indexOf(name) != -1){
                        for ( var l in stepcollector){
                            if (name == stepcollector[l].name){

                                var pusher = {'user' : flowcollector.flows[j].user_id, 'messages' : flowcollector.flows [j].steps[k].messages }
                                stepcollector[l].session_by_user.push(pusher);
                            };
                        }
                    }
                }
            }

            // console.log('stepcollector after message collection', stepcollector )

            // the tagstripper and reorganizer
            var tagcollector = [];
            var tagnamecheck = [];
            for (var i in stepcollector){
                for (var j = 0 ; j < stepcollector[i].session_by_user.length; j ++){
                    for (var k = 0 ; k < stepcollector[i].session_by_user[j].messages.length; k++){
                        for (var l = 0; l < stepcollector[i].session_by_user[j].messages[k].tags.length; l++){
                            if(!(tagnamecheck.indexOf(stepcollector[i].name) != -1)){
                                tagnamecheck.push(stepcollector[i].name);

                                // console.log('checking to see if tags are already visible/no', stepcollector[i].session_by_user[j].messages[k].tags[l] )
                                
                                var tagMaker = stepcollector[i].session_by_user[j].messages[k].tags[l];
                                tagcollector.push({name : stepcollector[i].name, tags : [ tagMaker ] });
                                
                            }else if (tagnamecheck.indexOf(stepcollector[i].name) != -1){
                                for (var m in tagcollector){
                                    if (stepcollector[i].name == tagcollector[m].name){

                                        var tagMaker = stepcollector[i].session_by_user[j].messages[k].tags[l];
                                        tagcollector[m].tags.push(tagMaker);
                                    }
                                }
                            }
                        }    
                    }
                }
            }

            var tags_for_flow = [];
            // integrate tags to stepcollector for a clean object
            for (var i in stepcollector){
                for (var j in tagcollector){
                    if (stepcollector[i].name == tagcollector[j].name ){
                        // get all tags per step and post to stepcollector.tags
                        // this should push to the flow itself for a count later on.
                        // console.log('tagcollector j', tagcollector[j])

                        var tags = tagcollector[j].tags;
                        tags.sort();
                        // console.log('tags', tags.length ,JSON.stringify(tags));
                        // stepcollector[i].tags = tags;

                        // de-dupe array, then post to tags_single
                        //  so we summarize and visible.
                        var tagDupe = [];
                        var tagCount = 0;
                        var curTag = null;

                        for (var k = 0; k < tags.length +1; k++){
                            if (tags[k] != curTag){     
                                if (tagCount > 0) {
                                    tagDupe.push({body: curTag.replace(/#/gi,''), count : tagCount});
                                }

                                curTag = tags[k];
                                tagCount = 1;
                            } else {
                                tagCount++;
                            }
                        }

                        // weirdly, this returns an object into tagDupe.
                        // console.log('tagDupe', tagDupe);

                        tags = [];
                        for ( var key in tagDupe ){
                            tags.push({body: tagDupe[key].body, count : tagDupe[key].count, visible: true});
                            tags_for_flow.push({body: tagDupe[key].body, count : tagDupe[key].count, summary :''});
                        }

                        // push single tags to each flow step
                        stepcollector[i].tags_single = tags;
                    }
                }
            }

            tags_for_flow.sort(keysrt('body'));
            
            for (var i = 0; i < tags_for_flow.length -1 ; i++){
                    
                if ( tags_for_flow[i].body == tags_for_flow[i+1].body ){
                    
                    var total = tags_for_flow[i].count + tags_for_flow[i+1].count;
                    tags_for_flow.splice(i, 1);
                    tags_for_flow[i].count = total;
                    console.log(tags_for_flow[i].count);
                }
            }

        summary = new Summary();

        summary.title = flowname;
        summary.steps = stepcollector;
        summary.tags = tags_for_flow;

        // TODO there's really no way around this 
        // without being able to check a thing 
        // to see if it has a null _id field first

		summary.save(function(err) {
				if (err)
					res.send(err);
				
				res.json(summary);
		});
	});

// SUMMARY routes ======================================================

// get the summary to fill in from the database

router.route('/summary/:testId/flow/:flowName')
	.get(function(req,res){
		Summary.findById(req.params.summaryId, function(err, summary) {
				if (err)
					res.send(err);
				console.log('touched /:sessionId');
				res.json(summary);
			});
	})
	.put(function(req,res){
		var query = { 
				'_id': req.params.testId
		};

		var update = {
			steps : req.body.steps
		};

		var options = {upsert : true};

		Summary.findByIdAndUpdate(query, update, options, function (err, summary) {	
		});

	});

router.route('/summary/:summaryId')
	.get(function(req,res){
		Summary.findById(req.params.summaryId, function(err, summary) {
				if (err)
					res.send(err);
				console.log('touched /:sessionId');
				res.json(summary);
			});
	})
	.delete(function(req,res){
		console.log(req.params.summaryId);
		Summary.remove({
			'_id': req.params.summaryId
		}, function(err, summary) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted summary with '+req.params.summaryId });
		});
	})
	;

router.route('/summary/')
	.get(function(req,res){
		Summary.find(function(err, summaries) {
				if (err)
					res.send(err);

				res.json(summaries);
			});
	});

module.exports = router;