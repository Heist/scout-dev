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

// CREATE A NEW SESSION ================================================
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


// TEST routes =========================================================

// routest for returning test sets - return all sessions.
// on front end, remove sessions that are not models, but count them.
router.route('/test/')

	// OVERVIEW get =============================

	.get(function(req,res){
		console.log('touched /test');

		// get all of the sessions
		// then split out the tests from the models
		// return a test object by key
		// containing sessions
		// and summaries

		var ssin = [];
        var tests = [];
        var sum = []

        // find the sessions and tests
		Session.find({}).sort('-created').exec( function(err, data) {
			if (err)
				res.send(err);

			var keys = [];

			for(var i in data){
				console.log(data[i].testKey);
				if (!(keys.indexOf(data[i].testKey) != -1)){
					keys.push(data[i].testKey);
				}
			}

            data.sort(keysrt('testKey'));
            
            // count up and post the number of sessions 
            var models = 0;
            var ssincount = 0;
                       

            // split out tests from sessions
            for(var i =0; i<data.length; i++){
                if (data[i].ismodel){
                    tests.push(data[i]);
                } else if (!data[i].ismodel){
                    ssin.push(data[i]);
                }
            }

            // get the stats for 'last run'
            for(var i in ssin){
                for (var k in tests){
                    if (tests[k].testKey == ssin[i].testKey){
                        if (ssin[i].updated > tests[k].updated){
                            tests[k].updated = ssin[i].updated;
                        }
                    }
                }
            }

            Summary.find({}, function(err, summaries){
            	if (err)
					res.send(err);

				sum = summaries;

				console.log(ssin.length, tests.length, sum.length);

				res.json({sessions: tests, tests: ssin, summaries: sum});
            })


            
			// res.json({'sessions': tests, 'test':ssin, 'summaries' : sum});
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
			console.log(req.body);
			if (err)
				res.send(err);
			
			if (req.body.user){
				session.user = req.body.user;
				console.log('new user', session.user);
			} else if (req.body.name){
				session.name = req.body.name;
				console.log('new name', session.name);
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

// CREATE A NEW SUMMARY ================================================

router.route('/test/:testKey/flow/:flowKey')
	.post(function(req,res) {
		console.log('touched Create A New Summary flowcollector', req.params.testKey, req.params.flowKey);
		
		// does a summary for this flow already exist?
		Summary.find({'testKey' : req.params.testKey, 'flowKey' : req.params.flowKey}, function (err, summary_data){
			// console.log('touched Summary', summary_data);
			
			if(err){
				res.send(err)
			}

			else if (summary_data.length > 0){
				console.log('touched summary data', summary_data.length);
				console.log('touched summary data', summary_data[0]._id);
				res.json(summary_data[0]);
			}
			else if (summary_data.length == 0){
				console.log('making a new summary for flow ', req.params.flowKey);

				Session.find({'testKey' : req.params.testKey, 'ismodel':false}, function(err, data) {
					if (err)
						res.send(err);
	
					// this gathers and sorts similar flows from the array of returned sessions.
					console.log('there are this many sessions:', data.length);
					
		            var stepcollector = [];
		            var stepcheck = [];
		            var flowcatch = [];
		            var users = [];
		            var counter;
		            
		            // loop through returned sessions
		            // put all flows by key into the requested summary array
		            for (var a = 0; a < data.length; a++){
		            	for (var b = 0; b < data[a].flows.length; b++){
		            		if (data[a].flows[b].flowKey == req.params.flowKey){
		            			flowcatch.push(data[a].flows[b]);
		            		}
		            	}
		            }

		            console.log('number of flows in flowcatch', flowcatch.length);

		            // for each flow
		            // assemble the steps into a collection

		            // for each flow
		            // find each step
		            // for each step
		            // check if the key to that step exists in the keychain
		            // if it does not, push it to the key chain with a data object.
		            // if it does, push messages into it.

		            for ( var a = 0; a < flowcatch.length; a++){
		            	var flow = flowcatch[a]
		            	users.push( flow.user_id)
		            	
		            	for(var b = 0; b < flow.steps.length; b++){

		            		var step = flow.steps[b];
		                    var name = step.title;
		                    var key = step.key;
		                    
		                    // console.log('step: examine for a unique key', step)

		                	if (!(stepcheck.indexOf(key) != -1)){
		                		// this correctly pushes the first step of the first flow with a user.
		                        var pusher = {'user' : flow.user_id, 'messages' : step.messages }

		                        stepcheck.push(key);
		                        stepcollector.push({key: key, name : name, session_by_user : [], pass_fail : false, summary: '' });
		                        stepcollector[a].session_by_user.push(pusher); // stepcollector same as flow number


		                    } else if (stepcheck.indexOf(key) != -1){

		                    	for ( var c = 0; c < stepcollector.length; c++){
		                            if (key == stepcollector[c].key){
		                                var pusher = {'user' : flow.user_id, 'messages' : step.messages }
		                                stepcollector[c].session_by_user.push(pusher);
		                                
		                            }
			                    }
		                	}
		            	}
		            }

		            console.log('stepcollector', stepcollector.length)
					// // the tagstripper and reorganizer

		   //          var tagcollector = [];
		   //          var tagnamecheck = [];
		   //          // console.log(stepcollector.length);
		   //          // console.log(stepcollector);

		   //          for (var i = 0; i < stepcollector.length ; i++){
		   //          	console.log('stepcollector key', stepcollector[i].key, stepcollector[i].session_by_user.length);
		   //              for (var j = 0 ; j < stepcollector[i].session_by_user.length; j ++){

		   //                  for (var k = 0 ; k < stepcollector[i].session_by_user[j].messages.length; k++){
		   //                  	console.log('are there any tags', stepcollector[i].session_by_user[j].messages[k].tags)
		   //                      for (var l = 0; l < stepcollector[i].session_by_user[j].messages[k].tags.length; l++){
		   //                      	console.log('stepcollector key', stepcollector[i].key);
		   //                          if(!(tagnamecheck.indexOf(stepcollector[i].key) != -1)){
		   //                              tagnamecheck.push(stepcollector[i].key);
		   //                              var tagMaker = stepcollector[i].session_by_user[j].messages[k].tags[l];
		   //                              tagcollector.push({name : stepcollector[i].name, tags : [ tagMaker ] });
		                                
		   //                          }else if (tagnamecheck.indexOf(stepcollector[i].key) != -1){
		   //                              for (var m in tagcollector){
		   //                                  if (stepcollector[i].name == tagcollector[m].name){

		   //                                      var tagMaker = stepcollector[i].session_by_user[j].messages[k].tags[l];
		   //                                      tagcollector[m].tags.push(tagMaker);
		   //                                  }
		   //                              }
		   //                          }
		   //                      }    
		   //                  }
		   //              }
		   //          }

		   //          console.log('tagcollector', tagcollector);

		   //          var tags_for_flow = [];
		   //          // integrate tags to stepcollector for a clean object
		   //          for (var i in stepcollector){
		   //              for (var j in tagcollector){
		   //                  if (stepcollector[i].name == tagcollector[j].name ){
		   //                      // get all tags per step and post to stepcollector.tags
		   //                      // this should push to the flow itself for a count later on.
		   //                      // console.log('tagcollector j', tagcollector[j])

		   //                      var tags = tagcollector[j].tags;
		   //                      tags.sort();
		   //                      // console.log('tags', tags.length ,JSON.stringify(tags));
		   //                      // stepcollector[i].tags = tags;

		   //                      // de-dupe array, then post to tags_single
		   //                      //  so we summarize and visible.
		   //                      var tagDupe = [];
		   //                      var tagCount = 0;
		   //                      var curTag = null;

		   //                      for (var k = 0; k < tags.length +1; k++){
		   //                          if (tags[k] != curTag){     
		   //                              if (tagCount > 0) {
		   //                                  tagDupe.push({body: curTag.replace(/#/gi,''), count : tagCount});
		   //                              }

		   //                              curTag = tags[k];
		   //                              tagCount = 1;
		   //                          } else {
		   //                              tagCount++;
		   //                          }
		   //                      }

		   //                      // weirdly, this returns an object into tagDupe.
		   //                      // console.log('tagDupe', tagDupe);

		   //                      tags = [];
		   //                      for ( var key in tagDupe ){
		   //                          tags.push({body: tagDupe[key].body, count : tagDupe[key].count, visible: true});
		   //                          tags_for_flow.push({body: tagDupe[key].body, count : tagDupe[key].count, summary :''});
		   //                      }

		   //                      // push single tags to each flow step
		   //                      stepcollector[i].tags_single = tags;
		   //                  }
		   //              }
		   //          }

		   //          // arrange the tags for theme summarizing
		   //          tags_for_flow.sort(keysrt('body'));
		            
		   //          for (var i = 0; i < tags_for_flow.length -1 ; i++){
		                    
		   //              if ( tags_for_flow[i].body == tags_for_flow[i+1].body ){
		                    
		   //                  var total = tags_for_flow[i].count + tags_for_flow[i+1].count;
		   //                  tags_for_flow.splice(i, 1);
		   //                  tags_for_flow[i].count = total;
		   //                  // console.log(tags_for_flow[i].count);
		   //              }
		   //          }


			  //       summary = new Summary();

			  //       summary.title = flowname;
			  //       summary.steps = stepcollector;
			  //       summary.tags = tags_for_flow;
			  //       summary.testKey = req.params.testId;
			  //       summary.session_name = session_name;
			  //       summary.summary = '';

					// summary.save(function(err) {
					// 		if (err)
					// 			res.send(err);
							
					// 		res.json(summary);
					// });
		})}})
		
	});


// SUMMARY routes ======================================================

// get the summary to fill in from the database

router.route('/summary/:summaryID/flow/')
	.get(function(req,res){
		Summary.findById(req.params.summaryID, function(err, summary) {
				if (err)
					res.send(err);
				console.log('touched /:summaryID', req.params.summaryID);
				res.json(summary);
			});
	})
	.put(function(req,res){
		console.log('touched put for summaryID', req.body);

		Summary.findById(req.body._id, function (err, summary) {	
			if (err)
				res.send(err);

			summary.steps = req.body.steps;
			summary.tags  = req.body.tags;
			summary.summary = req.body.summary;

			summary.save(function(err) {
				if (err)
					res.send(err);

				res.json( req.body );
			});

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


// REPORT ROUTES =========================================================

router.route('/report/:testKey')
	.get(function(req,res){
		Summary.find({'testKey':req.params.testKey}, function(err, summaries) {
				if (err)
					res.send(err);

				// console.log('touched /report', req.params.testKey, summaries);
				// from each flow in a summary
				// return messages to a given tag
				// by user

				// for each summary, which is also a Flow	
				// find all tags that have been summarized

				var tagSummary = [];
				for (var i in summaries){
					var tag_index = []
					var tags = []
					var messages = []
					
					for (var j in summaries[i].tags){
					// if there's a summary, get the tag that has a summary
						if (summaries[i].tags[j].summary){
							// console.log(summaries[i].tags[j]);

							// okay, now we can get messages that have tag[j]
							// from this summary/flow
							for (var k in summaries[i].steps){
								for(var l in summaries[i].steps[k].session_by_user){
									for(var m in summaries[i].steps[k].session_by_user[l].messages){
										var msg = summaries[i].steps[k].session_by_user[l].messages[m];
										for (var t in msg.tags){
											// if the message has a tag that is the same
											// as the tag being currently tested...
											if (msg.tags[t] == summaries[i].tags[j].body){
												var ct = 0;
												// console.log('tag ', msg.tags[t],'msg', msg);
												// if the tag checking index lacks thing,
												// make thing and put first message in
												// otherwise push the message into existing tag
												if (!(tag_index.indexOf(msg.tags[t]) != -1)){
													ct = 1;
													tag_index.push(msg.tags[t])
													tags.push({tag: msg.tags[t], summary: summaries[i].tags[j].summary, count: ct, messages:[]})
													tags[tag_index.indexOf(msg.tags[t])].messages.push(msg);
												} else if (tag_index.indexOf(msg.tags[t]) != -1){
													tags[tag_index.indexOf(msg.tags[t])].messages.push(msg);
													tags[tag_index.indexOf(msg.tags[t])].count = tags[tag_index.indexOf(msg.tags[t])].messages.length;
												}
											}
										}
									}
								}
							}
						}
					}
					
					if (tags){
					summaries[i].tags = tags;
					}
					console.log('summary.tags did not crash', summaries[i].tags)
				}

				

				// sort out the number of times a test has been run from sessions_by_user
				//  there is an off-by-one in here.
				// the off-by-one is actually in Summary Creation.

				var users = []
				var usr_ct = 0;
				for (var i in summaries){
					for (var k in summaries[i].steps){
						for (var l in summaries[i].steps[k].session_by_user){
							var user = summaries[i].steps[k].session_by_user[l].user;
							if(user){
								users.push({session : summaries[i]._id, user: user});
							}
						}
					}
				}
				
				users.sort(keysrt('user'));
				console.log(users);


				for( var i = 0; i < users.length -1; i++ ){
					if(users[i+1].session == users[i].session){
						users.splice(i, 1);
					}
				}
				var dataOut = {'users': users, 'summaries':summaries};
				
				res.json(dataOut);
			});
	});
router.route('/report/:testKey/flow/:flowName')
	.get(function(req,res){
		Summary.find({'title':req.params.flowName, 'testKey': req.params.testKey}, function(err, summaries) {
				if (err)
					res.send(err);


				var tagSummary = [];
				for (var i in summaries){
					var tag_index = []
					var tags = []
					var messages = []
					
					for (var j in summaries[i].tags){
					// if there's a summary, get the tag that has a summary
						if (summaries[i].tags[j].summary){
							// console.log(summaries[i].tags[j]);

							// okay, now we can get messages that have tag[j]
							// from this summary/flow
							for (var k in summaries[i].steps){
								for(var l in summaries[i].steps[k].session_by_user){
									for(var m in summaries[i].steps[k].session_by_user[l].messages){
										var msg = summaries[i].steps[k].session_by_user[l].messages[m];
										for (var t in msg.tags){
											// if the message has a tag that is the same
											// as the tag being currently tested...
											if (msg.tags[t] == summaries[i].tags[j].body){
												var ct = 0;
												// console.log('tag ', msg.tags[t],'msg', msg);
												// if the tag checking index lacks thing,
												// make thing and put first message in
												// otherwise push the message into existing tag
												if (!(tag_index.indexOf(msg.tags[t]) != -1)){
													ct = 1;
													tag_index.push(msg.tags[t])
													tags.push({tag: msg.tags[t], summary: summaries[i].tags[j].summary, count: ct, messages:[]})
													tags[tag_index.indexOf(msg.tags[t])].messages.push(msg);
												} else if (tag_index.indexOf(msg.tags[t]) != -1){
													tags[tag_index.indexOf(msg.tags[t])].messages.push(msg);
													tags[tag_index.indexOf(msg.tags[t])].count = tags[tag_index.indexOf(msg.tags[t])].messages.length;
												}
											}
										}
									}
								}
							}
						}
					}
					
					if (tags){
					summaries[i].tags = tags;
					}
					console.log('summary.tags did not crash', summaries[i].tags)
				}

				

				// sort out the number of times a test has been run from sessions_by_user
				var users = []

				for (var i in summaries){
					for (var k in summaries[i].steps){
						for (var l in summaries[i].steps[k].session_by_user){
							var user = summaries[i].steps[k].session_by_user[l].user;
							if(user){
								users.push({session : summaries[i]._id, user: user});
							}
						}
					}
				}
				
				users.sort(keysrt('user'));

				for( var i = 0; i < users.length -1; i++ ){
					if(users[i+1].session == users[i].session){
						users.splice(i, 1);
					}
				}
				var dataOut = {'users': users, 'summaries':summaries};
				
				res.json(dataOut);
			});
	});

module.exports = router;