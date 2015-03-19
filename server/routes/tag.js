// tag.js
'use strict';

module.exports = function(app, passport, debug) {

// load data storage models =====================
    var models  = require('../models');
    var fn      = require('../models/functions');

// TAG ROUTES ================================================
    app.route('/api/tag/')
        .get(function(req,res){
            models.Tag.find(function(err, tags) {
                    if(err){console.log(err);}
                    res.json(tags);
                });
        })
        .post(function(req, res){
            fn.tagMaker(req.body).then(function(data){
                res.json(data);
            });
        });

    app.route('/api/tag/:_id')
        .get(function(req,res){
            models.Tag.findById(req.params._id)
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