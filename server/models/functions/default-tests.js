// default-tests-new.js - generates first-time signup tests
'use strict';

module.exports = function(account, id, callback){
// on first login via signup, create a test for this user.

// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    // var async = require('async');
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
                    kind : "interview",
                    summary : "All of the participants in some way or another incorporate a healthy activity into their daily lives. Most participants spoke of maintaining a healthy diet to supplement their active lifestyle. Matthew makes a point of riding his bike or walking everywhere. He occasionally lifts weights at his local YMCA or plays pick up basketball with his friends. Sarah, a new mother has a newfound love of exercise. She works out each morning at her gym and has developed a group of workout buddies from doing the classes. Lisa also enjoys the social aspect of doing gym class workouts. She feels her friends help motivate her to go to the classes. Aaron likes to work out with a personal trainer and mentioned the social aspect of that too. He expressed some doubt in incorporating digital tools into his workout regime. He said, '... tech and fitness do not blend well. I need a human to help me maintain my health not an app or fancy watch.' Dina also shared a similar disdain to using digital tools saying that, 'Being active and healthy should be fun! I don't need an app sending me notifications guilting me into walking more or eating fewer calories. You only live once so enjoy it!' And Brad, who jogs and practices Muay Thai twice a week has interest in incorporating an app or wearable device into his routine but seems overwhelmed by the number of products to choose from.\n"+"The participants willingness and interest in incorporating digital tools to help modify their fitness habits seemed to depend on their level of tech savviness. Lisa, who works in the tech industry as a PM uses both a FitBit device to track her steps and calories and apps to help supplement the device. Brad on the other hand is not as tech savvy and expressed that he felt overwhelmed by the amount of options in wearable tech. He relies more on his traditional scale to monitor his progress and keep him on track. Although not all participants used digital tools to modify their fitness habits, most of them had an interest in trying them out or had tried them out at one time.\n"+
                              "Besides tech, personal trainers and traditional scales, most participants noted that their family and friends played a role in shaping their fitness behaviour. Lisa spoke about how her workout buddies hold her accountable to showing up to classes and this motivates her to attend. Her boyfriend also plays a major role in maintaining an active lifestyle and healthy diet by encouraging her to go to the gym and making healthy meals with her. Sarah spoke about sharing her FitBit results with her gym class friends. She said that sharing her goals and accomplishments with these friends helped push her to achieve more. Brad and his brother share healthy recipes with each other to encourage healthy eating habits. Matthew, Dina and Aaron all motivates themselves to workout and stay active. Aaron relies on his personal trainer to track his progress but said he didn't need his trainer to encourage him to workout. Dina and Matthew did not see the value in sharing their goals and accomplishments."
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
            name : "Ex. Prototype Testing - Email Inbox App",
            summary : "Overall, participants had positive feedback on the general experience of the app. A few participants mentioned that they appreciate and rely on the ability to sort their emails into categories. The fact that this app lacks that functionality could deter people from using it. We should discuss the possibility of including similar behaviour in the app. Meghan said, 'You should really consider a sorting feature. Especially since this is an app. People on their phones will be in a hurry no matter what. No one wants to spend 20, 30, 40 minutes tending to emails on their phone! You should focus all your efforts on trying to make the experience as quick and streamlined as possible.' She also mentioned that this app would not work well for someone who receives a large number of emails per day. Having all emails in one inbox stream could be overwhelming (especially on a mobile device).\n\nAnother issue participants had with the experience was that there was no indication of multiple people on one thread in the Inbox view. All of the participants were surprised to see three people on the email thread once they opened the email from Billy. One way we could solve this issue is if we put a number beside the name of the sender to indicate that there are others on the thread. Once they opened the thread they were also confused by the sequence of the emails. The participants all mentioned that the order should be Billy's email (sent first at 8AM), then Matt's (send around 2PM) and finally Laura's (sent 15sec ago).\n\nMost participants understood the Delete, Add Recipient and Reply functions. The experience was similar to what they are used to. Meghan struggled with the Delete and Add Recipient functions because the icons were unfamiliar to her. It took her a few moments to realize that the garbage can icon was the delete button. She also questioned the Add Recipient functionality not knowing what the plus and minus icons would do. Every participant but Meghan understood the iconography used in the app."
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
        'test'    : {
            name : "Ex. Usability Testing - Weather App",
            created_by_account: account,
            created_by_user : id,
            desc :  "1. Are horizontal and vertical scrolls obvious to the user?\n"+
                    "2. Does the dual scrolling interfere with the user's experience?\n"+
                    "3. Does the current temperature need to be displayed at all times?",
            kind : "prototype",
            link : "http://framerjs.com/examples/preview/#weather-app.framer",
            summary : "Sessions with all participants went well, as they were all able to comprehend the app's interaction and content. That said, there were a few recurring themes in the feedback that stood out as ways to improve the experience:\n\n- What's Working -\n\nVisuals and iconography communicate important info quickly - In scenarios where people are looking for at-a-glance information (like checking for rain), the background imagery and icons in the hourly forecast communicate this within a second or two for participants.\n\n90% of info required can be found without scrolling - For most participants, they information they would typically be looking for when using their weather app was found immediately upon opening the app.\n\n\n- What Issues Were Found - \n\nHorizontal scroll interference when scrolling vertically quickly - users who scrolled slowly and deliberately up and down the page didn't have any issue with this. But users who make quick movements up and down the page (representative more of our majority, utility-driven users) would accidentally hit the horizontal interaction while moving up and down the page, which created confusion. \n\nDon't separate Today's Forecast information - It confused a number of participants to have different pieces of this information set located at the top and bottom of the app. Their expectation is that this information would be found all within the same context. \n\nMore visual distinction for numbers on screen - Some participants had an issue distinguishing dates, temperatures, highs and lows, as they are all presented in white text. We need to create some hierarchy for this information to make it distinguishable at a glance.\n\n\n- Next Steps -\n\n1. Explore options to reduce/eliminate the sensitivity of the horizontal scroll to reduce likelihood of vertical scroll interference.\n2. Review organization of Today's Forecast information - sketch concepts for alternate solutions.\n3. Explore visual hierarchy for numbers in the app." 
        },
        'subjects' : [{ name : 'Vince Wagenar', _messages : [
                        "",
                        ""
                    ] },
                    {_messages:[] ,name : 'Lisa Truitt'}, 
                    // {_messages:[] ,name : 'Julie Stenson'}, 
                    // {_messages:[] ,name : 'Janet Santiago'}, 
                    // {_messages:[] ,name : 'Beverley Gilreath'}],

        'tags'     : ['issue', 'comprehension', 'preference', 'effort', 'quote', 'usability'],
        'tasks'    : [
            {
                name  :"Introduction",
                desc  : "• My name is __________. Thanks for talking to us today, we’ll be about 60 minutes.\n"+
                        "• This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n"+
                        "• We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc. as you walk through the app.\n"+
                        "• Alright, let's get started",
                _messages : []
            },
            {
                name  : "First Impressions",
                desc  : "• Looking at this app for the first time, what stands out for you?\n"+
                        "• From your perspective, describe how is the information laid out?\n"+
                        "• Does the layout of information here make sense to you?\n"+
                        "• Is there any information that you feel is missing?",
                _messages : [
                    {body: "The first thing she noticed is that the city displayed was not New York, and she was looking for a way to change this. Had to explain that this would recognize your location automatically when you opened the app." , _subject:'Beverley Gilreath'  },
                    {body: "'It looks a bit like a stock ticker' - how she referred to the volume of information on the screen. #quote The amount of info here is a bit overwhelming for her." , _subject:'Beverley Gilreath'  },
                    {body: "She said she doesn't need all this information at once, so she wasn't sure why she was getting it all displayed for her right off the bat. #comprehension #issue", _subject:'Beverley Gilreath'  },
                    {body: "She had an issue navigating all of the information - she understood that the large number at the top was current weather, but the rest of the numbers become overwhelming.", _subject:'Beverley Gilreath'  },
                    {_subject:'Janet Santiago' , body: "She thinks the app is beautiful and simple. She has tried a few different weather apps, and she doesn't like the complexity of them all. Simple is better, so she likes that all the information is contained on one screen."},
                    {_subject:'Janet Santiago' , body: "'Everything for today is at the top, everything for the rest of the week is down below' #quote"},
                    {_subject:'Janet Santiago' , body: "She finds the layout of the app to fit how she thinks about it in her mind - everything she needs to know for today is right there when you open the app up - if she needs to know more about the weather later or more details, then she can scroll down a bit to find it. #usability"},
                    {_subject:'Julie Stenson' , body: "They find the app layout to be minimalistic, which allows the important weather information to stand out immediately."},
                    {_subject:'Julie Stenson' , body: "The amount of data displayed on the screen is overwhelming for her. #comprehension She says it 'feels a bit like a spreadsheet' #quote"},
                    {_subject:'Julie Stenson' , body: "It was obvious for her that today's weather, which is typically the only piece of info she is looking for when checking her weather app, is at the top."},
                    {_subject:'Julie Stenson' , body: "The forecasts for the remaining days of the week were correctly identified below that, with the highs and lows presented."},
                    {_subject:'Julie Stenson' , body: "Below that, it looks like the hourly temperatures - she didn't quite understand what they were at first because it is displayed as a 24-hour clock, which she isn't used to using or seeing in New York. #comprehension She said she would need to have the ability to switch to a 12 -hour clock #issue #preference"},
                    {_subject:'Julie Stenson' , body: "She found the detailed forecast for today at the bottom, but this is not where she expected to find it. She expected for this information to be associated with the today's weather information that appeared at the top #issue #comprehension"},
                    {_subject:'Julie Stenson' , body: "While she doesn't want all of today's weather info every time she checks the app, he expectation is that it would be found adjacent to today's temperature, or by clicking through. She mentions this feels like it would cause her to have to hunt around the app for info more than she would like to. #effort"},
                    {_subject:'Julie Stenson' , body: "She is reliant on iconography for an at-a-glance understanding  of the current weather - this helps to set her expectations for whether she needs to dress warmly or bring an umbrella. #preference"},
                    {_subject:'Lisa Truitt' , body: "Her first impression of that app was that today's weather information was scattered around the app. She wants all available information accessible to her at at once. The fact that today's temperature and precipitation and humidity information are found on separate parts of the screen confused her. #issue #preference"},
                    {_subject:'Lisa Truitt' , body: "She describes the layout of the information as a hamburger - 'I've got today's weather info at the top, then the rest of the week in the middle, and more of today's weather info at the bottom.' #quote"},

                ]
            },
            {
                name  : "Task 1 - Daily Weather Navigation",
                desc  : "• Scenario: You are heading out for work for the day, and you want to determine whether you need to bring an umbrella. Find the information that helps you determine this.\n"+
                        "• Pay attention to their scrolling to determine if the horizontal scrolling interferes with the vertical scrolling.\n"+
                        "• What piece of information are you looking for?\n"+
                        "• Did you understand that information when you found it?\n"+
                        "• What interaction were you expecting to have with today's detailed forecast, if any?",
                _messages : []
            },{
                name  : "Task 2 - Weekly Weather Navigation",
                desc  : "• Scenario: You are looking to plan a day in the park with some friends next weekend, either Saturday the 18th or Friday the 19th. Find the information that helps you determine the best day.\n"+
                        "• Pay attention to their scrolling to determine if the vertical scrolling interferes with the horizontal scrolling.\n"+
                        "• What information are you looking for?\n"+
                        "• Was it clear to you right away where that information would be found?\n"+
                        "• Was there some type of information you were looking for specifically that you couldn't find?\n"+
                        "• Did the interaction to find scroll through the dates seem logical for you?",
                _messages : []
                
            },{
                name  : "App Use Context",
                desc  : "• What times of the day do you typically check the forecast?\n"+
                        "• Where are you typically when you are checking the forecast?\n"+
                        "• How are you typically holding your phone when checking the weather?",
                _messages : []
            },
            {
                name  : "Conclusion",
                desc  : "• Thank participant for their time\n"+
                        "• Provide assistance with leaving building\n"+
                        "• High fives!",
                _messages : []
            }
        ]
    }];

    // in parallel:

