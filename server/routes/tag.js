// tag.js
'use strict';

module.exports = function(app, passport, debug) {

// load data storage models =====================
    var Tag     = require('../models/data/tag');
    
// TAG ROUTES ================================================
    app.route('/api/tag/')
        .get(function(req,res){
            Tag.find(function(err, tags) {
                    if(err){console.log(err);}
                    res.json(tags);
                });
        });

    app.route('/api/tag/:_id')
        .get(function(req,res){
            Tag.findById(req.params._id)
                .exec(function(err, tags) {
                    if(err){console.log(err);}
                    res.json(tags);
                });
        })
        .post(function(req,res){
            // console.log('tag post touched')
            res.json('tag post touched');
        });
};