// emailer.js
'use strict';

var nodemailer = require('nodemailer'),
    ejs = require('ejs'),
    fs = require('fs'),
    _ = require('underscore');
    


var Emailer = (function() {
    function mail(envelope_options, message_variables) {
        this.envelope_options = envelope_options;
        this.message_variables = message_variables;
        console.log('envelope_options', envelope_options, 'message_variables', message_variables);
    }
    
    mail.prototype.envelope_options =  {};

    mail.prototype.message_variables = {};

    mail.prototype.attachments = [{
            fileName: "logo.png",
            filePath: "./public/images/email/logo.png",
            cid: "logo@myapp"
        }];

    mail.prototype.send = function(callback) {
        var template = './server/views/emails/'+this.envelope_options.template+'.ejs';
        var str = fs.readFileSync(template, 'utf8');
        var html = ejs.render(str, this.message_variables);
        
        //var attachments = this.getAttachments(html);
        var messageData = {
            to: "<tom@heistmade.com>",
            from: "Field Guide App <contact@fieldguideapp.com>",
            subject: this.envelope_options.subject,
            html: html,
            generateTextFromHTML: true
            // ,attachments: attachments
        };
        var transport = this.getTransport();
        return transport.sendMail(messageData, function(err, message){
            console.log('sent message to', message);
        });
    };

    mail.prototype.getTransport = function() {
        return nodemailer.createTransport({
                service: 'Mandrill',
                auth: {
                    user: 'mandrill@fieldguideapp.com',
                    pass: 'jvVhe4uJxHB7MFfHabelbg'
                },
                host: "smtp.mandrillapp.com",
                port: 587
            });
    };

    mail.prototype.getHtml = function(templateName, message_variables) {
        var encoding, templateContent, templatePath;
        templatePath = "./server/views/emails/" + templateName + ".html";
        templateContent = fs.readFileSync(templatePath, encoding = "utf8");
        return _.template(templateContent, message_variables, {
            interpolate: /\{\{(.+?)\}\}/g
        });
    };

    // mail.prototype.getAttachments = function(html) {
    //     var attachment, attachments, _i, _len, _ref;
    //     attachments = [];
    //     _ref = this.attachments;
    //     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    //         attachment = _ref[_i];
    //         if (html.search("cid:" + attachment.cid) > -1) {
    //             attachments.push(attachment);
    //         }
    //     }
    //     return attachments;
    // };
  
    return mail;

})();

var exports = module.exports = Emailer;