var modelSave  = function(mongooseModel){
    return new Bluebird(function (resolve, reject) {
        mongooseModel.save(function(err,done) {
          if (!done || done.error) {return reject(done.error);}
          return resolve(done);
        })
    })
}

    // Create a test for each
    // inside the test, create tasks for that test, setting their _test to test._id and index to $index
    // this works but returns undefin

    Bluebird.map(tests, function(n){
        var test =  new models.Test(n.test);
        return Bluebird.all([
               Bluebird.map(n.tags, function(tag, i){
                    var t = new models.Tag({
                            name      : tag,
                            nameCheck : tag.toLowerCase(),
                            _test     : test._id
                        });
                    test._tags.push(t._id);

                    return modelSave(t);
                }),
                Bluebird.map(n.tasks, function(task, i){
                        task._test = test._id;
                        task.index = i

                        var t = new models.Task(task);
                        test._tasks.push(t._id);

                        return modelSave(t);
                })
            ]).then(function(array){
                // console.log('is test still set?', test);
                return modelSave(test);
            })
    }).then(function(testArray){
        // aight, did the tests get made?
        console.log('testArray length', testArray.length);



    }).then(function(messagedTest){
        // okay we've posted messages here.
        callback(null, 'true');
    }).catch(function(err){
        if(err){console.log(err);}
    });
}