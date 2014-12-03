// routes.js
module.exports = function(app, passport) {
// CONFIGURATION =====================================================

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var async = require('async');
    var _ = require('underscore');

    // various api hooks for reports
    var Trello  = require('node-trello');

    // load data storage models
    var Message = require('./models/data/message');
    var Task    = require('./models/data/task');
    var Test    = require('./models/data/test');
    var Tag     = require('./models/data/tag');
    var Subject    = require('./models/data/subject');
    var User    = require('./models/auth/user');
    var Invitation = require('./models/auth/invitation');

    // console logging
    app.use(function(req, res, next) {
        // console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

// AUTH ROUTES ============================================
// route middleware to ensure user is logged in - ajax get
    function isLoggedInAjax(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send( 401, "unauthorized request");
        } else {
            // console.log('login good');
            next();
        }
    }

// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
    }

// LOGIN ROUTES ===========================================

    // is someone logged in?
    app.get('/loggedin', function(req, res) {
            res.send(req.isAuthenticated() ? {
                    _id : req.user._id, 
                    name: req.user.name, 
                    email: req.user.local.email, 
                    account:req.user._account, 
                    trello : req.user.trello.id 
                } : '0');
        });

    // who's logged in?
    app.get('/auth/login', isLoggedInAjax, function(req, res) {
            return res.json(req.user._id);
        });

    // process the login form
    app.post('/auth/login', function(req, res, next) {
        // make sure that you're logged out before trying to log anyone else in
        // req.logout();

        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return res.json(err);
            }
            if (user.error) {
                return res.json({ error: user.error });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }

                return res.json({ user: mongoose.Types.ObjectId(req.user._id), redirect: '/overview', msg:'login worked' });
            });
        })(req, res);
    });

    // process the signup form
    app.post('/auth/signup', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return res.json(err); }
            
            if (user.error) {
                return res.json({ error: user.error });
            }
            if (info){
                // console.log('auth signup info', info);
            }

            if (user){
                // console.log('auth signup user', user);
            }
            
            req.logIn(user, function(err) {
                if (err) { return res.json(err); }
                // console.log('auth/signup authenticated user', req.user);

                // on first login via signup, create a test for this user.
                // if(req.user.login === 1 ){
                console.log('new signup');

                var test1 = new Test();

                test1.created_by_account = req.user._account;
                test1.created_by_user = req.user._id;
                test1.desc = "1. Understand people's current fitness habits \n 2. Understand whether they look for digital tools to help modify their fitness habits\n3. Determine if family, friends or peers play an important role in shaping people's fitness behaviour.";
                test1.kind = "interview";
                test1.name = "Ex. Customer Interview - Fitness Habits";
                
                test1.save(function(err, test){
                    if(err){console.log(err);}

                    var task1test1 = new Task();

                    task1test1._test = test._id;
                    task1test1.name = "Introduction";
                    task1test1.desc = "Note: This is to set the tone for the interviewee or group. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 60 minutes.\n- We’re constantly trying to improve our product, and getting your frank feedback is a really important part of that.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll be running through a few questions and scenarios from your day. \n- We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed beyond our team.\n- Alright, let's get started!";
                    task1test1.index = 0;
                    test._tasks.push(task1test1._id);
                    task1test1.save();

                    var task2test1 = new Task();

                    task2test1._test = test._id;
                    task2test1.name = "Background Information";
                    task2test1.desc = "- What is your name and age? \n - Where do you live? \n - What kind of work do you do?\n- For how long have you been doing that?\n- What kinds of activities, hobbies or projects do you like to do when you’re not working?";
                    task2test1.index = 1;
                    test._tasks.push(task2test1._id);
                    task2test1.save();

                    var task3test1 = new Task();

                    task3test1._test = test._id;
                    task3test1.name = "Current Activities and Habits";
                    task3test1.desc = "- What do you do to take care of yourself? To stay in shape? To stay active? \n - Can you list the sports, exercise, classes you participate in?\n- How many times did you participate in the activities in the last week?\n- Are there any other healthy habits in your day?";
                    task3test1.index = 2;
                    test._tasks.push(task3test1._id);
                    task3test1.save();

                    var task4test1 = new Task();

                    task4test1._test = test._id;
                    task4test1.name = "Fitness Apps and Tools";
                    task4test1.desc = "- Have you used any apps or websites or other programs to help you with fitness? Which ones?\n- What did you want them to do for you?\n- What was your expected out come from using these apps?\n- What do you like about them?\n- What do you dislike about them?\n- Did you pay for them? Why? Why not?";
                    task4test1.index = 3;
                    test._tasks.push(task4test1._id);
                    task4test1.save();

                    var task5test1 = new Task();

                    task5test1._test = test._id;
                    task5test1.name = "Friends and Social Activity";
                    task5test1.desc = "- Who (e.g. friends, family, coaches, teachers?) helps keep you active?\n- How do they help you?\n- Who (e.g. friends, family, coaches, teachers?) is a barrier to you being active?\n- How do they prevent you from being active?\n- Do you share info about your workouts or your goals with anyone?\n- When? Why? How?\n- What (if anything) do you do to keep track of what you’re doing?\n- How does that help you?";
                    task5test1.index = 4;
                    test._tasks.push(task5test1._id);
                    task5test1.save();

                    var task6test1 = new Task();
                    
                    task6test1._test = test._id;
                    task6test1.name = "Exercise Habits";
                    task6test1.desc = "- How have your exercise habits changed over time?\n- What did you used to do 6 months ago?\n- What did you used to do where at your fittest?\n- Have the software and tools you use changed? Which did you used to use?";
                    task6test1.index = 5;
                    test._tasks.push(task6test1._id);
                    task6test1.save();

                    var task7test1 = new Task();
                    
                    task7test1._test = test._id;
                    task7test1.name = "Conclusion and Thank You";
                    task7test1.desc = "- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their reimbursement\n- Provide assistance with leaving building\n- High fives!";
                    task7test1.index = 6;
                    test._tasks.push(task7test1._id);
                    task7test1.save();

                    test.save();
                });

                var test2 = new Test();

                test2.created_by_account = req.user._account;
                test2.created_by_user = req.user._id;
                test2.desc = "1. Understand whether Email Inbox is designed according to users' expectations for email clients.\n2. Measure whether Delete, Add Recipient and Reply functions are intuitive for users.\n3. Evaluate if the iconography used in the Email Inbox is easily understood by users.";
                test2.kind = "prototype";
                test2.link = "http://invis.io/2J1SN6AYV";
                test2.name = "Ex. Prototype Testing - Email Inbox App";
                test2.save(function(err, test){
                    if(err){console.log(err);}

                    var test2task1 = new Task();

                    test2task1._test = test._id;
                    test2task1.name = "Introduction";
                    test2task1.desc = "Note: This is to set the tone for the interviewee. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 30 minutes.\n- We’re going to talk about a new app we're designing.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll have you play around with a few things we’ve been working on. We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed.";
                    test2task1.index = 0;
                    test._tasks.push(test2task1._id);
                    test2task1.save();

                    var test2task2 = new Task();

                    test2task2._test = test._id;
                    test2task2.name = "Email Habits Background";
                    test2task2.desc = "- Which company do you use for your email accounts?\n- Do you have separate providers for your personal and work accounts?\n- As a percentage, how much of your email creation and management do you do on your mobile devices?\n- Which mobile device do you use?\n- Do you use any email apps, other than those that came pre-installed? If so, which ones?\n- Why did you switch email apps from those that are on your phone?";
                    test2task2.index = 1;
                    test._tasks.push(test2task2._id);
                    test2task2.save();

                    var test2task3 = new Task();

                    test2task3._test = test._id;
                    test2task3.name = "Task 1 - Landing in your inbox";
                    test2task3.desc = "Ok, great, now we've going to get you to play with an email app we are designing. Pick up the phone in front of you and unlock it. I want you to pretend that you we're out shopping, and just remembered that you needed to email a friend to make plans for dinner.\n- What is the first thing you notice when you land in your inbox?\n- Walk me through the elements you see on the screen.\n- Talk me through your thought process when you are confronted with unread emails.\n- After seeing your inbox, what is the first action you want to take?";
                    test2task3.index = 2;
                    test._tasks.push(test2task3._id);
                    test2task3.save();

                    var test2task4 = new Task();

                    test2task4._test = test._id;
                    test2task4.name = "Task 2 - Managing unread email";
                    test2task4.desc = "Alright, let's read that email from Billy Kiely. Tap on that item.\n- What is the first thing you notice when you land on this screen?\n- Does the oder that the messages are displayed in make sense to you?\n- If you wanted to reply to Laura, what would you do?\n- If you wanted to reply to Billy, what would you do?\n- If you decided you don't really want to see these people, and wanted to delete these emails, what would you do next? Why?";
                    test2task4.index = 3;
                    test._tasks.push(test2task4._id);
                    test2task4.save();

                    var test2task5 = new Task();

                    test2task5._test = test._id;
                    test2task5.name = "Task 3 - Writing a new email";
                    test2task5.desc = "Alright, let's send that recipe to your friend. So let's write a new email.\n- Where would you click in your inbox to start writing a new email?\n- What is the first action you take when you are sending a new email?\n- Do you understand what all of these labels mean?\n- If you want to add someone to the 'To:' field, how would you do that?\n- Why do you think the plus sign turned into a minus sign once you added a recipient to this email?\n- Talk me through how you identify your contacts when you add them to an email?\n- Now type out your email, (email text should appear when they click on Subject or Email Input fields,) and send it.\n- What did you think of that? Was that what you expected? Why or why not?";
                    test2task5.index = 4;
                    test._tasks.push(test2task5._id);
                    test2task5.save();

                    var test2task6 = new Task();

                    test2task6._test = test._id;
                    test2task6.name = "Task 4 - Deleting emails";
                    test2task6.desc = "Ok, so your are back in your inbox. Now it is time to clear out unwanted messages. Jon is trying to make dinner plans with you, but you already have plans with Billy. Let's just delete Jon's message without replying.\n- What would you do next? Why?\n- Is there anything else you would do at this point?\n- What additional info would have helped?\n- Is that a familiar action for you based on other apps you use regularly?";
                    test2task6.index = 5;
                    test._tasks.push(test2task6._id);
                    test2task6.save();

                    var test2task7 = new Task();

                    test2task7._test = test._id;
                    test2task7.name = "Thoughts and Feedback on the Experience";
                    test2task7.desc = "- Having walked through this experience now, how did it compare to your experiences with other email apps?\n- Is it better or worse? Why?\n- Do you think you would use this email app?\n- What did you feel was missing? \n- What did you find confusing?\n- Do you have any other thoughts or feedback for us?";
                    test2task7.index = 6;
                    test._tasks.push(test2task7._id);
                    test2task7.save();

                    var test2task8 = new Task();

                    test2task8._test = test._id;
                    test2task8.name = "Conclusion and Thank You";
                    test2task8.desc = "- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their payment cheque\n- Provide assistance with leaving building\n- High fives!";
                    test2task8.index = 7;
                    test._tasks.push(test2task8._id);
                    test2task8.save();
                    
                    test.save();
                });
                return res.json({ 'user': req.user._id, 'name':req.user.name, redirect: '/overview', msg:'register user worked' });
            });
        })(req, res);
    });

    app.post('/auth/logout', function(req, res) {
        // console.log('logout request', req);
        req.logout();
        res.json({ redirect: '/login' });
    });


