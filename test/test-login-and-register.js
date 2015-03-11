// // var agent = request.agent(app); // this is to check logins, not account creation.
// 	var account = mongoose.Types.ObjectId();
// 	var loginUser = function(){
// 			    return function(done) {
// 			        function onResponse(err, res) {
// 			           if (err){ return done(err); }
// 			           return done();
// 			        }
			        
// 		            agent.post('/auth/login')
// 		            .send({ username: 'login@heistmade.com', password: 'login' })
// 		            .expect(200)
// 		            // .end(onResponse);
// 			    };
// 			};

// // TODO: abstract login into testing middleware.
// 	describe('Test creation and manipulation', function(){
// 		describe('Automatic dev test generation', function(){
// 			it('should touch test creation', function(done){ done(); });
// 			it('login', loginUser());
// 			it('uri that requires user to be logged in', function(done){
// 				loginUser().then().catch().done();
// 			    agent
// 			        .get('/api/tests')                       
// 			        .expect(200)
// 			        .end(function(err, res){
// 			            if (err){ return done(err); }
// 			            console.log(res.body);
// 			            done()
// 			        });
// 			    });

// 			// TODO: Split this out into separate tests
// 			// it('should create a test set owned by login', function(done){
// 			// 	agent.post('/auth/login').send({
// 			// 	email:'login@heistmade.com',
// 			// 	password: 'login'
// 			// 	}).expect(200).end(function(err, res){
// 			// 		// logged in? good! Check some tests...
// 			// 		agent.post('/api/dev_tests/')
// 		 //            .send({})
// 		 //            .expect(200)
// 		 //            .end(function(err, res) {
// 		 //            	// console.log('data returned login', res.body);
// 		 //                // should.not.exist(err);
// 		 //                console.log(res.headers['set-cookie']); // Should print nothing.
// 		 //                expect(res.body).to.be.an('object')
// 		 //                // res.body.user.should.have.properties('test', '_tasks');
// 		 //            });

// 		 //            agent.get('/api/test/')
// 		 //            .send({})
// 		 //            .expect(200)
// 		 //            .end(function(err, res){
// 		 //            	console.log(res.body)
// 		 //            	done();
// 		 //            });

// 			// 	});
// 			// });

		
// 		});
// 	});
