// default_tests.js - generates first-time signup tests
'use strict';

module.exports = function(account, id, callback, debug){
    // on first login via signup, create a test for this user.

    var Task    = require('../data/task');
    var Test    = require('../data/test');
    var async   = require('async');

    var new_test_1 = {
        created_by_account: account,
        created_by_user : id,
        name : "Ex. Customer Interview - Fitness Habits",
        desc : "1. Understand people's current fitness habits \n"+
               "2. Understand whether they look for digital tools to help modify their fitness habits\n"+
               "3. Determine if family, friends or peers play an important role in shaping people's fitness behaviour.",
        kind : "interview"
    };

    var new_test_2 = {
        created_by_account: account,
        created_by_user : id,
        desc : "1. Understand whether Email Inbox is designed according to users' expectations for email clients.\n"+
               "2. Measure whether Delete, Add Recipient and Reply functions are intuitive for users.\n"+
               "3. Evaluate if the iconography used in the Email Inbox is easily understood by users.",
        kind : "prototype",
        link : "http://invis.io/2J1SN6AYV",
        name : "Ex. Prototype Testing - Email Inbox App"
    };

    async.parallel([
        function(callback){
            Test.create(new_test_1 , function(err, test){
                var tasks = [
                    {
                        _test : test._id,
                        name  :"Introduction",
                        desc  :"Note: This is to set the tone for the interviewee or group. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 60 minutes.\n- We’re constantly trying to improve our product, and getting your frank feedback is a really important part of that.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll be running through a few questions and scenarios from your day. \n- We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed beyond our team.\n- Alright, let's get started!",
                        index : 0
                    }, {
                        _test : test._id,
                        name  : "Background Information",
                        desc  : "- What is your name and age? \n - Where do you live? \n - What kind of work do you do?\n- For how long have you been doing that?\n- What kinds of activities, hobbies or projects do you like to do when you’re not working?",
                        index : 1
                    },
                    {
                        _test : test._id,
                        name  : "Current Activities and Habits",
                        desc  : "- What do you do to take care of yourself? To stay in shape? To stay active? \n - Can you list the sports, exercise, classes you participate in?\n- How many times did you participate in the activities in the last week?\n- Are there any other healthy habits in your day?",
                        index : 2
                    },
                    {
                        _test : test._id,
                        name  : "Fitness Apps and Tools",
                        desc  : "- Have you used any apps or websites or other programs to help you with fitness? Which ones?\n- What did you want them to do for you?\n- What was your expected out come from using these apps?\n- What do you like about them?\n- What do you dislike about them?\n- Did you pay for them? Why? Why not?",
                        index : 3
                    },
                    {
                        _test : test._id,
                        name  : "Friends and Social Activity",
                        desc  : "- Who (e.g. friends, family, coaches, teachers?) helps keep you active?\n- How do they help you?\n- Who (e.g. friends, family, coaches, teachers?) is a barrier to you being active?\n- How do they prevent you from being active?\n- Do you share info about your workouts or your goals with anyone?\n- When? Why? How?\n- What (if anything) do you do to keep track of what you’re doing?\n- How does that help you?",
                        index : 4
                    },
                    {
                        _test : test._id,
                        name  : "Exercise Habits",
                        desc  : "- How have your exercise habits changed over time?\n- What did you used to do 6 months ago?\n- What did you used to do where at your fittest?\n- Have the software and tools you use changed? Which did you used to use?",
                        index : 5
                    },
                    {
                        _test : test._id,
                        name  : "Conclusion and Thank You",
                        desc  : "- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their reimbursement\n- Provide assistance with leaving building\n- High fives!",
                        index : 6
                    }];

                Task.create(tasks, function(err, t0, t1, t2, t3, t4, t5, t6){
                    test._tasks.push(t0._id, t1._id, t2._id, t3._id, t4._id, t5._id, t6._id);
                    test.save(function(err, new_test){
                        callback(null, new_test);
                    });
                });
            });
        },
        function(callback){
            Test.create(new_test_2 , function(err, test){
                var tasks = [{
                    _test: test._id,
                    name :"Introduction",
                    desc :"Note: This is to set the tone for the interviewee. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 30 minutes.\n- We’re going to talk about a new app we're designing.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll have you play around with a few things we’ve been working on. We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed.",
                    index:0
                },{
                    _test: test._id,
                    name :"Email Habits Background",
                    desc :"- Which company do you use for your email accounts?\n- Do you have separate providers for your personal and work accounts?\n- As a percentage, how much of your email creation and management do you do on your mobile devices?\n- Which mobile device do you use?\n- Do you use any email apps, other than those that came pre-installed? If so, which ones?\n- Why did you switch email apps from those that are on your phone?",
                    index:1
                },{
                    _test: test._id,
                    name :"Task 1 - Landing in your inbox",
                    desc :"Ok, great, now we've going to get you to play with an email app we are designing. Pick up the phone in front of you and unlock it. I want you to pretend that you we're out shopping, and just remembered that you needed to email a friend to make plans for dinner.\n- What is the first thing you notice when you land in your inbox?\n- Walk me through the elements you see on the screen.\n- Talk me through your thought process when you are confronted with unread emails.\n- After seeing your inbox, what is the first action you want to take?",
                    index:2
                },{
                    _test: test._id,
                    name :"Task 2 - Managing unread email",
                    desc :"Alright, let's read that email from Billy Kiely. Tap on that item.\n- What is the first thing you notice when you land on this screen?\n- Does the oder that the messages are displayed in make sense to you?\n- If you wanted to reply to Laura, what would you do?\n- If you wanted to reply to Billy, what would you do?\n- If you decided you don't really want to see these people, and wanted to delete these emails, what would you do next? Why?",
                    index:3
                },{
                    _test: test._id,
                    name :"Task 3 - Writing a new email",
                    desc :"Alright, let's send that recipe to your friend. So let's write a new email.\n- Where would you click in your inbox to start writing a new email?\n- What is the first action you take when you are sending a new email?\n- Do you understand what all of these labels mean?\n- If you want to add someone to the 'To:' field, how would you do that?\n- Why do you think the plus sign turned into a minus sign once you added a recipient to this email?\n- Talk me through how you identify your contacts when you add them to an email?\n- Now type out your email, (email text should appear when they click on Subject or Email Input fields,) and send it.\n- What did you think of that? Was that what you expected? Why or why not?",
                    index:4
                },{
                    _test: test._id,
                    name :"Task 4 - Deleting emails",
                    desc :"Ok, so your are back in your inbox. Now it is time to clear out unwanted messages. Jon is trying to make dinner plans with you, but you already have plans with Billy. Let's just delete Jon's message without replying.\n- What would you do next? Why?\n- Is there anything else you would do at this point?\n- What additional info would have helped?\n- Is that a familiar action for you based on other apps you use regularly?",
                    index:5
                },{
                    _test: test._id,
                    name :"Thoughts and Feedback on the Experience",
                    desc :"- Having walked through this experience now, how did it compare to your experiences with other email apps?\n- Is it better or worse? Why?\n- Do you think you would use this email app?\n- What did you feel was missing? \n- What did you find confusing?\n- Do you have any other thoughts or feedback for us?",
                    index:6
                },{
                    _test: test._id,
                    name :"Conclusion and Thank You",
                    desc :"- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their payment cheque\n- Provide assistance with leaving building\n- High fives!",
                    index:7
                }];

                Task.create(tasks, function(err, t0, t1, t2, t3, t4, t5, t6, t7){
                    test._tasks.push(t0._id, t1._id, t2._id, t3._id, t4._id, t5._id, t6._id, t7._id);
                    test.save(function(err, new_test){
                        callback(null, new_test);
                    });
                });
            });
        }
    ],
    // optional callback
    function(err, results){
        Test.find({'created_by_user' : id}).populate('_tasks').exec();
        callback(null, results);
    });
}