// PUBLIC ROUTES ==========================================



// Debug Routes -------------------
    app.route('/debug/test')
    .get(function(req,res){
        Test.find()
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

    app.route('/debug/test/:_id')
    .get(function(req,res){
        Test.find({'_id': req.params._id})
            .populate('_tasks')
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });    

    app.route('/debug/task')
    .get(function(req,res){
        Task.find()
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

    app.route('/debug/message')
    .get(function(req,res){
        Message.find()
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

    app.route('/debug/tag')
        .get(function(req,res){
            Tag.find(function(err, docs) {
                    if(err){res.send(err);}

                    res.json(docs);
                });
        });

    app.route('/debug/user')
        .get(function(req,res){
            User.find(function(err, users) {
                    if(err){res.send(err);}

                    res.json(users);
                });
        });

    app.route('/debug/invite')
        .get(function(req,res){
            Invitation.find(function(err, invites) {
                    if(err){res.send(err);}

                    res.json(invites);
                });
        });

     app.route('/debug/subject')
    .get(function(req,res){
        Subject.find()
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

// PUBLIC REPORT ROUTE ==============================================
// for some reason I can't require this and still have it be public
//  ¯\_(ツ)_/¯

    app.route('/api/report/:_id')
    .get(function(req, res){
        console.log('touched report get', req.params._id);

        // var t = new Trello ();

        var test_id = mongoose.Types.ObjectId(req.params._id);
        var reply = {};

        async.parallel({
                    tags: function(callback){
                        Tag.find({'_test' : req.params._id })
                            .populate('_messages')
                            .exec(function(err, docs){
                                if (err) {console.log(err);}
                                callback(null, docs);
                            });
                    },
                    tasks: function(callback){
                        Task.find({'_test': req.params._id})
                            .sort({ index: 'asc'})
                            .populate('_messages')
                            .exec(function(err, docs){
                                if (err) {console.log(err);}
                                callback(null, docs);
                            });
                    },
                    test: function(callback){
                        Test.find({'_id' : req.params._id})
                            .limit(1)
                            .exec(function(err, docs){
                                if(err){console.log(err);}
                                callback(null, docs);
                            });
                    },
                    messages: function(callback){
                        Message.find({ '_test':{$in: [req.params._id]}})
                               .populate({path:'_subject', select: 'name' })
                               .exec(function(err, docs){
                                    if(err){console.log(err);}
                                    callback(null, docs);
                                });
                    }
                },
                function(err, results) {
                    // results is now equals to: {one: 1, two: 2}
                    var return_array = [];
                    _.each(results.test, function(test){
                        return_array.push(test);
                    });
                    _.each(results.tasks, function(task){
                        return_array.push(task);
                    });
                    _.each(results.tags, function(tag){
                        return_array.push(tag);
                    });
                    // callback(null, );
                    res.json({nav_list: return_array, messages: results.messages});
                });

    });

// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS ===============
// this effectively prevents unlogged users from getting data

    app.use('/api',  isLoggedInAjax, function (req, res, next) {
        // for calls that start with api....
        // console.log('touched the api tag');

        next();
    });


// CONNECT ROUTES =========================================

    app.get('/connect/trello',
        passport.authorize('trello-authz', { failureRedirect: '/account' })
        // ,function(req, res) {
        //     res.send({trello : true});
        // }
        );


    app.get('/connect/trello/callback',
      passport.authorize('trello-authz', { failureRedirect: '/account' }),
      function(req, res) {
        // this sends things to the popup window.
        // var script = '$scope.parentWindow = window.opener.$windowScope;
        //              console.log($scope.connector);';
        res.send('<html><head><script>window.opener.inviteCallback(); window.close();</script>'+
                '</head><body><h1>Thanks for attaching your account.</h1></body></html>');
    });

    app.delete('/connect/trello', function(req, res){
        // console.log(req.body);

        req.user.trello.id = '';
        req.user.trello.token = '';
        req.user.trello.tokenSecret = '';
        req.user.save();

        res.json({trello : false});
    });

// ACCOUNT ROUTES =========================================
    require('./routes/account')(app);

// OBJECT ROUTES ==========================================

// Session Routes
    require('./routes/session')(app);

// Test Routes
    require('./routes/test')(app);

// Task Routes 
    require('./routes/task')(app);

// Task Routes 
    require('./routes/message')(app);

// Tag Routes
    require('./routes/tag')(app);

// Subject Routes
    require('./routes/subject')(app);


// LIVE ROUTES ============================================

// Run A Test
    require('./routes/run')(app);

// Do A Summary
    require('./routes/summary')(app);

};