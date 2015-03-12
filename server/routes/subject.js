// subject.js
'use strict';

module.exports = function(app, passport, debug) {

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var fn  = require('../models/functions');

// SUBJECT ROUTES ===============================================
    app.route('/api/subject/')
        .get(function(req,res){
                models.Subject.find({})
                    .exec(function(err,subjects){
                        if(err){console.log(err);}
                        
                        res.json(subjects);
                    });
            })
        .post(function(req,res){
                fn.addSubject(req.body, function(err, subject){
                    if(err){ console.log(err); }
                    console.log(subject);
                    res.json(subject);
                });
            });

    app.route('/api/subject/:_id')
        .get(function(req, res){
            models.Subject.findById(req.params._id)
                .exec(function(err, subject){
                    if(err){console.log(err);}
                    res.json(subject);
                });
        });
};
