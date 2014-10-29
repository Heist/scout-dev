// emailer.js
'use strict';

var nodemailer = require("nodemailer");
var fs = require("fs");
var _ = require("underscore");


var Emailer = (function() {
    function mail(options, data) {
        this.options = options;
        this.data = data;
    }

    mail.prototype.options = {};

    mail.prototype.data = {};

    mail.prototype.attachments = [{
            fileName: "logo.png",
            filePath: "./public/images/email/logo.png",
            cid: "logo@myapp"
        }];

    mail.prototype.send = function(callback) {
        var attachments, html, messageData, transport;
        html = this.getHtml(this.options.template, this.data);
        attachments = this.getAttachments(html);
        messageData = {
            to: "'" + this.options.to.name + " " + this.options.to.surname + "' <" + this.options.to.email + ">",
            from: "'Field Guide'",
            subject: this.options.subject,
            html: html,
            generateTextFromHTML: true,
            attachments: attachments
        };
        transport = this.getTransport();
        return transport.sendMail(messageData, callback);
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

    mail.prototype.getHtml = function(templateName, data) {
        var encoding, templateContent, templatePath;
        templatePath = "./views/emails/" + templateName + ".html";
        templateContent = fs.readFileSync(templatePath, encoding = "utf8");
        return _.template(templateContent, data, {
            interpolate: /\{\{(.+?)\}\}/g
        });
    };

    mail.prototype.getAttachments = function(html) {
        var attachment, attachments, _i, _len, _ref;
        attachments = [];
        _ref = this.attachments;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            attachment = _ref[_i];
            if (html.search("cid:" + attachment.cid) > -1) {
                attachments.push(attachment);
            }
        }
        return attachments;
    };
  
    return mail;

})();

var exports = module.exports = Emailer;