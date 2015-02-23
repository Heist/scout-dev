// comment.js
// create a new comment.
'use strict';

module.exports = function(request, user, next){
// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');
    var Comment = global.rootRequire('./server/models/data/comment');

// COMMENT ON A MESSAGE ===================================
    var reply = {};

    var promise = Comment.create( {
            name: user.name,
            body: request.body,
            created_by_user: user._id
        },
        function(err, cmt){
            if(err){ console.log(err); }
        });

    promise.then(function(comment){
        reply.comment = comment;
        return Message.findOneAndUpdate(
            {'_id' : request.msg},
            {$push : {_comments: comment._id}},
            function(err, msg){
                if (err) {console.log(err);}
            });

    }).then(function(){
        Message.findOne({'_id': request.msg})
           .populate('_comments _subject')
           .exec(function(err, msg){
                if (err) { console.log(err);}
                next(null, msg);
            });
    });
};