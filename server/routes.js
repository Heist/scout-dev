// routes.js
module.exports = function(app, passport) {
// CONFIGURATION =====================================================

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.

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
                    test1.desc = "1. Understand people's current fitness habits\ 2. Understand whether they look for digital tools to help modify their fitness habits\ 3. Determine if family, friends or peers play an important role in shaping people's fitness behaviour.";
                    test1.kind = "interview";
                    test1.name = "Ex. Customer Interview - Fitness Habits";
                    
                    test1.save(function(err, test){
                        if(err){console.log(err);}

                        var task1test1 = new Task();

                        task1test1._test = test._id;
                        task1test1.name = "Introduction";
                        task1test1.desc = "Note: This is to set the tone for the interviewee or group. We’ll introduce ourselves and set “ground rules” for the discussion.\ - My name is __________.\ - Thanks for talking to us today, we’ll be about 60 minutes.\ - We’re constantly trying to improve our product, and getting your frank feedback is a really important part of that.\ - This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\ - No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\ - We’ll be running through a few questions and scenarios from your day. \ - We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\ - You’ll be recorded, but this information will not be distributed beyond our team.\ - Alright, let's get started!";
                        task1test1.index = 0;
                        test._tasks.push(task1test1._id);
                        task1test1.save();

                        var task2test1 = new Task();

                        task2test1._test = test._id;
                        task2test1.name = "Background Information";
                        task2test1.desc = "- What is your name and age?\ - Where do you live?\ - What kind of work do you do?\ - For how long have you been doing that?\ - What kinds of activities, hobbies or projects do you like to do when you’re not working?";
                        task2test1.index = 1;
                        test._tasks.push(task2test1._id);
                        task2test1.save();

                        var task3test1 = new Task();

                        task3test1._test = test._id;
                        task3test1.name = "Current Activities and Habits";
                        task3test1.desc = "- What do you do to take care of yourself? To stay in shape? To stay active?\ - Can you list the sports, exercise, classes you participate in?\ - How many times did you participate in the activities in the last week?\ - Are there any other healthy habits in your day?";
                        task3test1.index = 2;
                        test._tasks.push(task3test1._id);
                        task3test1.save();

                        var task4test1 = new Task();

                        task4test1._test = test._id;
                        task4test1.name = "Fitness Apps and Tools";
                        task4test1.desc = "- Have you used any apps or websites or other programs to help you with fitness? Which ones?\ - What did you want them to do for you?\ - What was your expected out come from using these apps?\ - What do you like about them?\ - What do you dislike about them?\ - Did you pay for them? Why? Why not?";
                        task4test1.index = 3;
                        test._tasks.push(task4test1._id);
                        task4test1.save();

                        var task5test1 = new Task();

                        task5test1._test = test._id;
                        task5test1.name = "Friends and Social Activity";
                        task5test1.desc = "- Who (e.g. friends, family, coaches, teachers?) helps keep you active?\ - How do they help you?\ - Who (e.g. friends, family, coaches, teachers?) is a barrier to you being active?\ - How do they prevent you from being active?\ - Do you share info about your workouts or your goals with anyone?\ - When? Why? How?\ - What (if anything) do you do to keep track of what you’re doing?\ - How does that help you?";
                        task5test1.index = 4;
                        test._tasks.push(task5test1._id);
                        task5test1.save();

                        var task6test1 = new Task();
                        
                        task6test1._test = test._id;
                        task6test1.name = "Exercise Habits";
                        task6test1.desc = "- How have your exercise habits changed over time?\ - What did you used to do 6 months ago?\ - What did you used to do where at your fittest?\ - Have the software and tools you use changed? Which did you used to use?";
                        task6test1.index = 5;
                        test._tasks.push(task6test1._id);
                        task6test1.save();

                        var task7test1 = new Task();
                        
                        task7test1._test = test._id;
                        task7test1.name = "Conclusion and Thank You";
                        task7test1.desc = "- Thanks participant for their time\ - Get them to initial sign-in sheet, and hand them their reimbursement\ - Provide assistance with leaving building\ - High fives!";
                        task7test1.index = 6;
                        test._tasks.push(task7test1._id);
                        task7test1.save();

                        test.save();
                    });

                    

                    var test2 = new Test();

                    test2.created_by_account = req.user._account;
                    test2.created_by_user = req.user._id;
                    test2.desc = "1. Understand whether Email Inbox is designed according to users' expectations for email clients.\ 2. Measure whether Delete, Add Recipient and Reply functions are intuitive for users.\ 3. Evaluate if the iconography used in the Email Inbox is easily understood by users.";
                    test2.kind = "prototype";
                    test2.link = "http://invis.io/2J1SN6AYV";
                    test2.name = "Ex. Prototype Testing - Email Inbox App";
                    test2.save(function(err, test){
                        if(err){console.log(err);}

                        var test2task1 = new Task();

                        test2task1._test = test._id;
                        test2task1.name = "Introduction";
                        test2task1.desc = "Note: This is to set the tone for the interviewee. We’ll introduce ourselves and set “ground rules” for the discussion.\ - My name is __________.\ - Thanks for talking to us today, we’ll be about 30 minutes.\ - We’re going to talk about a new app we're designing.\ - This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\ - No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\ - We’ll have you play around with a few things we’ve been working on. We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\ - You’ll be recorded, but this information will not be distributed.";
                        test2task1.index = 0;
                        test._tasks.push(test2task1._id);
                        test2task1.save();

                        var test2task2 = new Task();

                        test2task2._test = test._id;
                        test2task2.name = "Email Habits Background";
                        test2task2.desc = "- Which company do you use for your email accounts?\ - Do you have separate providers for your personal and work accounts?\ - As a percentage, how much of your email creation and management do you do on your mobile devices?\ - Which mobile device do you use?\ - Do you use any email apps, other than those that came pre-installed? If so, which ones?\ - Why did you switch email apps from those that are on your phone?";
                        test2task2.index = 1;
                        test._tasks.push(test2task2._id);
                        test2task2.save();

                        var test2task3 = new Task();

                        test2task3._test = test._id;
                        test2task3.name = "Task 1 - Landing in your inbox";
                        test2task3.desc = "Ok, great, now we've going to get you to play with an email app we are designing. Pick up the phone in front of you and unlock it. I want you to pretend that you we're out shopping, and just remembered that you needed to email a friend to make plans for dinner.\ - What is the first thing you notice when you land in your inbox?\ - Walk me through the elements you see on the screen.\ - Talk me through your thought process when you are confronted with unread emails.\ - After seeing your inbox, what is the first action you want to take?";
                        test2task3.index = 2;
                        test._tasks.push(test2task3._id);
                        test2task3.save();

                        var test2task4 = new Task();

                        test2task4._test = test._id;
                        test2task4.name = "Task 2 - Managing unread email";
                        test2task4.desc = "Alright, let's read that email from Billy Kiely. Tap on that item.\ - What is the first thing you notice when you land on this screen?\ - Does the oder that the messages are displayed in make sense to you?\ - If you wanted to reply to Laura, what would you do?\ - If you wanted to reply to Billy, what would you do?\ - If you decided you don't really want to see these people, and wanted to delete these emails, what would you do next? Why?";
                        test2task4.index = 3;
                        test._tasks.push(test2task4._id);
                        test2task4.save();

                        var test2task5 = new Task();

                        test2task5._test = test._id;
                        test2task5.name = "Task 3 - Writing a new email";
                        test2task5.desc = "Alright, let's send that recipe to your friend. So let's write a new email.\ - Where would you click in your inbox to start writing a new email?\ - What is the first action you take when you are sending a new email?\ - Do you understand what all of these labels mean?\ - If you want to add someone to the 'To:' field, how would you do that?\ - Why do you think the plus sign turned into a minus sign once you added a recipient to this email?\ - Talk me through how you identify your contacts when you add them to an email?\ - Now type out your email, (email text should appear when they click on Subject or Email Input fields,) and send it.\ - What did you think of that? Was that what you expected? Why or why not?";
                        test2task5.index = 4;
                        test._tasks.push(test2task5._id);
                        test2task5.save();

                        var test2task6 = new Task();

                        test2task6._test = test._id;
                        test2task6.name = "Task 4 - Deleting emails";
                        test2task6.desc = "Ok, so your are back in your inbox. Now it is time to clear out unwanted messages. Jon is trying to make dinner plans with you, but you already have plans with Billy. Let's just delete Jon's message without replying.\ - What would you do next? Why?\ - Is there anything else you would do at this point?\ - What additional info would have helped?\ - Is that a familiar action for you based on other apps you use regularly?";
                        test2task6.index = 5;
                        test._tasks.push(test2task6._id);
                        test2task6.save();

                        var test2task7 = new Task();

                        test2task7._test = test._id;
                        test2task7.name = "Thoughts and Feedback on the Experience";
                        test2task7.desc = "- Having walked through this experience now, how did it compare to your experiences with other email apps?\ - Is it better or worse? Why?\ - Do you think you would use this email app?\ - What did you feel was missing? \ - What did you find confusing?\ - Do you have any other thoughts or feedback for us?";
                        test2task7.index = 6;
                        test._tasks.push(test2task7._id);
                        test2task7.save();

                        var test2task8 = new Task();

                        test2task8._test = test._id;
                        test2task8.name = "Conclusion and Thank You";
                        test2task8.desc = "- Thanks participant for their time\ - Get them to initial sign-in sheet, and hand them their payment cheque\ - Provide assistance with leaving building\ - High fives!";
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
        var promise =
            Test.find({'_id' : test_id}).populate('_subjects').exec(function(err, test){
                if(err){res.send(err);}

            });

        promise.then(function(test){
            reply.test = test;

            return Task.find({'_test': test_id})
                        .select('_id summary name pass_fail desc _messages index _test visible')
                        .exec();

        }).then(function(tasks){
            reply.tasks = tasks;
            // console.log('tasks', tasks);
            console.log('report number', req.params._id);
            console.log('test_id number', test_id);

            return Tag.find({'_test' : test_id})
                      .exec();
        
        }).then(function(tags){
            reply.tags = tags;
            console.log('we got tags', tags);

            return    Message.find({'_test': test_id, $or: [{ fav_task : true }, { fav_tag : true }]})
                        .populate({path: '_subject', 'select': 'name -_id'})
                        .select('_subject body created_by _id _test _task fav_tag fav_task')
                        .exec();
            
        }).then(function(messages){
            
            reply.messages = messages;

            res.json(reply);
        
        }).then(null, function(err){
            if(err) {return res.send (err);}
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