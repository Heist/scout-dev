// comment.js
// create a new comment.
'use strict';

module.exports = function(request, user, next){
    var models = require('../../models');

// COMMENT ON A MESSAGE ===================================
    var reply = {};

    var promise = models.Comment.create( {
            name: user.name,
            body: request.body,
            created_by_user: user._id
        },
        function(err, cmt){
            if(err){  }
        });

    promise.then(function(comment){
        reply.comment = comment;
        return models.Message.findOneAndUpdate(
            {'_id' : request.msg},
            {$push : {_comments: comment._id}},
            function(err, msg){
                if (err) {}
            });

    }).then(function(){
        models.Message.findOne({'_id': request.msg})
           .populate('_comments _subject')
           .exec(function(err, msg){
                if (err) { }
                next(null, msg);
            });
    });
};