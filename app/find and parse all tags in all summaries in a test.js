
				// find all tags that have been summarized within a summary.
				// TODO this is returning properly but I feel there are errors in the dataset.
				for (var i in summaries){
					var tag_index = []
					var tags = []
					
					for (var k in summaries[i].tags){						
					// if there's a summary, hand it over
						if(summaries[i].tags[k].summary){
							for (var l in summaries[i].steps){
								for(var m in summaries[i].steps[l].session_by_user){
									for(var n in summaries[i].steps[l].session_by_user[m].messages){
										for(var t in summaries[i].steps[l].session_by_user[m].messages[n].tags){
											var tag = summaries[i].steps[l].session_by_user[m].messages[n].tags[t];
											var hashPull = new RegExp(/#/gi);
											var tag = tag.replace(hashPull,'');

											if ( tag == summaries[i].tags[k].body){
												// console.log(summaries[i].steps[l].session_by_user[m].messages[n].body);
												if (!(tag_index.indexOf(tag) != -1)){
							                    	tag_index.push(tag);
							                    	tags.push({tag: tag, messages:[]});
							                    	tags[tag_index.indexOf(tag)].messages.push(summaries[i].steps[l].session_by_user[m].messages[n].body);
												} else if(tag_index.indexOf(tag) != -1){
													tags[tag_index.indexOf(tag)].messages.push(summaries[i].steps[l].session_by_user[m].messages[n].body);
												}
											}
										}
									}
								}
							}
						}
					}
					console.log('tags', tags);
				}

				