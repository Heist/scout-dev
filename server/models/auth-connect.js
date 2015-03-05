// auth-connect.js
// connect appropriate models to the auth database
// abstracted out to permit testing on a different DB

var connect = rootRequire('./config/db');
connect = connect.auth;

