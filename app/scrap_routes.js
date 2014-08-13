


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