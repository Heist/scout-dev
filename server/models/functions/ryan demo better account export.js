var getUser = function (account) {
  return User.find({'_account': account}).select('name local.email')
}

var getTest = function (account) {
  return Test.find({'created_by_account': account})
             .populate('created_by_user')
             .select('name platform desc updated created created_by_user')
}

var getTask = function (argument) {
  return Task.find({'_test' : argument._id})
             .populate('_test _messages')
             .select('_messages created desc name pass_fail index report_index 
                     updated visible')
}

var getMessage = function (message) {
  return Message.findOne({'_id': message._id}).populate('_comments')
}

var getMessages = function (object) {
  return Promise.all(object._messages, getMessage)
                .then(function (results) {
                  return obj._messages = results;
                })
}

var parseTasks = function (objects) {
  return Promise.all(objects, getMessages)
}

var getTests = function (account) {
  return getTest.then(getTask).then(parseTasks)
}

module.exports = function (account, callback) {  
  return getUser.then(function (user) {
    return getTests.then(function (tests) {
      return {
        user: user,
        tests: tests
      }
    })
  }).catch(function (error) {
    return error
  }
}