// default_test_object.js
'use strict';

module.exports = function(account, id){
    return [{
        created_by_account: account,
        created_by_user : id,
        name : "Ex. Customer Interview - Fitness Habits",
        desc : "1. Understand people's current fitness habits \n"+
               "2. Understand whether they look for digital tools to help modify their fitness habits\n"+
               "3. Determine if family, friends or peers play an important role in shaping people's fitness behaviour.",
        kind : "interview",
        summary : "All of the participants in some way or another incorporate a healthy activity into their daily lives. Most participants spoke of maintaining a healthy diet to supplement their active lifestyle. Matthew makes a point of riding his bike or walking everywhere. He occasionally lifts weights at his local YMCA or plays pick up basketball with his friends. Sarah, a new mother has a newfound love of exercise. She works out each morning at her gym and has developed a group of workout buddies from doing the classes. Lisa also enjoys the social aspect of doing gym class workouts. She feels her friends help motivate her to go to the classes. Aaron likes to work out with a personal trainer and mentioned the social aspect of that too. He expressed some doubt in incorporating digital tools into his workout regime. He said, '... tech and fitness do not blend well. I need a human to help me maintain my health not an app or fancy watch.' Dina also shared a similar disdain to using digital tools saying that, 'Being active and healthy should be fun! I don't need an app sending me notifications guilting me into walking more or eating fewer calories. You only live once so enjoy it!' And Brad, who jogs and practices Muay Thai twice a week has interest in incorporating an app or wearable device into his routine but seems overwhelmed by the number of products to choose from.\n"+"The participants willingness and interest in incorporating digital tools to help modify their fitness habits seemed to depend on their level of tech savviness. Lisa, who works in the tech industry as a PM uses both a FitBit device to track her steps and calories and apps to help supplement the device. Brad on the other hand is not as tech savvy and expressed that he felt overwhelmed by the amount of options in wearable tech. He relies more on his traditional scale to monitor his progress and keep him on track. Although not all participants used digital tools to modify their fitness habits, most of them had an interest in trying them out or had tried them out at one time.\n"+
                  "Besides tech, personal trainers and traditional scales, most participants noted that their family and friends played a role in shaping their fitness behaviour. Lisa spoke about how her workout buddies hold her accountable to showing up to classes and this motivates her to attend. Her boyfriend also plays a major role in maintaining an active lifestyle and healthy diet by encouraging her to go to the gym and making healthy meals with her. Sarah spoke about sharing her FitBit results with her gym class friends. She said that sharing her goals and accomplishments with these friends helped push her to achieve more. Brad and his brother share healthy recipes with each other to encourage healthy eating habits. Matthew, Dina and Aaron all motivates themselves to workout and stay active. Aaron relies on his personal trainer to track his progress but said he didn't need his trainer to encourage him to workout. Dina and Matthew did not see the value in sharing their goals and accomplishments.",
        'subjects' : ['Sarah Costa', 'Matthew Clarke', 'Lisa Dewitt', 'Dina Harmeneh', 'Brad Allen', 'Aaron Chartrand'],
        'tags'  : ['need','painpoint','activity','touchpoint','quote'],
        'tasks' : [
                    {
                        name  :"Introduction",
                        desc  :"Note: This is to set the tone for the interviewee or group. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 60 minutes.\n- We’re constantly trying to improve our product, and getting your frank feedback is a really important part of that.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll be running through a few questions and scenarios from your day. \n- We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed beyond our team.\n- Alright, let's get started!",
                        _messages : []
                    }, {
                        name  : "Background Information",
                        desc  : "- What is your name and age? \n - Where do you live? \n - What kind of work do you do?\n- For how long have you been doing that?\n- What kinds of activities, hobbies or projects do you like to do when you’re not working?",
                       _messages : []
                    },
                    {
                        name  : "Current Activities and Habits",
                        desc  : "- What do you do to take care of yourself? To stay in shape? To stay active? \n - Can you list the sports, exercise, classes you participate in?\n- How many times did you participate in the activities in the last week?\n- Are there any other healthy habits in your day?",
                         _messages : [
                            {_subject: 'Aaron Chartrand' , body : "Running, Weight Training, Skipping, Bike Riding #activity"},
                            {_subject: 'Aaron Chartrand' , body : "Works out 4 times a week. Is part of a boutique gym in the Beaches where he has a personal trainer. Tracks his meals in a food journal. Rides his bike casually to get to and from places. #touchpoint #activity"},
                            {_subject: 'Aaron Chartrand' , body : "Aaron is a very active young man. He trains 4 times a week with a personal trainer and maintains a clean diet. He is skeptical of incorporating tech into his fitness routine. He prefers working with a trainer and tracking things on paper. He is quite motivated in maintaining a good physique so he doesn't need the encouragement of others to stay fit. However, he says it's helpful and fun to have a personal trainer to help him through his workouts and track his progress. #summary"},
                            {_subject: 'Aaron Chartrand' , body : "4 times last week #activity"},
                            {_subject: 'Aaron Chartrand' , body : "He watches what he eats. Tries to maintain a clean diet. Records his meals in a food journal to keep track of calories #activity"},
                            {_subject: 'Brad Allen'      , body : "He jogged twice last week before he left for work and then went to Muay Thai on Tuesday and Thursday #activity"},
                            {_subject: 'Brad Allen'      , body : "He tries to maintain a healthy diet. Eats mostly organic #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "He jogs and trains twice a week at a Muay Thai gym in Kensington Market. He golfs occasionally. Mostly for business. #activity #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "Brad has maintained a healthy and active lifestyle from an early age. He enjoys jogging, playing tennis, golf and participates in Muay Thai. He tried the P90X program and enjoyed it but doing the daily workouts was too time consuming for him. He's interested in trying out the Jawbone bracelet but says he's a bit overwhelmed by all of the wearable tech options. This makes him hesitant to commit to a certain product. His phone is also a barrier. He has a Blackberry and there aren't many app options for him. His brother and him share healthy recipes with one another to encourage healthy eating. #summary"},
                            {_subject: 'Dina Harmeneh'   , body : "Works out 5 days a week. Plays soccer with an indoor team, plays tennis, goes jogging, occasionally plays pick up basketball and works out with her XBOX Kinect  #activity #touchpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "Soccer, Tennis, Jogging, Basketball and various XBOX Kinect games #activity"},
                            {_subject: 'Dina Harmeneh'   , body : "6 days last week #activity"},
                            {_subject: 'Dina Harmeneh'   , body : "Dina is a very active young woman. She works out 5 times a week. Whether it's with her soccer team, playing tennis with her boyfriend or playing on her XBOX Kinect she's always having fun while she's being active. She tried a paid workout app that was an online personal trainer but stopped using it because the more advanced workouts required a lot of equipment that she did not have. Her boyfriend and her teammates motivate her to keep active. #summary"},
                            {_subject: 'Dina Harmeneh'   , body : "Not really. She doesn't really watch what she eats. Indulges often in chips and candy"},
                            {_subject: 'Lisa Dewitt'     , body : "Boxing gym with her boyfriend and close friends. If the weather is nice she runs outside with her boyfriend  #activity #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "Boxing, Jock Yoga, Jogging, Step Class #activity"},
                            {_subject: 'Lisa Dewitt'     , body : "Lisa is a moderately active young woman. Her fitness habits and goals are achieved and maintained by her apps and FitBit. She believes that tech has helped her transform her lifestyle. Her boyfriend plays a major role in her healthy lifestyle. He motivates her to go to the gym and also helps make healthy meals. Her friends also have a positive effect on her active lifestyle. #summary"},
                            {_subject: 'Lisa Dewitt'     , body : "2 times (busy schedule and bad weather made her go fewer times than she normally does) #activity"},
                            {_subject: 'Lisa Dewitt'     , body : "Portions her meals, eats healthy snacks throughout the day and tracks her activity and food in her FitBit app #activity #touchpoint"},
                            {_subject: 'Matthew Clarke'  , body : "Basketball"},
                            {_subject: 'Matthew Clarke'  , body : "Matthew is active day-to-day and has a very casual attitude towards staying fit. He rides his bike and walks everyday, occasionally plays basketball and lifts weights at his local YMCA. He tried using Map My Ride to see how far his bike trips were taking him and to have a visual representation of his trip. Since fitness apps are driven by data and the results are often presented in the form of plain numbers it's hard for him to digest. He lacks interest in the numbers and seeks a more visual experience. His friends play a role in promoting an active lifestyle. #summary"},
                            {_subject: 'Matthew Clarke'  , body : "Rode his bike and walked everyday and played basketball twice #activity"},
                            {_subject: 'Matthew Clarke'  , body : "No other healthy habits"},
                            {_subject: 'Matthew Clarke'  , body : "He walks a lot, rides his bike everywhere and does some weight training at the YMCA #activity #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "Yoga, Step Class, Weight Training Class, 1.5 Hour Drill Bootcamp #activity"},
                            {_subject: 'Sarah Costa'     , body : "She goes to the gym every morning before work (around 6AM). She just bought a tandem attachment for her bike and plans on taking her daughter out for bike rides #activity #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "4 mornings last week #activity"},
                            {_subject: 'Sarah Costa'     , body : "Sarah has made her fitness a priority in her life. She works out 4 times a week in the morning. She does fitness classes at her local gym and tracks her results with her new FitBit. She shares her results results with her friends are the gym, her husband and sister. Doing that motivates her to accomplish her fitness goals. Her family plays a big role in her achieving her fitness goals. #summary"},
                            {_subject: 'Sarah Costa'     , body : "Tries to eat well and clean. Buys organic groceries. Her daughter motivates her to remain healthy and active #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "Since she works full-time and has a young daughter, the morning is the prime time for her to work out #need"},
                        ]
                    },
                    {
                        name  : "Fitness Apps and Tools",
                        desc  : "- Have you used any apps or websites or other programs to help you with fitness? Which ones?\n- What did you want them to do for you?\n- What was your expected out come from using these apps?\n- What do you like about them?\n- What do you dislike about them?\n- Did you pay for them? Why? Why not?",
                        _messages : [
                            {_subject: 'Aaron Chartrand' , body : "He's used Nike Fit App to get workout ideas before he got a personal trainer #touchpoint"},
                            {_subject: 'Aaron Chartrand' , body : "He thought he'd get good workout ideas and that the app would help keep him entertained and therefore motivated."},
                            {_subject: 'Aaron Chartrand' , body : "He liked that it counted out the reps and that he could incorporate his music into the workout. #need"},
                            {_subject: 'Aaron Chartrand' , body : "He did not like the actual workouts and didn't know if he was doing them correctly #paintpoint"},
                            {_subject: 'Aaron Chartrand' , body : "Did not pay for them because he likes the social aspect of a trainer. Likes having someone there to track his progress and make sure he's doing the exercises correctly. #touchpoint"},
                            {_subject: 'Aaron Chartrand' , body : "In my mind, tech and fitness do not blend well. I need a human to help me maintain my health not an app or fancy watch. #quote #paintpoint"},
                            {_subject: 'Brad Allen'      , body : "He's used the P90X extreme fitness program #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "He wanted to get toned and lean"},
                            {_subject: 'Brad Allen'      , body : "He liked that he could do them from his own home"},
                            {_subject: 'Brad Allen'      , body : "However, it was difficult to keep up with the workouts because you needed to do them everyday and they're pretty intense! He just didn't have the time for that. #painpoint"},
                            {_subject: 'Brad Allen'      , body : "He did purchase them. It was less expensive than joining a gym and hiring a trainer."},
                            {_subject: 'Dina Harmeneh'   , body : "FitStar offered an experience tailored to you and your progress and took the guess work out of working out #touchpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "Needed some guidance when she worked out but didn't want to join a gym #need"},
                            {_subject: 'Dina Harmeneh'   , body : "Liked that she could work out at home any time she wanted. Liked the format of the app and the variety in the workouts."},
                            {_subject: 'Dina Harmeneh'   , body : "Yes, she paid $49.99 a year for it. It was much cheaper than joining a gym #touchpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "Did not like that the more advanced workouts required a lot of equipment. She felt like it was a sly way of making you purchase things from their equipment store #painpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "Used FitStar for a while on her iPad #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "Fitbit app, My Fitness Pal (diet tracker) and Map My Run #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "She got the FitBit as a birthday gift. She got it to track her activity, see how many steps she takes and how many calories she burns in her fitness classes and on runs. #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "Wanted to lose weight and become more aware of her daily calorie consumption"},
                            {_subject: 'Lisa Dewitt'     , body : "Uses the My Fitness Pal to track her calories in more detail"},
                            {_subject: 'Lisa Dewitt'     , body : "Uses Map My Run to track her runs and work out the best route. This makes running more fun for her. #activity"},
                            {_subject: 'Lisa Dewitt'     , body : "Doesn't like that she has to constantly wear the FitBit to track her activity. It gets hot on her wrist when she is working out. #painpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "My Fitness Pal doesn't always have the food she eats in their database. This means she has to find something comparable and this makes it less accurate.  Makes her think it might not be that accurate! #painpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "Got the FitBit as a gift and the other apps are free downloads."},
                            {_subject: 'Lisa Dewitt'     , body : "She would pay for a diet tracker app if it had a more robust database of foods and offered her meal recommendations based on what she eats regularly #need"},
                            {_subject: 'Matthew Clarke'  , body : "He's used MapMyRide if he goes on long rides on the weekend #activity"},
                            {_subject: 'Matthew Clarke'  , body : "Wanted to see how far he rode and what his route looked like visually"},
                            {_subject: 'Matthew Clarke'  , body : "He liked how it showed him all the data of his ride"},
                            {_subject: 'Matthew Clarke'  , body : "He didn't like that he couldn't export the data. He wanted a larger version of his mapped out route #painpoint"},
                            {_subject: 'Sarah Costa'     , body : "Just started using a FitBit to track her steps #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "Would like to lose the remainder of the weight she gained after the baby"},
                            {_subject: 'Sarah Costa'     , body : "Since she is not very tech saavy she found it difficult for her to set up the FitBit app on her phone and sync it with her device #painpoint"},
                            {_subject: 'Sarah Costa'     , body : "She likes that she can quickly access how many steps she's taken though"},
                            {_subject: 'Sarah Costa'     , body : "Yes, she bought the FitBit. Many of my friends at the gym have them too so we all chat about our goals and accomplishments. It's fun. I feel like I'm part of something. #quote"},
                        ]
                    },
                    {
                        name  : "Friends and Social Activity",
                        desc  : "- Who (e.g. friends, family, coaches, teachers?) helps keep you active?\n- How do they help you?\n- Who (e.g. friends, family, coaches, teachers?) is a barrier to you being active?\n- How do they prevent you from being active?\n- Do you share info about your workouts or your goals with anyone?\n- When? Why? How?\n- What (if anything) do you do to keep track of what you’re doing?\n- How does that help you?"   ,
                        _messages : [
                            {_subject: 'Aaron Chartrand' , body : "He has good willpower so he motivates himself and his trainer helps #touchpoint"},
                            {_subject: 'Aaron Chartrand' , body : "His girlfriend doesn't eat as healthily as he does so when they're out for dinner he's often tempted to order the less healthy option thanks to her. #touchpoint"},
                            {_subject: 'Aaron Chartrand' , body : "His trainer helps track his workouts and he shares his goals with the trainer too. #touchpoint"},
                            {_subject: 'Aaron Chartrand' , body : "Keeps track of every exercise he does, body measurements, caloric intake, goals #touchpoint #activity"},
                            {_subject: 'Aaron Chartrand' , body : "Helps him stay focused and on track"},
                            {_subject: 'Brad Allen'      , body : "His brother encourages him to eat healthy. They share recipes with eachother. #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "He doesn't feel like anyone is a barrier to him"},
                            {_subject: 'Brad Allen'      , body : "He doesn't currently share info about his workouts or goals with anyone #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "He keeps track of his weight #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "Keeps him motivated when he does that"},
                            {_subject: 'Brad Allen'      , body : "He's always been physically fit and now that he's older he notices he needs to work a bit harder to remain in shape. He needs his scale to give him a dose of reality when he slacks off. It motivates him. #need"},
                            {_subject: 'Dina Harmeneh'   , body : "Her boyfriend is really into sports and often plays tennis and basketball with her. Her soccer team mates keep her motivated too #touchpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "No one is really a barrier to her being active. Being active has always been a big part of her life so it comes naturally to her. #touchpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "She doesn't share any info about her workouts or goals with anyone"},
                            {_subject: 'Dina Harmeneh'   , body : "Doesn't track anything. She thinks the Kinect tracks her weight and how many workouts she's done but she never checks the stats. Not interested. #touchpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "She doesn't feel like it would motivate her."},
                            {_subject: 'Dina Harmeneh'   , body : "Being active and healthy should be fun! I don't need an app sending me notifications guilting me into walking more or eating fewer calories. You only live once so enjoy it! #quote"},
                            {_subject: 'Lisa Dewitt'     , body : "Her boyfriend and best friend help keep her active. Friends and boyfriend motivate her to go to the gym and her boyfriend helps encourage her healthy eating habits #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "When she reaches her daily step goal on her FitBit she shares it on Twitter"},
                            {_subject: 'Lisa Dewitt'     , body : "She shares it because she's proud of her accomplishment. Her friends always share when they meet their step goal and they get a bit competitive with one another. Helps motivate her further to reach her goals."},
                            {_subject: 'Lisa Dewitt'     , body : "Tracking her steps and calories helps motivate her and keep her calories on track #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "I am a barrier to myself! I am inherently a couch potato. #quote"},
                            {_subject: 'Matthew Clarke'  , body : "He keeps himself active. His friends who invite him out to basketball help encourage him to be active too. #touchpoint"},
                            {_subject: 'Matthew Clarke'  , body : "He'll stay active if he has something he needs to do or he's invited out to a game. He needs to be motivated by his chores and friends. #need"},
                            {_subject: 'Matthew Clarke'  , body : "He doesn't share info about his workouts. He doesn't have any workout goals"},
                            {_subject: 'Matthew Clarke'  , body : "He sees himself as the only barrier to being active. Sometimes he feels lazy"},
                            {_subject: 'Matthew Clarke'  , body : "He doesn't track anything. Tried tracking his bike trips but he got bored of it #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "Her friends at the gym help keep her active. She knows they're expecting to see her there each morning so she feels motivated to show up. #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "If her daughter doesn't have a good nights sleep or she wakes up early then she skips the gym."},
                            {_subject: 'Sarah Costa'     , body : "She shares her workout goals with her husband, sister and friends #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "She shares her goals because it makes her proud of her accomplishments and motivates her to achieve more #touchpoint"},
                            {_subject: 'Sarah Costa'     , body : "She uses the FitBit to keep track of her efforts"},
                            {_subject: 'Sarah Costa'     , body : "Doing that helps motivate her to achieve more #touchpoint"},
                        ]
                    },
                    {
                        name  : "Exercise Habits",
                        desc  : "- How have your exercise habits changed over time?\n- What did you used to do 6 months ago?\n- What did you used to do where at your fittest?\n- Have the software and tools you use changed? Which did you used to use?",
                        _messages : [
                            {_subject: 'Aaron Chartrand' , body : "I've always been an active person. As I get older I notice I have to work a bit harder to maintain my physique but that doesn't bother me. I enjoy working out. #quote"},
                            {_subject: 'Aaron Chartrand' , body : "Eating well and working out regularly keeps him fit and happy"},
                            {_subject: 'Aaron Chartrand' , body : "He didn't have a trainer 6 months ago so he would use the Nike Fit app and just go jogging to stay active. #touchpoint #activity"},
                            {_subject: 'Aaron Chartrand' , body : "He stopped using an app and now works with a trainer. He doesn't think he'll use an app again to track his fitness."},
                            {_subject: 'Sarah Costa'     , body : "My fitness habits have changed dramatically since having a child. I was never a morning person before but now it's the best time for me to work out. I also work out more because I've made it a priority in my life. I do it for myself but also for my family! #quote"},
                            {_subject: 'Sarah Costa'     , body : "She had just joined the gym 6 months ago so she was just starting to get into the routine. It was hard for her at first but now she's really enjoying it. #touchpoint #activity"},
                            {_subject: 'Sarah Costa'     , body : "She ran and trained for marathons"},
                            {_subject: 'Sarah Costa'     , body : "Yes, she never used any software or tools before the FitBit. She's really liking it."},
                            {_subject: 'Matthew Clarke'  , body : "He used to run but he injured his ankle in a basketball game."},
                            {_subject: 'Matthew Clarke'  , body : "6 months ago was when he was injured so he was inactive"},
                            {_subject: 'Matthew Clarke'  , body : "He's at his fittest now. He attributes his health to walking a lot and riding his bike everywhere instead of driving or taking the TTC."},
                            {_subject: 'Matthew Clarke'  , body : "He doesn't use the MapMyRide app anymore. He got bored of it. #touchpoint"},
                            {_subject: 'Matthew Clarke'  , body : "I like the idea of incorporating tech into my life but I'm often disappointed by the offerings of the apps. I always want them to do more than they can. It frustrates me. I'm a very visual person so I need to see my data presented to me in graphics not in numbers. A lot of these apps are just a bunch of numbers. #quote"},
                            {_subject: 'Lisa Dewitt'     , body : "Before she joined the gym she currently goes to she didn't really work out. Would run occasionally."},
                            {_subject: 'Lisa Dewitt'     , body : "Now she goes to the gym 3 times a week. Her habits changed thanks to the encouragement of her boyfriend #touchpoint"},
                            {_subject: 'Lisa Dewitt'     , body : "6 months ago: Didn't work out at all. Gained 15 pounds. Her weight gain and boyfriend both motivated her to join the gym and become more health conscious"},
                            {_subject: 'Lisa Dewitt'     , body : "Never used software before to track her fitness."},
                            {_subject: 'Lisa Dewitt'     , body : "Wearables have changed the way I perceive myself and my fitness level! I am more aware of how healthy/unhealthy I am and feel like I know my body better thanks to my apps and my FitBit! #quote"},
                            {_subject: 'Lisa Dewitt'     , body : "It’s addictive and fun, and if that gets you moving more and generally fitter and leaner it’s better for you than most other computing or mobile devices. #quote"},
                            {_subject: 'Dina Harmeneh'   , body : "She stopped using the app because all of the advanced workouts required equipment that she didn't have. #painpoint"},
                            {_subject: 'Dina Harmeneh'   , body : "She joined a soccer league, bought a Kinect to go on her XBOX and she uses that now for her workouts and she moved into a new condo that has tennis and basketball courts #activity"},
                            {_subject: 'Dina Harmeneh'   , body : "She would workout with the app and take short runs with her dog #activity"},
                            {_subject: 'Dina Harmeneh'   , body : "Ate well and worked out regularly"},
                            {_subject: 'Dina Harmeneh'   , body : "Yes, she now uses the Kinect and she used to use the FitStar app"},
                            {_subject: 'Dina Harmeneh'   , body : "I love using the Kinect to workout. It's like having an instructor come to my house and put on a fun workout class for me. I love that I can do it in my home and I don't have to pay any membership fees or have to worry about opening/closing times. #quote"},
                            {_subject: 'Brad Allen'      , body : "He was very athletic in his early 20s. He played soccer competitively, tennis and ran a few marathons. When he turned 30 he got a job that required him to travel a lot and he had to give up his highly active lifestyle. From 30 to about 40 he would work out in hotel gyms and jog when he could find the time. When he was 46 he tore his Achilles tendon while playing tennis with a friend and that caused him to slow down for a few years. Now he's trying to get more active. #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "His routine hasn't changed much from 6 months ago #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "He was at his fittest when he was in his 20s. He attributes this to his high metabolism and highly active lifestyle. #touchpoint"},
                            {_subject: 'Brad Allen'      , body : "He doesn't use any software or tools now. He hasn't tried any because he has a Blackberry and the app store is very limited. #touchpoint #painpoint"},
                            {_subject: 'Brad Allen'      , body : "I would love to use an app to track how many calories I burn while doing my Muay Thai workouts. I've heard of a product called Jawbone that I could wear as a bracelet but I'm not sure if I'll need to hook that up with my phone. I feel a bit overwhelmed by all of the wearable tech options to be honest! #quote"}
                        ]
                    },
                    {
                        name  : "Conclusion and Thank You",
                        desc  : "- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their reimbursement\n- Provide assistance with leaving building\n- High fives!",
                        _messages : []
                    }]
    },
    {
            created_by_account: account,
            created_by_user : id,
            desc : "1. Understand whether Email Inbox is designed according to users' expectations for email clients.\n"+
                   "2. Measure whether Delete, Add Recipient and Reply functions are intuitive for users.\n"+
                   "3. Evaluate if the iconography used in the Email Inbox is easily understood by users.",
            kind : "prototype",
            link : "http://invis.io/2J1SN6AYV",
            name : "Ex. Prototype Testing - Email Inbox App",
            summary : "Overall, participants had positive feedback on the general experience of the app. A few participants mentioned that they appreciate and rely on the ability to sort their emails into categories. The fact that this app lacks that functionality could deter people from using it. We should discuss the possibility of including similar behaviour in the app. Meghan said, 'You should really consider a sorting feature. Especially since this is an app. People on their phones will be in a hurry no matter what. No one wants to spend 20, 30, 40 minutes tending to emails on their phone! You should focus all your efforts on trying to make the experience as quick and streamlined as possible.' She also mentioned that this app would not work well for someone who receives a large number of emails per day. Having all emails in one inbox stream could be overwhelming (especially on a mobile device).\n\nAnother issue participants had with the experience was that there was no indication of multiple people on one thread in the Inbox view. All of the participants were surprised to see three people on the email thread once they opened the email from Billy. One way we could solve this issue is if we put a number beside the name of the sender to indicate that there are others on the thread. Once they opened the thread they were also confused by the sequence of the emails. The participants all mentioned that the order should be Billy's email (sent first at 8AM), then Matt's (send around 2PM) and finally Laura's (sent 15sec ago).\n\nMost participants understood the Delete, Add Recipient and Reply functions. The experience was similar to what they are used to. Meghan struggled with the Delete and Add Recipient functions because the icons were unfamiliar to her. It took her a few moments to realize that the garbage can icon was the delete button. She also questioned the Add Recipient functionality not knowing what the plus and minus icons would do. Every participant but Meghan understood the iconography used in the app.",
        'tags'  :['issue', 'comprehension', 'preference', 'effort', 'quote'],
        'subjects' : ['Imogen Best','Jeff Smith','Mark Cregan','Meghan Anderson','Molly Kraft','Sasha Arfin'],
        'tasks' : [{
                    name :"Introduction",
                    desc :"Note: This is to set the tone for the interviewee. We’ll introduce ourselves and set “ground rules” for the discussion.\n- My name is __________.\n- Thanks for talking to us today, we’ll be about 30 minutes.\n- We’re going to talk about a new app we're designing.\n- This discussion is confidential – your personal information or specific answers won’t be used publicly so don’t hesitate speak your mind.\n- No right or wrong answers - very important to not say what you think I want to hear, but what you are actually thinking/feeling. Feel free to stop us at anytime for clarification, questions, or concerns.\n- We’ll have you play around with a few things we’ve been working on. We’d like you to speak out loud and tell us about everything you’re thinking/feeling/etc.\n- You’ll be recorded, but this information will not be distributed.",
                    _messages : []
                },{
                    name :"Email Habits Background",
                    desc :"- Which company do you use for your email accounts?\n- Do you have separate providers for your personal and work accounts?\n- As a percentage, how much of your email creation and management do you do on your mobile devices?\n- Which mobile device do you use?\n- Do you use any email apps, other than those that came pre-installed? If so, which ones?\n- Why did you switch email apps from those that are on your phone?",
                    _messages : [
                        {_subject:'Imogen Best'     , body:"Yahoo"},
                        {_subject:'Imogen Best'     , body:"Imogen uses the Mail app on her iPhone 4s. She felt that the Email App experience was similar to the Mail App. It was easy for her to use and she enjoyed the app overall. She was confused by the order of the thread and thought that the email sent first based on the timestamp should be at the top of the display, then the second and the final one should be the latest email sent. She understood how to Add a Recipient, Delete a thread and Reply to an email. The iconography was easy for her to comprehend. #summary"},
                        {_subject:'Imogen Best'     , body:"Mostly on her mobile device #preference"},
                        {_subject:'Imogen Best'     , body:"She has an iPhone 4s"},
                        {_subject:'Imogen Best'     , body:"Uses the Apple Mail app"},
                        {_subject:'Jeff Smith'      , body:"Gmail"},
                        {_subject:'Jeff Smith'      , body:"Jeff uses the Gmail app on his iPhone to check compose his emails. He felt the flow and the look of the Email app was very similar to his Gmail app. He liked that it was so similar and thought it made it much easier for him to use. The iconography was similar to the Gmail app so he had no issues with understanding any of it. He also understood how to Delete, Add a Recipient and Reply. He was confused by the fact there were a number of people on the thread and the order of the emails. He suggested we add a sorting feature to the app to help organize the emails. #summary"},
                        {_subject:'Jeff Smith'      , body:"Mostly on his computer but he does some on his iPad and iPhone"},
                        {_subject:'Jeff Smith'      , body:"iPhone 5s"},
                        {_subject:'Jeff Smith'      , body:"He uses the Gmail app"},
                        {_subject:'Jeff Smith'      , body:"He never set up the Mail app with his Gmail account so he was checking his email in the Safari browser. One day he was prompted with a screen suggesting he download the Gmail app so he did. #preference"},
                        {_subject:'Mark Cregan'     , body:"Uses Gmail"},
                        {_subject:'Mark Cregan'     , body:"Mark grasped the overall concept of the Email app fairly easily. He uses Gmail and the Gmail app on his phone and felt that the interactions and interface of this Email app were similar to Gmail. When he clicked on the email thread he was surprised to see that there was more than one person on the thread. There was no indication on the Inbox view that there were in fact three people on the thread. He suggested we include their names on the Inbox view as well to get an understanding of who's involved in the email thread. He was also confused by the order in which the emails appeared in the thread. The latest email was from Laura but the Inbox view made it look like Matt was the last one two write. Putting Laura's name and the preview text of her email on the Inbox view would help solve this issue. The Delete, Add Recipient and Reply functions were intuitive for him and he liked and understood the iconography used in the app. #summary"},
                        {_subject:'Mark Cregan'     , body:"Most of it is done on his desktop but if he checks his emails at night or when he's on the go he'll use his phone"},
                        {_subject:'Mark Cregan'     , body:"iPhone 5s"},
                        {_subject:'Mark Cregan'     , body:"Yes, he downloaded the Gmail app"},
                        {_subject:'Mark Cregan'     , body:"He couldn't figure out how to connect his Gmail account to the Apple Mail app"},
                        {_subject:'Meghan Anderson' , body:"Microsoft Outlook"},
                        {_subject:'Meghan Anderson' , body:"Meghan receives up to 150 emails per day so she feels like the sorting feature in her Outlook app is imperative to her productivity. She complimented the simplicity of the app but thought it would only work well for people who received a few emails per day. The iconography is different than what she is used to and therefore it caused an issue for her. Having to guess which icon meant what added time to her experience and this left her with negative feelings towards it. She thought that it was easy to add recipients but questioned what the plus sign and minus icons were. Perhaps instead of icons we could use labels here to better instruct the user. #summary"},
                        {_subject:'Meghan Anderson' , body:"Most of it is done on her computer. About 20% on her phone. She much prefers email on her computer. #preference"},
                        {_subject:'Meghan Anderson' , body:"She has a Nexus 6"},
                        {_subject:'Meghan Anderson' , body:"She uses the Outlook app that came pre-installed on her phone. She decided to use this app and not download another one because she heard it has great features. She really likes it so far. #preference"},
                        {_subject:'Molly Kraft'     , body:"She uses Rackspace Email #preference"},
                        {_subject:'Molly Kraft'     , body:"Most of it is done on her phone. She's constantly on the go due to the nature of her job"},
                        {_subject:'Molly Kraft'     , body:"She has an iPhone 6"},
                        {_subject:'Molly Kraft'     , body:"Molly has a Rackspace email and uses the Apple Mail app to check her email on her iPhone 6. She’s constantly on the go due to the nature of her job so most of her emailing is done on her phone. She understood how to Add a Recipient, Delete a thread and Reply to an email. The iconography was easy for her to comprehend. She really liked that the email address autocomplete included a small profile picture. She was confused by the order of the thread and the fact that there was no indication of multiple people on the thread pertaining to dinner plans. She said if these two things were fixed she would happily download and use the app. #summary"},
                        {_subject:'Molly Kraft'     , body:"No, she uses the Apple Mail app #preference"},
                        {_subject:'Sasha Arfin'     , body:"Gmail"},
                        {_subject:'Sasha Arfin'     , body:"Sasha has a Samsung Galaxy phone and uses the native Gmail app to check her emails. She likes that she has the ability to sort her emails into categories in Gmail. She understood the Delete, Add Recipient and Reply functions and the iconography was easy for her to comprehend. She too mentioned that it was confusing that not all of the names of the people on the thread were included on the Inbox view. #summary"},
                        {_subject:'Sasha Arfin'     , body:"50% on her computer and the other 50% on her phone"},
                        {_subject:'Sasha Arfin'     , body:"She uses a Samsung Galaxy S III"},
                        {_subject:'Sasha Arfin'     , body:"No, she uses the native Gmail app on her phone #preference"}
                    ]
                },{
                    name :"Task 1 - Landing in your inbox",
                    desc :"Ok, great, now we've going to get you to play with an email app we are designing. Pick up the phone in front of you and unlock it. I want you to pretend that you we're out shopping, and just remembered that you needed to email a friend to make plans for dinner.\n- What is the first thing you notice when you land in your inbox?\n- Walk me through the elements you see on the screen.\n- Talk me through your thought process when you are confronted with unread emails.\n- After seeing your inbox, what is the first action you want to take?",
                    _messages : [
                        {_subject:'Imogen Best'     , body:"That there are two unread emails. She easily recognizes this because they are marked just like the unread emails in the Apple Mail app. #preference #comprehension"},
                        {_subject:'Imogen Best'     , body:"She sees the green new email button on the top right, a menu button on the top left and wonders what would be in the menu, a search bar and the list of emails #comprehension"},
                        {_subject:'Imogen Best'     , body:"I'll scan the unread emails and if they don't sound urgent I'll leave them for later and reply to them on my computer. The ones that are urgent I answer right away on my phone. #quote #effort #preference"},
                        {_subject:'Imogen Best'     , body:"I want to read Jon's email because he has written about a burger place I apparently need to try. Maybe I could suggest this to Billy, who is writing me about our supper plans. #quote #comprehension"},
                        {_subject:'Jeff Smith'      , body:"That there are two unread emails #comprehension"},
                        {_subject:'Jeff Smith'      , body:"Sees a menu icon in the top left corner, a new email button in the top right corner, search bar and list of emails. #comprehension"},
                        {_subject:'Jeff Smith'      , body:"This looks very similar to my Gmail app. I really enjoy the Gmail app so I think I'd like this app too. #quote"},
                        {_subject:'Jeff Smith'      , body:"He always reads the older emails first because they might be time sensitive. He has alerts on his phone so he is notified when he gets a new email. He always checks it right away. #preference #effort"},
                        {_subject:'Jeff Smith'      , body:"He wants to read the email from Jon because it suggests a place for dinner and maybe he could tell Billy about it. #comprehension"},
                        {_subject:'Mark Cregan'     , body:"Notices that there are two unread emails"},
                        {_subject:'Mark Cregan'     , body:"Menu in the top left corner, compose new email button in the top right corner, search bar below those to search your inbox, list of emails #comprehension"},
                        {_subject:'Mark Cregan'     , body:"Sees the two unread emails and feels an urgency to respond to them. He hates having unread emails in his inbox. Likes to keep it at zero  #comprehension #preference"},
                        {_subject:'Mark Cregan'     , body:"Sees that one of the emails has an attachment #comprehension"},
                        {_subject:'Mark Cregan'     , body:"Sees that the friend he's having dinner with has written him about dinner. Asks if he feels like grabbing a burger. Second unread email is from someone recommending a burger place. Apparently it's very good! #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He wants to read Jon's email about the burger place and then respond to his friend about dinner and recommend the burger place that Jon suggested. #preference"},
                        {_subject:'Meghan Anderson' , body:"It's very simple. There's no way to sort emails so she assumes that all emails just go into the inbox. The Outlook app sorts them for you into Focused and Other categories. This is very helpful when you're on the go and just want to see the emails that pertain to you and are a bit more urgent in nature. #preference #comprehension"},
                        {_subject:'Meghan Anderson' , body:"Sees a menu icon in the top left corner, Inbox title, she thinks the green button is the new email button but isn't sure. Asks why it isn't an envelope. Below that is a search bar and the list of emails. #issue #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She scans the name and then reads the preview text. Depending on what she reads she then decides which email should be answered first. #preference #effort"},
                        {_subject:'Meghan Anderson' , body:"Respond to the emails #preference"},
                        {_subject:'Molly Kraft'     , body:"She notices that she has two unread emails, both seem to pertain to the topic of dinner/food #comprehension"},
                        {_subject:'Molly Kraft'     , body:"She sees a menu icon in the top left corner, the Inbox screen title in the centre of the top bar, a new email button on the right top corner and the list of emails.The emails all show who they are from, a snippet of text from the email and a time stamp. Some of the emails have attachment icons. #comprehension "},
                        {_subject:'Molly Kraft'     , body:"She scans the email at the top of the list first to see who it's from, what it's pertaining to and what time it is sent at. Then she does the same for the second email. Based on what she reads from the preview text she decides which email should be responded to first. #preference #comprehension"},
                        {_subject:'Molly Kraft'     , body:"After reading the snippet of text she would check out Jon's email first to see which place he's suggested and then tell Billy about it because Billy seems to be interested in eating a burger tonight #comprehension #effort"},
                        {_subject:'Sasha Arfin'     , body:"She first notices the new email button. The bright green colour attracts her eyes to it #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"She sees a menu icon in the top left corner, new email button on the top right, search bar and list of emails. The unread emails are marked with dots and the text is bolded in the name and title. All of the emails have a time stamp. #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"Since she has to meet her friend for dinner (she assumes that friend is Billy because he's emailing her about dinner plans) she'd open Billy's email first. She would read it and if she felt the need to, she would respond immediately or she would think about her response while she read the other unread email. #preference #effort"},
                        {_subject:'Sasha Arfin'     , body:"I'm not the type of person who's obsessed with having an inbox of zero. I often read emails and if they're not urgent I'll mark them as unread and answer them when I feel like it. Or if they are newsletter emails or store promos I will often skip over them and just leave them in my inbox. I should really just delete them right away but I can't be bothered! #quote #preference"},
                        {_subject:'Sasha Arfin'     , body:"She likes how Gmail sorts her emails into different categories. She knows the Social and Promotions often don't have urgent emails waiting in them so she just focuses her attention on the Inbox category. It helps make her feel like she's got her inbox sort of in control. #preference"},
                        {_subject:'Sasha Arfin'     , body:"She doesn't think she'll be able to do this in this app and that would 'drive her nuts!' #quote #preference #issue"},
                        {_subject:'Sasha Arfin'     , body:"The first action she would take is responding to Billy's email #comprehension"}
                    ]
                },{
                    name :"Task 2 - Managing unread email",
                    desc :"Alright, let's read that email from Billy Kiely. Tap on that item.\n- What is the first thing you notice when you land on this screen?\n- Does the oder that the messages are displayed in make sense to you?\n- If you wanted to reply to Laura, what would you do?\n- If you wanted to reply to Billy, what would you do?\n- If you decided you don't really want to see these people, and wanted to delete these emails, what would you do next? Why?",
                    _messages : [
                        {_subject:'Imogen Best'     , body:"Didn't see Billy's name at first #issue #comprehension"},
                        {_subject:'Imogen Best'     , body:"Asks who the other people are and then realizes they are on a thread together #issue #comprehension"},
                        {_subject:'Imogen Best'     , body:"The order of messages does not make sense to her. It should be Billy first, then Matt and then Laura based on timestamp. #issue #comprehension"},
                        {_subject:'Imogen Best'     , body:"She wonders why Billy's name was highlighted on the previous page and asks if maybe it was because she marked his email 'Unread from this point' #comprehension #issue"},
                        {_subject:'Imogen Best'     , body:"If she wanted to reply to Billy she would tap the section with his email in it and assumes a reply icon would appear. #comprehension #effort"},
                        {_subject:'Imogen Best'     , body:"She would tap the garbage bin icon in the top bar. That's what she does in the Mail app so she thinks it's the same here #comprehension"},
                        {_subject:'Jeff Smith'      , body:"He notices that other people are included on this thread and that Laura Williams wrote about 15s ago #comprehension"},
                        {_subject:'Jeff Smith'      , body:"Surprised by the fact there are a few people on the thread. Asks why there wasn't an indication of this on the Inbox view #issue #comprehension"},
                        {_subject:'Jeff Smith'      , body:"No. He thinks that Billy's email should be first because it was sent at 8AM and then it should be Matt and finally Laura. #issue #comprehension"},
                        {_subject:'Jeff Smith'      , body:"He'd click the garbage can icon. He would do this because it's a similar action in Gmail so he assumes it's the same here. #comprehension"},
                        {_subject:'Mark Cregan'     , body:"There are a few people on the thread and Laura has suggested the place that Jon may have emailed about #comprehension"},
                        {_subject:'Mark Cregan'     , body:"That there are three people on the thread discussing dinner plans #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He would click on the row with Billy's email in it and then assumes a reply icon will appear in the top right corner #effort #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He would click the garbage can icon in the top bar. He would do this because that's how he knows it works in Gmail. He would appreciate it if it worked the same way here. He thinks that's a simple interaction. #preference #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He thought that Billy had been the last to email him because of the preview that showed up on the inbox view. So no, not really. #issue #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She notices that Billy is not the only person on the thread #comprehension"},
                        {_subject:'Meghan Anderson' , body:"Why weren't the names of the other people on the thread included on the previous page? Or at least a number beside Billy's name indicating that there are others on the thread? #quote #issue"},
                        {_subject:'Meghan Anderson' , body:"No. Billy's timestamp is 08:14 and Matt's is 14:39 so really it should be ordered, Billy, Matt and then Laura. #issue #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She would click on the section with Billy's email in it #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She doesn't immediately know how to delete the email #issue"},
                        {_subject:'Meghan Anderson' , body:"She finds the garbage can icon but comments that it's so simplistic. #preference"},
                        {_subject:'Meghan Anderson' , body:"What if I didn't want to delete the entire thread or clicked the garbage can by accident? I would appreciate an alert that would ask me to confirm this decision. #quote #issue"},
                        {_subject:'Molly Kraft'     , body:"That there's more than just one person on this thread #issue #comprehension Yes the order makes sense. Laura was the last person to write on the thread so her email should display last. #comprehension"},
                        {_subject:'Molly Kraft'     , body:"Yes the order makes sense. Laura was the last person to write on the thread so her email should display last. #comprehension Laura was the last person to write on the thread therefore her email should appear in the preview on the Inbox page not Billy's. #issue"},
                        {_subject:'Molly Kraft'     , body:"Laura was the last person to write on the thread therefore her email should appear in the preview on the Inbox page not Billy's. #issue She would click on the section of Billy's email and then a reply icon would sit in the right hand side of the email much like how Laura's email is showing right now #comprehension"},
                        {_subject:'Molly Kraft'     , body:"She would click on the section of Billy's email and then a reply icon would sit in the right hand side of the email much like how Laura's email is showing right now #comprehension"},
                        {_subject:'Molly Kraft'     , body:"She would clicked the garbage can icon in the top grey bar to delete the thread and thinks a pop up with appear that asks her if she's sure she wants to delete the whole thread. #comprehension"},
                        {_subject:'Molly Kraft'     , body:"I like that the icons are the same as my Mail app. I can easily navigate this app thanks to them being so similar #quote #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"Oh! It's not just Billy on this thread. If Laura responded to this thread 15 seconds ago you'd think the Inbox view would've updated! #quote #issue"},
                        {_subject:'Sasha Arfin'     , body:"Yes, the order makes sense #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"If she wanted to reply to Billy she would click on the section with his email and name in it #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"She would click on the garbage icon in the top bar. This icon is familiar to her. In Gmail that's what she would do if she wanted to delete an email. She assumes it would be the same here. #comprehension"}
                    ]
                },{
                    name :"Task 3 - Writing a new email",
                    desc :"Alright, let's send that recipe to your friend. So let's write a new email.\n- Where would you click in your inbox to start writing a new email?\n- What is the first action you take when you are sending a new email?\n- Do you understand what all of these labels mean?\n- If you want to add someone to the 'To:' field, how would you do that?\n- Why do you think the plus sign turned into a minus sign once you added a recipient to this email?\n- Talk me through how you identify your contacts when you add them to an email?\n- Now type out your email, (email text should appear when they click on Subject or Email Input fields,) and send it.\n- What did you think of that? Was that what you expected? Why or why not?",
                    _messages : [
                        {_subject:'Imogen Best'     , body:"The green button #comprehension #effort"},
                        {_subject:'Imogen Best'     , body:"Adding the recipients to the email #effort Yes, they're all straight forward and familiar #comprehension"},
                        {_subject:'Imogen Best'     , body:"Yes, they're all straightforward and familiar #comprehension"},
                        {_subject:'Imogen Best'     , body:"She would click the plus icon to add someone to the 'To:' field #comprehension"},
                        {_subject:'Imogen Best'     , body:"She starts writing their email and then clicks or taps on the suggested email #preference #comprehension"},
                        {_subject:'Imogen Best'     , body:"Imogen uses the Mail app on her iPhone 4s. She felt that the Email App experience was similar to the Mail App. It was easy for her to use and she enjoyed the app overall. She was confused by the order of the thread and thought that the email sent first based on the timestamp should be at the top of the display, then the second and the final one should be the latest email sent. She understood how to Add a Recipient, Delete a thread and Reply to an email. The iconography was easy for her to comprehend."},
                        {_subject:'Jeff Smith'      , body:"He would click the green button in the top right corner. This is similar to gmail too. He recognizes the icon as a compose new email icon. #comprehension"},
                        {_subject:'Jeff Smith'      , body:"He would begin writing the email so he doesn't forget the thought that sparked the email. #preference #effort"},
                        {_subject:'Jeff Smith'      , body:"Yes, all of the labels make sense #comprehension"},
                        {_subject:'Jeff Smith'      , body:"He would just start typing in the 'To:' field. He doesn't know all of his friend's emails so he just types in their names and waits for it to show him a suggested name and email address #preference #effort"},
                        {_subject:'Jeff Smith'      , body:"Yes, it's very much like the Gmail app. Totally what he had expected. #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He would click the 'Inbox' button to go back to the Inbox view and assumes the compose new email button would appear on the top right #comprehension"},
                        {_subject:'Mark Cregan'     , body:"Yes, he understands what all of the labels mean #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He would click within the 'To:' line to add an email address #comprehension"},
                        {_subject:'Mark Cregan'     , body:"When I add my friends to an email I start by writing the first four characters of their names and wait for a suggestion to pop up and then I click on the suggestion if it is correct #quote"},
                        {_subject:'Mark Cregan'     , body:"Yes, it was what he expected. He thought it was straight forward and much like the familiar Gmail interface behavior #preference #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She would click the green button in the top right corner. Asks again why it's a pencil and not an envelope #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She first writes the email, then the subject line and finally includes the recipient(s). She adds the recipient(s) last just in case she sends the email by accident before finishing it up. #preference #effort"},
                        {_subject:'Meghan Anderson' , body:"Yes, all of the labels are standard but she wonders what the plus sign in the 'She would click into the 'To:' field and begin writing the person's email address #comprehension To:' field represents. Thinks it might be to add more recipients but asks why could you just type their name in? #comprehension #issue"},
                        {_subject:'Meghan Anderson' , body:"She would click into the 'To:' field and begin writing the person's email address #comprehension"},
                        {_subject:'Meghan Anderson' , body:"She looks for their full email to appear in the To: line #comprehension #preference"},
                        {_subject:'Meghan Anderson' , body:"Yes, it all made sense to her. She asked what the minus icon would do. Wondered if it would delete all of the recipients in the field. #issue #comprehension"},
                        {_subject:'Molly Kraft'     , body:"She would click the green button in the top right corner to write a new email #comprehension"},
                        {_subject:'Molly Kraft'     , body:"The first thing she does when she's writing a new email is create a subject line #preference"},
                        {_subject:'Molly Kraft'     , body:"Yes, she understands what all of the labels mean #comprehension"},
                        {_subject:'Molly Kraft'     , body:"She would begin typing in the recipients name and assumes some names will be suggested to her"},
                        {_subject:'Molly Kraft'     , body:"She identifies her contacts by their full name appearing with their email address #comprehension"},
                        {_subject:'Molly Kraft'     , body:"Yes, it's what she expected. She loves that there's even an image of the person with the name and address #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"She would click the green button with the pencil in it #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"She puts in the email addresses of the people she's sending the email to #effort"},
                        {_subject:'Sasha Arfin'     , body:"Yes, she understands all of the labels. Says they're pretty standard. #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"She would tap on the 'To:' field and then start typing the email address of the recipient #effort #comprehension"},
                        {_subject:'Sasha Arfin'     , body:"She looks to see if their name pops up as she's typing #preference"},
                        {_subject:'Sasha Arfin'     , body:"Yes, it was what she expected. She like the layout. It's very easy for her to read and click on #comprehension #preference"}
                    ]
                },{
                    name :"Task 4 - Deleting emails",
                    desc :"Ok, so your are back in your inbox. Now it is time to clear out unwanted messages. Jon is trying to make dinner plans with you, but you already have plans with Billy. Let's just delete Jon's message without replying.\n- What would you do next? Why?\n- Is there anything else you would do at this point?\n- What additional info would have helped?\n- Is that a familiar action for you based on other apps you use regularly?",
                    _messages : []
                },{
                    name :"Thoughts and Feedback on the Experience",
                    desc :"- Having walked through this experience now, how did it compare to your experiences with other email apps?\n- Is it better or worse? Why?\n- Do you think you would use this email app?\n- What did you feel was missing? \n- What did you find confusing?\n- Do you have any other thoughts or feedback for us?",
                    _messages : [
                        {_subject:'Imogen Best'     , body:"She felt it was very similar to the Mail app. She liked it and would download it! #preference"},
                        {_subject:'Imogen Best'     , body:"She found the order of the emails in the thread confusing and thought it was odd that the other people on the thread weren't included on the Inbox page #issue"},
                        {_subject:'Jeff Smith'      , body:"It was very similar to the Gmail app. The only thing he'd like to see added is the ability to categorize emails. It's a feature that he's learned to rely on to sort his emails. #preference"},
                        {_subject:'Jeff Smith'      , body:"He doesn't feel like it's better or worse #preference"},
                        {_subject:'Jeff Smith'      , body:"He found it confusing that the people on the thread weren't displayed on the Inbox page and that their emails were out of order. #issue #comprehension"},
                        {_subject:'Jeff Smith'      , body:"Love the colour palette! #preference"},
                        {_subject:'Mark Cregan'     , body:"He thought it was very similar to the Gmail app experience. The icons were the same which made things easier, composing a new email, deleting and replying to people is all the same too. He really likes the feature that autopopulates the 'To:' field. #preference #comprehension"},
                        {_subject:'Mark Cregan'     , body:"He feels indifferent. Though the order in which the email thread appeared was confusing and there was no indication of multiple people being on that thread. #issue"},
                        {_subject:'Mark Cregan'     , body:"He would like to see other people's names in the Inbox view of the email to give him a better understanding of who has responded on the thread."},
                        {_subject:'Meghan Anderson' , body:"It was a much simpler experience than the Outlook app. She prefers the structure and interactions of the Outlook app. She gets up to 150 emails a day so having the sorting feature in the app is a life saver #preference"},
                        {_subject:'Meghan Anderson' , body:"It's worse. It's far too simple. This app is for someone who gets only a few emails a day. #quote"},
                        {_subject:'Meghan Anderson' , body:"You should really consider a sorting feature. Especially since this is an app. People on their phones will be in a hurry no matter what. No one wants to spend 20, 30, 40 minutes tending to emails on their phone! You should focus all your efforts on trying to make the experience as quick and streamlined as possible. #quote"},
                        {_subject:'Molly Kraft'     , body:"It was very similar to the Mail app she's used to. However, the Mail app shows the names of all the people on the thread on the Inbox view."},
                        {_subject:'Molly Kraft'     , body:"She only found the thread issue confusing but it didn't stop her from being able to understand who wrote what and when they sent it. It wasn't a major issue just more of an annoyance. #issue"},
                        {_subject:'Molly Kraft'     , body:"Loves the profile images! #preference"},
                        {_subject:'Molly Kraft'     , body:"Molly has a Rackspace email and uses the Apple Mail app to check her email on her iPhone 6. She’s constantly on the go due to the nature of her job so most of her emailing is done on her phone. She understood how to Add a Recipient, Delete a thread and Reply to an email. The iconography was easy for her to comprehend. She really liked that the email address autocomplete included a small profile picture. She was confused by the order of the thread and the fact that there was no indication of multiple people on the thread pertaining to dinner plans. She said if these two things were fixed she would happily download and use the app."},
                        {_subject:'Sasha Arfin'     , body:"It was similar to the Gmail app but lacked the ability to sort emails into categories. For someone who tends to leave many emails unread she really appreciates that feature #preference"},
                        {_subject:'Sasha Arfin'     , body:"She thinks it's worse because of the lack of that feature. Her email would be impossible to control and she'd rely heavily on the search function #issue"},
                        {_subject:'Sasha Arfin'     , body:"She found it confusing that the names of the other people on the thread were not included on the Inbox view page #comprehension #issue"},
                        {_subject:'Sasha Arfin'     , body:"Consider adding the sorting feature and she'll download the app!"}
                    ]
                },{
                    name :"Conclusion and Thank You",
                    desc :"- Thanks participant for their time\n- Get them to initial sign-in sheet, and hand them their payment cheque\n- Provide assistance with leaving building\n- High fives!",
                    _messages : []
                }]
    },
    {
            name : "Ex. Usability Testing - Weather App",
            created_by_account: account,
            created_by_user : id,
            desc :  "1. Are horizontal and vertical scrolls obvious to the user?\n"+
                    "2. Does the dual scrolling interfere with the user's experience?\n"+
                    "3. Does the current temperature need to be displayed at all times?",
            kind : "prototype",
            link : "http://framerjs.com/examples/preview/#weather-app.framer",
            summary : "Sessions with all participants went well, as they were all able to comprehend the app's interaction and content. That said, there were a few recurring themes in the feedback that stood out as ways to improve the experience:\n\n- What's Working -\n\nVisuals and iconography communicate important info quickly - In scenarios where people are looking for at-a-glance information (like checking for rain), the background imagery and icons in the hourly forecast communicate this within a second or two for participants.\n\n90% of info required can be found without scrolling - For most participants, they information they would typically be looking for when using their weather app was found immediately upon opening the app.\n\n\n- What Issues Were Found - \n\nHorizontal scroll interference when scrolling vertically quickly - users who scrolled slowly and deliberately up and down the page didn't have any issue with this. But users who make quick movements up and down the page (representative more of our majority, utility-driven users) would accidentally hit the horizontal interaction while moving up and down the page, which created confusion. \n\nDon't separate Today's Forecast information - It confused a number of participants to have different pieces of this information set located at the top and bottom of the app. Their expectation is that this information would be found all within the same context. \n\nMore visual distinction for numbers on screen - Some participants had an issue distinguishing dates, temperatures, highs and lows, as they are all presented in white text. We need to create some hierarchy for this information to make it distinguishable at a glance.\n\n\n- Next Steps -\n\n1. Explore options to reduce/eliminate the sensitivity of the horizontal scroll to reduce likelihood of vertical scroll interference.\n2. Review organization of Today's Forecast information - sketch concepts for alternate solutions.\n3. Explore visual hierarchy for numbers in the app.",
        'subjects' : ['Vince Wagenar','Lisa Truitt','Julie Stenson','Janet Santiago','Beverley Gilreath'],

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
                    {_subject:'Julie Stenson'  , body: "They find the app layout to be minimalistic, which allows the important weather information to stand out immediately."},
                    {_subject:'Julie Stenson'  , body: "The amount of data displayed on the screen is overwhelming for her. #comprehension She says it 'feels a bit like a spreadsheet' #quote"},
                    {_subject:'Julie Stenson'  , body: "It was obvious for her that today's weather, which is typically the only piece of info she is looking for when checking her weather app, is at the top."},
                    {_subject:'Julie Stenson'  , body: "The forecasts for the remaining days of the week were correctly identified below that, with the highs and lows presented."},
                    {_subject:'Julie Stenson'  , body: "Below that, it looks like the hourly temperatures - she didn't quite understand what they were at first because it is displayed as a 24-hour clock, which she isn't used to using or seeing in New York. #comprehension She said she would need to have the ability to switch to a 12 -hour clock #issue #preference"},
                    {_subject:'Julie Stenson'  , body: "She found the detailed forecast for today at the bottom, but this is not where she expected to find it. She expected for this information to be associated with the today's weather information that appeared at the top #issue #comprehension"},
                    {_subject:'Julie Stenson'  , body: "While she doesn't want all of today's weather info every time she checks the app, he expectation is that it would be found adjacent to today's temperature, or by clicking through. She mentions this feels like it would cause her to have to hunt around the app for info more than she would like to. #effort"},
                    {_subject:'Julie Stenson'  , body: "She is reliant on iconography for an at-a-glance understanding  of the current weather - this helps to set her expectations for whether she needs to dress warmly or bring an umbrella. #preference"},
                    {_subject:'Lisa Truitt'    , body: "Her first impression of that app was that today's weather information was scattered around the app. She wants all available information accessible to her at at once. The fact that today's temperature and precipitation and humidity information are found on separate parts of the screen confused her. #issue #preference"},
                    {_subject:'Lisa Truitt'    , body: "She describes the layout of the information as a hamburger - 'I've got today's weather info at the top, then the rest of the week in the middle, and more of today's weather info at the bottom.' #quote"},
                    {_subject:'Vince Wagenar'  , body: "The imagery stood out as the first thing to catch his eye - he saw the clouds in the background, and he assumed that meant it was cloudy. 'I'm a visual guy, so I'll always look at the pictures before reading any words.' #quote"},
                    {_subject:'Vince Wagenar'  , body: "He was very focused on the visual aspects of the app - he is looking for as much imagery and iconography as possible to convey the forecast information. While he likes the background visuals and conditions icons - the rest of the information was more effort to comprehend for him than he wanted. \n\nAgain, the horizontal scroll hijacked his attempts to scroll vertically. We will need to look at best practice around this, and see if we can make this experience smoother. #summary"},
                    {_subject:'Vince Wagenar'  , body: "The iconography of the sunny, partly cloudy, raining, etc. really stuck out for him as well - it gave him a quick indication of what types of weather was coming up. #preference #usability"},
                    {_subject:'Vince Wagenar'  , body: "He described the layout of the information as 'right now, later today, later this week...and right now again for some reason.' Having the current weather info broken up into two chunks was confusing for him. #quote #issue"}
                ]
            },
            {
                name  : "Task 1 - Daily Weather Navigation",
                desc  : "• Scenario: You are heading out for work for the day, and you want to determine whether you need to bring an umbrella. Find the information that helps you determine this.\n"+
                        "• Pay attention to their scrolling to determine if the horizontal scrolling interferes with the vertical scrolling.\n"+
                        "• What piece of information are you looking for?\n"+
                        "• Did you understand that information when you found it?\n"+
                        "• What interaction were you expecting to have with today's detailed forecast, if any?",
                _messages : [
                    {_subject:'Janet Santiago'    , body: "Looking for today's detailed forecast, she was quick to scroll down and identify it. #effort"},
                    {_subject:'Janet Santiago'    , body: "She was clearly experienced using iconography to navigate sets of information quickly. We was able to complete her tasks quickly and easily.\n\nThe volume of information on the screen wasn't a distraction for her because she was able to quickly separate the signal from the noise - % chance of precipitation and forecast icons were what she was looking for. #summary"},
                    {_subject:'Janet Santiago'    , body: "In looking for the information, she didn't even try to scroll down because she was quick to identify the weather information. So there was no noticeable disruption to the scroll patterns."},
                    {_subject:'Janet Santiago'    , body: "The rain iconography and the % of precipitation clearly told her everything she needed to go at a glance. Information is being communicated simply enough for her. #effort"},
                    {_subject:'Julie Stenson'     , body: "When she attempted to scroll vertically, if her thumb pressed on the horizontal hourly weather section, it would interfere with the vertical scroll. This would happen when she was attempting to scroll rapidly to get to the bottom of the page (because she knew what info was there,) but not if she was scrolling slowly/deliberately down the page. #issue #usability"},
                    {_subject:'Julie Stenson'     , body: "Julie has a very utilitarian use for her weather app. She wants to have it opened and closed in 5 seconds, with all the info she needs available at-a-glance, without requiring any interaction. \n\nThe vertical scroll gets hijacked by the horizontal scroll if the user is scanning through content and scrolling quickly.\n\nHaving the current temperature and the detailed today's forecast split at the top and bottom of the app screen cause some confusion about where to find certain types of information for her (ex. change of rain) #summary"},
                    {_subject:'Julie Stenson'     , body: "The three pieces of information she wants at a glance are: the current temp, the temperature in the evening, and whether it is going to rain."},
                    {_subject:'Julie Stenson'     , body: "She was able to find all of that information quickly, except for the the chance of rain, because that is was buried with other information at the bottom of the screen. #usability"},
                    {_subject:'Julie Stenson'     , body: "She ideally wants to have as little interaction with the forecast as possible. 'Even the act of scrolling is to much effort for what should take me 5 seconds.' #quote #issue"},
                    {_subject:'Lisa Truitt'       , body: "'I'm looking for storm clouds or lightning bolts to know if there is rain happening tomorrow.' #quote She is looking for scannable tidbits of information that will help her identify this info at a glance. #usability"},
                    {_subject:'Lisa Truitt'       , body: "Having the little % Precipitation indicator in a different colour really makes it stand out at a glance for her."},
                    {_subject:'Lisa Truitt'       , body: "She was confused by the fact that today's weather information was split between the top and bottom of the screen. Her expectation is to find all of that information bundled together.\n\n She was a confident user of the app, and had no problem doing a minor amount of exploration in order to discover the minor interactions that make the app function. #summary"},
                    {_subject:'Vince Wagenar'     , body: "He experienced the issue with the horizontal scroll interrupting his attempts to scroll vertically. The horizontal scroll bar sits exactly where his thumb rests while holding the phone, so the landing point for his thumb when attempting to scroll is right on the horizontal scroll bar. #issue #usability"},
                    {_subject:'Vince Wagenar'     , body: "He looks for a detailed understanding of the weather - he wants to know the current temperature, chance of rain, windiness, humidity and the low temp. Because he commutes into the city for work, he needs to be able to prepare for all fluctuations in the weather for a given day."},
                    {_subject:'Vince Wagenar'     , body: "'ugh, you're going to force me to read all this to figure out what I need to bring for the day??' #quote He is looking for a set of icons or picture to communicate all of this information #preference"},
                    {_subject:'Beverley Gilreath' , body: "Information she looks for when viewing the forecast - she is an active gardener, so she is looking for hourly rain information to plan the watering of her gardens. For this, she was clearly able to see the % of precipitation"},
                    {_subject:'Beverley Gilreath' , body: "Visual distinction between the different types of numbers displayed in the app (dates, times and temperatures) would make the app much more useful for her. \n\n Scroll hijacking is not an issue when the user is slow and deliberate with their movements. She seemed like an outlier, because of the frequency and depth of her use of a weather app, whereas it is a much more utilitarian experience for most. #summary"},
                    {_subject:'Beverley Gilreath' , body: "She was very deliberate about her interactions with the app, so she did not experience any interruptions to the scrolling."},
                    
                ]
            },{
                name  : "Task 2 - Weekly Weather Navigation",
                desc  : "• Scenario: You are looking to plan a day in the park with some friends next weekend, either Saturday the 18th or Friday the 19th. Find the information that helps you determine the best day.\n"+
                        "• Pay attention to their scrolling to determine if the vertical scrolling interferes with the horizontal scrolling.\n"+
                        "• What information are you looking for?\n"+
                        "• Was it clear to you right away where that information would be found?\n"+
                        "• Was there some type of information you were looking for specifically that you couldn't find?\n"+
                        "• Did the interaction to find scroll through the dates seem logical for you?",
                _messages : [
                    {_subject:'Janet Santiago'    , body: "Having the days of the week listed made it easy for her to identify the best day with no effort."},
                    {_subject:'Janet Santiago'    , body: "The iconography made it quick to find for her. She scrolled a minor amount to expose that information. She knew exactly what she was doing. #usability"},
                    {_subject:'Julie Stenson'     , body: "Because the horizontal scroll bar is visible on screen when the app loads, she didn't have any issue engaging with it. There was no interference by the vertical scroll."},
                    {_subject:'Julie Stenson'     , body: "Her first thought was to look for the day of the week, but the app only lists the dates, so she counted the dates until she found what would be next Saturday. #preference"},
                    {_subject:'Julie Stenson'     , body: "This was clear for her from the moment she landed on the app."},
                    {_subject:'Julie Stenson'     , body: "All of the information she was expecting to find was there."},
                    {_subject:'Lisa Truitt'       , body: "She had no issues navigating the dual scrolling functionality, they didn't interfere with each other at any point while using the app."},
                    {_subject:'Lisa Truitt'       , body: "She was looking for daily information with a aggregate representation of what each day's weather will be like. The iconography of sunshine, storm clouds and rain do all of that for her at a glance. #comprehension"},
                    {_subject:'Lisa Truitt'       , body: "All of the information she was looking for was available."},
                    {_subject:'Lisa Truitt'       , body: "The left-right scroll made sense to her once she discovered it, but it wasn't obvious to her as soon as the app opened. #comprehension"},
                    {_subject:'Vince Wagenar'     , body: "The horizontal scroll wasn't obvious to him at first - even though he had an issue  with it interrupting his vertical scrolling earlier. He mentioned that he has no experience with apps that use vertical and horizontal scrolling on the same screen. #preference"},
                    {_subject:'Vince Wagenar'     , body: "Once he uncovered the horizontal scroll, he had no issue manipulating it. #usability"},
                    {_subject:'Vince Wagenar'     , body: "He recognized the dates across the top of that section and was easily able to locate the two dates and forecasts."},
                    {_subject:'Vince Wagenar'     , body: "All of the information he would need to make plans is present on the screen - again, just not as visual as he would have hoped for #preference"},
                    {_subject:'Beverley Gilreath' , body: "Looking at the hourly forecast was one of the specific areas she called out as being overwhelming - because the time above the conditions icon and the temperature below it have no visual distinction, it wasn't clear what each indicated. #comprehension #usability"},
                    {_subject:'Beverley Gilreath' , body: "Providing some sort of distinction between the numbers to indicate what is a date, what is a time and what is a temperature would help in creating some visual variance to the numbers that are shown on the app. #usability"},
                    {_subject:'Beverley Gilreath' , body: "She had no issues with the horizontal scrolling - in fact this was the first thing she was drawn to when she opened the app."},
                ]
                
            },{
                name  : "App Use Context",
                desc  : "• What times of the day do you typically check the forecast?\n"+
                        "• Where are you typically when you are checking the forecast?\n"+
                        "• How are you typically holding your phone when checking the weather?",
                _messages : [
                    {_subject:'Janet Santiago'    , body: "Her weather app use happens mostly during breakfast in the morning as she is prepping for her day. She needs something that is quick to scan, so she can make some informed decisions for her day. #comprehension"},
                    {_subject:'Janet Santiago'    , body: "She is usually sitting at the table with her phone in one hand and a spoon in the other."},
                    {_subject:'Julie Stenson'     , body: "She will typically check the weather when she is still in bed after waking up in the morning."},
                    {_subject:'Julie Stenson'     , body: "She will be lying on her side, so the phone will be held in landscape, but she will be viewing it in portrait from her perspective. This tends to cause apps to rotate into landscape mode, making using them a pain for her. #preference #usability"},
                    {_subject:'Lisa Truitt'       , body: "She typically checks right before going to sleep every night so that she can be prepared in the morning when getting ready for work. It is often when she is in front of the TV or lying in bed. So, her orientation when using an app will vary, and her interactions will vary."},
                    {_subject:'Vince Wagenar'     , body: "He typically checks the forecast twice a day, once before he goes to bed so he can make plans for the following day, and once before he leaves work and his commute home to see if anything has changed in the forecast."},
                    {_subject:'Vince Wagenar'     , body: "He will look at the weather on his phone while sitting on the couch or sitting at his desk. He is viewing it on his phone in portrait mode. #usability"},
                    {_subject:'Beverley Gilreath' , body: "She will check the weather multiple times daily during the summer months because she needs to water her gardens twice day unless it rains, so she is reliant on weather forecasts."},
                    {_subject:'Beverley Gilreath' , body: "She will check the forecast when she is in between destinations - walking between stores, on the streetcar, or waiting in line. This is why she need the visual distinction between the information displayed #usability"},
                    {_subject:'Beverley Gilreath' , body: "She typically holds the phone in one hand while her other one is busy with something else."},
                ]
            },
            {
                name  : "Conclusion",
                desc  : "• Thank participant for their time\n"+
                        "• Provide assistance with leaving building\n"+
                        "• High fives!",
                _messages : [
                    {_subject:'Janet Santiago'    , body: "Yea!"},
                    {_subject:'Vince Wagenar'     , body: "High fives all around."},
                    {_subject:'Beverley Gilreath' , body: "High five."},
                ]
            }
        ]
    }]
};