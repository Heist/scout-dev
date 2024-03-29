// tag.js
'use strict';

module.exports = function(app, passport) {

// load data storage models =====================
    var models  = require('../models');
    var fn      = require('../models/functions');

// TAG ROUTES ================================================
    app.route('/api/tag/')
        .get(function(req,res){
            models.Tag.find(function(err, tags) {
                    if(err){ console.error(err); }
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
            models.Tag.find({'_test':req.params._id})
                .exec(function(err, tags) {
                    if(err){ console.error(err); }
                    res.json(tags);
                });
        })
        .post(function(req,res){
            // console.log('tag post touched')
            res.json('tag post touched');
        })
        .delete(function(req, res){
            console.log('delete this tag', req.params._id);
            fn.deleteObject(req.params._id, 'tag',function(err, obj){
                if(err){ console.error(err); }
                console.log(obj)
                res.json(obj);
            });

        });

};