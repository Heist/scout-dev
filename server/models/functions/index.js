// function index
// index.js

'use strict';

module.exports= {
	addSubject      : require('./add-subject'),
	// accountExporter : require('./account-export'),
	buildObjectList : require('./build-object-list'),
	buildSummary    : require('./build-summary'),
	comment         : require('./comment'),
	createInvite    : require('./create-invite'),
	defaultTests    : require('./default-tests'),
	deleteTest      : require('./delete-test'),
	devTests        : require('./dev-tests'),
	dupeTests       : require('./dupe-tests'),
	editTest        : require('./edit-test'),
	forgotPasswordToken : require('./forgot-password-token'),
	messageEdit     : require('./message-edit'),
	messageFav      : require('./message-fav'),
	messageList     : require('./message-list'),
	messageNew      : require('./message-new'),
	objectUpdate    : require('./object-update'),
	resendInvite    : require('./resend-invite'),
	resetPassword   : require('./reset-password'),
	tagPuller       : require('./tag-puller'),
	testNew			: require('./test-new'),
	toTitleCase		: require('./toTitleCase'),
	userCreate      : require('./user-create')
}
