// build-object-list.js
// Builds the left navigation array for report routes
'use strict';

module.exports = function(){
    
    // push them to the nav list using map
    // order them by their report-index and return them
    
        // TODO call this into a function called 'create navList'
        console.log('touched report get', req.params._id);
        async.parallel({
            tags: function(callback){
                Tag.find({'_test' : req.params._id })
                    .sort({name: 1})
                    .exec(function(err, docs){
                        if (err) {
                            console.log(err);
                        }
                        callback(null, docs);
                    });
            },
            tasks: function(callback){
                Task.find({'_test': req.params._id})
                    .sort({ index: 'asc'})
                    .exec(function(err, docs){
                        if (err) {
                            console.log(err);
                        }
                        callback(null, docs);
                    });
            },
            test: function(callback){
                Test.find({'_id' : req.params._id})
                    .limit(1)
                    .exec(function(err, docs){
                        if(err){console.log(err);}
                        callback(null, docs);
                    });
            },
            messages: function(callback){
                Message.find({ '_test':{$in: [req.params._id]}})
                       .populate({path:'_subject', select: 'name' })
                       .populate({path:'_comments', select: 'name body created'})
                       .exec(function(err, docs){
                            if(err){console.log(err);}
                            console.log(docs);
                            callback(null, docs);
                        });
            }
        },
        function(err, results) {
            // results is now equals to: {one: 1, two: 2}
            var return_array = [];
            _.each(results.test, function(test){
                return_array.push(test);
            });
            _.each(results.tasks, function(task){
                return_array.push(task);
            });
            _.each(results.tags, function(tag){
                return_array.push(tag);
            });
            // callback(null, );
            console.log(results.test[0].name);
            res.json({test: results.test[0].name, navlist: return_array, messages: results.messages});
        });

};