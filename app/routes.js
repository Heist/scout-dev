// routes.js
var express = require('express');
var router = express.Router();  // get an instance of the express Router
var util = require('util');
var mongoose = require('mongoose'); // so we can generate ObjectIDs for tests

// // load models for routes
var Message = require('./models/message');
var Step 	= require('./models/step');
var Flow    = require('./models/flow');
var Session = require('./models/session');
var Summary = require('./models/summary');

// this cleverness is supposed to initialize the models list
// require('./models.js').initialize();

// functions =====================================================

// sorts an array of objects by key.
function keysrt(key,desc) {
  return function(a,b){
   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}

function flowcatch(data, match){
	// TODO - add FlowKey and rethink how this pushes into the array
	var flowcatch = [];
        for (var a = 0; a < data.length; a++){
        	for (var b = 0; b < data[a].flows.length; b++){
        		if (data[a].flows[b].flowKey == match){
        			flowcatch.push(data[a].flows[b]);
        		}
        	}
        }
    return flowcatch;
}


function stepcatch(flow_array){

// assemble the steps into their stacks
	var stepcollector = [];
	var stepcheck = [];

	for ( var a = 0; a < flow_array.length; a++){
		var flow = flow_array[a]

		for(var b = 0; b < flow.steps.length; b++){

			var step = flow.steps[b];
	        var name = step.title;
	        var key = step.key;
	        
	        if(flow.user_id){ // if there's a user set on the record, include it.
    	    	if (!(stepcheck.indexOf(key) != -1)){
    	    		// this correctly pushes the first step of the first flow with a user.
    	            var pusher = {'user' : flow.user_id, 'messages' : step.messages }
    
    	            stepcheck.push(key);
    	            stepcollector.push({key: key, name : name, session_by_user : [], pass_fail : false, summary: '' });
    	            stepcollector[b].session_by_user.push(pusher);
    
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
	}

// here we begin collecting tags from the step object
	var tagcollector = [];
    var tagnamecheck = [];

    for (var a = 0; a < stepcollector.length ; a++){
    	var step = stepcollector[a];
    	// console.log('stepcollector key', step.key, step.session_by_user.length);

        for (var j = 0 ; j < step.session_by_user.length; j ++){
        	
        	// for each session/user, get messages
            for (var k = 0 ; k < step.session_by_user[j].messages.length; k++){

            	// get the messages from that step and their tags
            	if(step.session_by_user[j].messages[k].tags.length != 0){
            		// console.log('are there any tags', step.session_by_user[j].messages[k].tags)
	                for (var l = 0; l < step.session_by_user[j].messages[k].tags.length; l++){

	                	// console.log('stepcollector key', step.key);
	                    if(!(tagnamecheck.indexOf(step.key) != -1)){
	                        tagnamecheck.push(step.key);
	                        var tagMaker = step.session_by_user[j].messages[k].tags[l];
	                        tagcollector.push({key : step.key, tags : [ tagMaker ] });
	                        
	                    } else if (tagnamecheck.indexOf(step.key) != -1){
	                        for (var m in tagcollector){
	                            if (step.key == tagcollector[m].key){
	
	                                var tagMaker = step.session_by_user[j].messages[k].tags[l];
	                                tagcollector[m].tags.push(tagMaker);
	                            }
	                        }
	                    }
	                }
	            }    
            }
        }
    }

    // console.log('tagcollector', tagcollector)

			for (var i = 0; i < stepcollector.length; i++){
            	var step = stepcollector[i]
                for (var j = 0; j < tagcollector. length; j++){
                    if (step.key == tagcollector[j].key ){
                        var tags = tagcollector[j].tags;
                        tags.sort();

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

                        tags = [];
                        for ( var key in tagDupe ){
                            tags.push({body: tagDupe[key].body, count : tagDupe[key].count, visible: true});
                        }
                        // push single tags to each flow step
                        step.tags_single = tags;
                    }
                }
            }

	return stepcollector;
}

function tagcollector(array){
        // arrange the tags for theme summarizing
        // console.log('tagcollector function', array);
        var tags = [];
        // array is an array of steps
        for (var i = 0; i < array.length -1 ; i++){
            for(var j = 0; j < array[i].tags_single.length -1; j++){
                tags.push(array[i].tags_single[j])
            }
        }

     return tags;
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
	.get(function(req, res) {
		// get all the flows in the db
		// do nothing with them - this route is for testing
			Flow.find(function(err, flows) {
				if (err)
					res.send(err);
				res.json(flows);
			});
		});

// SESSION ROUTES ================================================
	
router.route('/session/')
	// get all sessions
	// get all flows by session
	// get all flow steps by flow
	.get((function(req,res){
		Session.find(function(err, sessions) {
				if (err)
					res.send(err);


				res.json(sessions);
			});
	})

	// add a new session - this could be an upsert?
	.post(function(req, res){
				var session = new Session();
 			
	 			session.name = 'New Session';

	 			session.save(function(err) {
					if (err)
						res.send(err);

					Session.find({}, function(err, session) {
						if (err)
							res.send(err);
						res.json(session);
					});
				});
		})

	// update a session's name
	

	
router.route('/session/:session_id/')
	// deletes all sessions and sub-documents - steps, flows, reports, summaries.
	.delete((function(req,res){
		
	})

	// change the name of the session
	.put((function(req,res){
		Session.findById({'_id': req.params.session_id}, function(err, session){
			if (err)
				res.send(err);

			session.name = req.body.name;

			session.save(function(err, data) {
				if (err)
					res.send(err);
				
				console.log('touched summary update', data);
			})
		})
	})
	;

router.route('/session/:session_id/flow/')

	// get all flows by session
	.get((function(req,res){
		
	})

	// add a new flow to the session
	.post((function(req,res){
		
	})
	;


// FLOW ROUTES ===================================================
	
router.route('/flow/')
	// get all of the flows	
	.get((function(req,res){
		
	});


router.route('/flow/:flow_id')
	.get((function(req,res){
		// get one specific flow
	})

	.put(function(req,res){
		// update one flow with new information
	})

	.delete((function(req,res){
		// deletes a single flow by id
	});

router.route('/flow/:flow_id/step/')
	// add a new step to the flow
	.post((function(req,res){
		
	})
	;

// STEP ROUTES ===================================================
	// these are a subset of flow routes

router.route('/step/')
	// get all steps
	.get((function(req,res){
		
	});

router.route('/step/:step_id')
	// get single step
	.get((function(req,res){
		
	})
	
	// update a single step
	.put((function(req,res){
		
	})

	// delete a step
	.delete((function(req,res){
		
	})
	;


// TEST MESSAGE and MESSAGING ROUTES ================================================
router.route('/test/')
	.get((function(req,res){
		// find, populate and return:
		// flows by session with their steps by flow counted

		// on the front end:
		// flows should have it set whether they have a .summary or not
		// flows should have their steps counted
		// sessions should be associated to their flows.

		// object shape:
		// session.flows.length
		// session 
		// flow.summary
		// flows.steps.length

	});

router.route('/test/session/:session_id/')
	.get((function(req,res){
		// get all the flows with the requested session id
		// get all of their steps
		// return the object in an organized way
	});



// CREATE A NEW SUMMARY ================================================

router.route('/test/:testKey/flow/:flowKey')
	.post(function(req,res) {
		console.log('touched Create A New Summary flowcollector', req.params.testKey, req.params.flowKey);
		
		Summary.find({'testKey' : req.params.testKey, 'flowKey' : req.params.flowKey}, function (err, summary_data){
			console.log('touched Summary', summary_data);
			var testKey = req.params.testKey;
			var flowKey = req.params.flowKey;

			if(err){
				res.send(err)
			}

			// if there is a summary already present
			// use that to load the summary for the flow
			else if (summary_data.length > 0){
				console.log('need to populate the summary object with the _updated_ or _new_ test data');
				console.log('touched summary data', summary_data[0].testKey, summary_data[0].flowKey);
				console.log('touched summary data', summary_data[0]._id);


				res.json(summary_data[0]);
			}

			// if there's no summary already present
			// make a summary and then 
			// save it
			else if (summary_data.length == 0){
				console.log('need to make a new one');

				Session.find({'testKey' : req.params.testKey, 'ismodel':false}, function(err, data) {
							if (err)
								res.send(err);
			
							// this gathers and sorts similar flows from the array of returned sessions.
				            var session_name = data[0].name;
				            var flows = flowcatch(data, flowKey)
				            var steps = stepcatch(flows);
				            var tags = tagcollector(steps);

					        summary = new Summary();

					        summary.title = flows[0].title;
					        summary.steps = steps;
					        summary.tags = tags;
					        summary.testKey = testKey;
					        summary.flowKey = flowKey;
					        summary.session_name = session_name;
					        summary.summary = '';

							summary.save(function(err) {
									if (err)
										res.send(err);
									
									res.json(summary);
							});
							
				})


			}})
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
				// this appears to be pushing the user into the first session by user twice			

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