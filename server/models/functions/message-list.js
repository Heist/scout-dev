// message-list.js
// get all the messages for a given report
'use strict';

module.exports = function(report_id, next){        
// Module dependencies ==========================
    var models = require('../../models');

// Get some messages for a report
    models.Message.find({ '_test':{$in: [report_id]}})
       .populate({path:'_subject', select: 'name' })
       .populate({path:'_comments', select: 'name body created _tags'})
       .exec(function(err, docs){
            if(err){ console.log(err); }
            next(null, docs);
        });
};