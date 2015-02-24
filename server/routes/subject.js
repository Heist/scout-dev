// subject.js
'use strict';

module.exports = function(app, passport, debug) {

// load data storage models =====================
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ===============================
    var addSubject = global.rootRequire('./server/models/functions/add-subject');

// SUBJECT ROUTES ===============================================
    app.route('/api/subject/')
        .get(function(req,res){
                Subject.find({})
                    .exec(function(err,subjects){
                        if(err){console.log(err);}
                        
                        res.json(subjects);
                    });
            })
        .post(function(req,res){
                addSubject(req.body, function(err, subject){
                    if(err){ console.log(err); }
                    console.log(subject);
                    res.json(subject);
                });
            });

    app.route('/api/subject/:_id')
        .get(function(req, res){
            Subject.findById(req.params._id)
                .exec(function(err, subject){
                    if(err){console.log(err);}
                    res.json(subject);
                });
        });
};
