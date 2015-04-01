// get-tags.js
// Return tags by account after they're created
'use strict'

module.exports = function(test_id){
   var models   = require('../../models');

    return models.Tag.find({'_test' : test_id}).exec();

}