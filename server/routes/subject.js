// subject.js
'use strict';

module.exports = function(app, passport) {

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var fn  = require('../models/functions');

// SUBJECT ROUTES ===============================================
    app.route('/api/subject/')
        .get(function(req,res){
                models.Subject.find({})
                    .exec(function(err,subjects){
                        if(err){ console.error(err); }
                        
                        res.json(subjects);
                    });
            })
        .post(function(req,res){
                fn.addSubject(req.body, function(err, subject){
                    if(err){ console.error(err); }
                    // 
                    res.json(subject);
                });
            });

    app.route('/api/subject/:_id')
        .get(function(req, res){
            models.Subject.findById(req.params._id)
                .exec(function(err, subject){
                    if(err){ console.error(err); }
                    res.json(subject);
                });
        });
};
