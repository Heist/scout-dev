// message-list.js
// get all the messages for a given report
'use strict';

module.exports = function(report_id, next){        
// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');

// Get some messages for a report
    Message.find({ '_test':{$in: [report_id]}})
       .populate({path:'_subject', select: 'name' })
       .populate({path:'_comments', select: 'name body created'})
       .exec(function(err, docs){
            if(err){console.log(err);}

            next(null, docs);
        });
};