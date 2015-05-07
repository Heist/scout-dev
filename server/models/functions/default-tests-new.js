// default-tests-new.js - generates first-time signup tests
'use strict';

module.exports = function(account, id, callback){
// on first login via signup, create a test for this user.

// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Bluebird = require('bluebird');
    var models   = Bluebird.promisifyAll(require('../../models'));

// Abstract and create tests 
var tests = [
    {
        'test'  : {
                    created_by_account: account,
                    created_by_user : id,
                    name : "Ex. Customer Interview - Fitness Habits",
                    desc : "1. Understand people's current fitness habits \n"+
                           "2. Understand whether they look for digital tools to help modify their fitness habits\n"+
                           "3. Determine if family, friends or peers play an important role in shaping people's fitness behaviour.",
                    kind : "interview"
            },
        'tags'  : ['need','painpoint','activity','touchpoint','quote'],
        'tasks' : [
                    {
                        name  :"Introduction",
                        desc  :"Note: This is to set the tone for the interviewee or group. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 60 minutes.\n- We’re constantly trying to improve our product, and getting your frank feedback is a really important part of that.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll be running through a few questions and scenarios from your day. \n- We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed beyond our team.\n- Alright, let's get started!"
                    }, {
                        name  : "Background Information",
                        desc  : "- What is your name and age? \n - Where do you live? \n - What kind of work do you do?\n- For how long have you been doing that?\n- What kinds of activities, hobbies or projects do you like to do when you’re not working?"
                    },
                    {
                        name  : "Current Activities and Habits",
                        desc  : "- What do you do to take care of yourself? To stay in shape? To stay active? \n - Can you list the sports, exercise, classes you participate in?\n- How many times did you participate in the activities in the last week?\n- Are there any other healthy habits in your day?"
                    },
                    {
                        name  : "Fitness Apps and Tools",
                        desc  : "- Have you used any apps or websites or other programs to help you with fitness? Which ones?\n- What did you want them to do for you?\n- What was your expected out come from using these apps?\n- What do you like about them?\n- What do you dislike about them?\n- Did you pay for them? Why? Why not?"
                    },
                    {
                        name  : "Friends and Social Activity",
                        desc  : "- Who (e.g. friends, family, coaches, teachers?) helps keep you active?\n- How do they help you?\n- Who (e.g. friends, family, coaches, teachers?) is a barrier to you being active?\n- How do they prevent you from being active?\n- Do you share info about your workouts or your goals with anyone?\n- When? Why? How?\n- What (if anything) do you do to keep track of what you’re doing?\n- How does that help you?"   
                    },
                    {
                        name  : "Exercise Habits",
                        desc  : "- How have your exercise habits changed over time?\n- What did you used to do 6 months ago?\n- What did you used to do where at your fittest?\n- Have the software and tools you use changed? Which did you used to use?"
                    },
                    {
                        name  : "Conclusion and Thank You",
                        desc  : "- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their reimbursement\n- Provide assistance with leaving building\n- High fives!"
                    }]
    },
    {
        'test'  : {
            created_by_account: account,
            created_by_user : id,
            desc : "1. Understand whether Email Inbox is designed according to users' expectations for email clients.\n"+
                   "2. Measure whether Delete, Add Recipient and Reply functions are intuitive for users.\n"+
                   "3. Evaluate if the iconography used in the Email Inbox is easily understood by users.",
            kind : "prototype",
            link : "http://invis.io/2J1SN6AYV",
            name : "Ex. Prototype Testing - Email Inbox App"
        },
        'tags'  :['issue', 'comprehension', 'preference', 'effort', 'quote'],
        'tasks' : [{
                    name :"Introduction",
                    desc :"Note: This is to set the tone for the interviewee. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 30 minutes.\n- We’re going to talk about a new app we're designing.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll have you play around with a few things we’ve been working on. We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed."
                },{
                    name :"Email Habits Background",
                    desc :"- Which company do you use for your email accounts?\n- Do you have separate providers for your personal and work accounts?\n- As a percentage, how much of your email creation and management do you do on your mobile devices?\n- Which mobile device do you use?\n- Do you use any email apps, other than those that came pre-installed? If so, which ones?\n- Why did you switch email apps from those that are on your phone?"
                },{
                    name :"Task 1 - Landing in your inbox",
                    desc :"Ok, great, now we've going to get you to play with an email app we are designing. Pick up the phone in front of you and unlock it. I want you to pretend that you we're out shopping, and just remembered that you needed to email a friend to make plans for dinner.\n- What is the first thing you notice when you land in your inbox?\n- Walk me through the elements you see on the screen.\n- Talk me through your thought process when you are confronted with unread emails.\n- After seeing your inbox, what is the first action you want to take?"
                },{
                    name :"Task 2 - Managing unread email",
                    desc :"Alright, let's read that email from Billy Kiely. Tap on that item.\n- What is the first thing you notice when you land on this screen?\n- Does the oder that the messages are displayed in make sense to you?\n- If you wanted to reply to Laura, what would you do?\n- If you wanted to reply to Billy, what would you do?\n- If you decided you don't really want to see these people, and wanted to delete these emails, what would you do next? Why?"
                },{
                    name :"Task 3 - Writing a new email",
                    desc :"Alright, let's send that recipe to your friend. So let's write a new email.\n- Where would you click in your inbox to start writing a new email?\n- What is the first action you take when you are sending a new email?\n- Do you understand what all of these labels mean?\n- If you want to add someone to the 'To:' field, how would you do that?\n- Why do you think the plus sign turned into a minus sign once you added a recipient to this email?\n- Talk me through how you identify your contacts when you add them to an email?\n- Now type out your email, (email text should appear when they click on Subject or Email Input fields,) and send it.\n- What did you think of that? Was that what you expected? Why or why not?"
                },{
                    name :"Task 4 - Deleting emails",
                    desc :"Ok, so your are back in your inbox. Now it is time to clear out unwanted messages. Jon is trying to make dinner plans with you, but you already have plans with Billy. Let's just delete Jon's message without replying.\n- What would you do next? Why?\n- Is there anything else you would do at this point?\n- What additional info would have helped?\n- Is that a familiar action for you based on other apps you use regularly?"
                },{
                    name :"Thoughts and Feedback on the Experience",
                    desc :"- Having walked through this experience now, how did it compare to your experiences with other email apps?\n- Is it better or worse? Why?\n- Do you think you would use this email app?\n- What did you feel was missing? \n- What did you find confusing?\n- Do you have any other thoughts or feedback for us?",
                },{
                    name :"Conclusion and Thank You",
                    desc :"- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their payment cheque\n- Provide assistance with leaving building\n- High fives!",
                }]
    },
    {
        'test' : {
            created_by_account: account,
            created_by_user : id,
            desc :  "1. Are horizontal and vertical scrolls obvious to the user?\n"+
                    "2. Does the dual scrolling interfere with the user's experience?\n"+
                    "3. Does the current temperature need to be displayed at all times?",
            kind : "prototype",
            link : "http://framerjs.com/examples/preview/#weather-app.framer",
            name : "Ex. Usability Testing - Weather App"
        },
        'tags' : ['issue', 'comprehension', 'preference', 'effort', 'quote', 'usability'],
        'tasks' : [
            {
                name  :"Introduction",
                desc  : "• My name is __________. Thanks for talking to us today, we’ll be about 60 minutes.\n"+
                        "• This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n"+
                        "• We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc. as you walk through the app.\n"+
                        "• Alright, let's get started"
            },
            {
                name  : "First Impressions",
                desc  : "• Looking at this app for the first time, what stands out for you?\n"+
                        "• From your perspective, describe how is the information laid out?\n"+
                        "• Does the layout of information here make sense to you?\n"+
                        "• Is there any information that you feel is missing?"
            },
            {
                name  : "Task 1 - Daily Weather Navigation",
                desc  : "• Scenario: You are heading out for work for the day, and you want to determine whether you need to bring an umbrella. Find the information that helps you determine this.\n"+
                        "• Pay attention to their scrolling to determine if the horizontal scrolling interferes with the vertical scrolling.\n"+
                        "• What piece of information are you looking for?\n"+
                        "• Did you understand that information when you found it?\n"+
                        "• What interaction were you expecting to have with today's detailed forecast, if any?"
            },{
                name  : "Task 2 - Weekly Weather Navigation",
                desc  : "• Scenario: You are looking to plan a day in the park with some friends next weekend, either Saturday the 18th or Friday the 19th. Find the information that helps you determine the best day.\n"+
                        "• Pay attention to their scrolling to determine if the vertical scrolling interferes with the horizontal scrolling.\n"+
                        "• What information are you looking for?\n"+
                        "• Was it clear to you right away where that information would be found?\n"+
                        "• Was there some type of information you were looking for specifically that you couldn't find?\n"+
                        "• Did the interaction to find scroll through the dates seem logical for you?"
                
            },{
                name  : "App Use Context",
                desc  : "• What times of the day do you typically check the forecast?\n"+
                        "• Where are you typically when you are checking the forecast?\n"+
                        "• How are you typically holding your phone when checking the weather?"
            },
            {
                name  : "Conclusion",
                desc  : "• Thank participant for their time\n"+
                        "• Provide assistance with leaving building\n"+
                        "• High fives!"
            }
        ]
    }
];

    // in parallel:

    // Create a test for each
    // inside the test, create tasks for that test, setting their _test to test._id and index to $index

    Bluebird.map(tests, function(n){
        var test =  new models.Test(n.test);
        Bluebird.all([
                Bluebird.map(n.tags, function(tag, i){
                    models.Tag.create({name:tag, nameCheck:tag, _test:test._id}, function(err, next){})
                }),
                Bluebird.map(n.tasks, function(task, i){
                        task._test = test._id;
                        task.index = i
                        var t = new models.Task(task);
                        test._tasks.push(t._id);
                        return task.save();
                })
            ]).then(function(test){
                return test;        
            })
              
    }).then(function(testArray){
    callback(null, testArray);
    }).catch(function(err){
        if(err){console.log(err);}
    });
}