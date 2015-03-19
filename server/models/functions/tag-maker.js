// tag-maker.js
// Takes a string, test, and optionally a message._id

// converts them to lowercase, 
// checks them against the existing test-indexed tag database
// if the database does not have a variant of tag
// inserts the non-lowercase version as name
// inserts the lowercase version as indexed name
// if optional property message_id exists,
// pushes message_id to the tag
// returns the 