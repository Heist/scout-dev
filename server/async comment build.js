Task.find({'_test' : arg._id})
.populate('_test _messages')
.select('_messages created desc name pass_fail index report_index updated visible ')
.exec(function(err, data){
    if(err){console.log(err);}
    // for each task
    // find all messages
    // for each message
    // find all comments,
    // replace the message in the task with a commented message in the task.

    async.map(data,
    function(obj, callback){
        if(obj._messages){
            async.map(obj._messages, 
                function(msg, callback){
                    // if a message exists, find it, populate it, and return it.
                    Message.findOne({'_id':msg._id})
                        .populate('_comments')
                        .exec(function(err, data){
                            if(err){console.log(err);}
                            callback(null, data);
                        });
                },
                function(err, results){
                    if(err){console.log(err);}
                    // these results are your populated, commented messages.
                    obj._messages = '';
                    obj._messages = results;
                    callback(null, obj._messages);
                });
        } else {
            // No messages? Just pass back the object.
            callback(null, obj);
        }
    },
    function(err, results){
        if(err){console.log(err);}
        // this should be an array of items with populated comments.
        console.log('mapping results', results);
        
    });

});





 if(obj._messages){
            async.map(obj._messages,
            function(msg, callback){
                
                        if(err){console.log(err);}
                        if(data._comments){
                            console.log('comments on this message', data._comments);
                            console.log('message', data);
                            // get the index of the message that has comments
                            // splice it out
                            // replace with the actual commented message
                            // array of messages obj._messages
                            
                            var json_msg = JSON.stringify(data);

                            var msg_id_arr = _.pluck(obj._messages, '_id');
                            console.log('msg id, id arr', msg._id, msg_id_arr);
                            var msg_idx = msg_id_arr.indexOf(msg._id);
                            console.log(msg_idx);

                            obj._messages.splice(msg_idx, 0, json_msg);
                            
                            console.log('obj._messages', obj._messages[msg_idx]);
                            
                            callback(null, obj);

                        } else {
                            callback(null, obj);
                        }
                    });
            },
            function(err, results){
                if(err){console.log(err);}
                // this should callback a test with the messages replaced with the populated messages.
                callback(null, results);
            });
        } else {
            callback(null, data);
        }