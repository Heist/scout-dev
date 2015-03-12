// model index
// index.js
'use strict';

module.exports = {
	User    : require('./auth/user'),
	Invite  : require('./auth/invitation'),
	Test    : require('./data/test'),
	Tag     : require('./data/tag'),
	Task    : require('./data/task'),
	Message : require('./data/message'),
	Comment : require('./data/comment'), 
	Subject : require('./data/subject')
}