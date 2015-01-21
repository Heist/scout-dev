// emailer.js
'use strict';

var nodemailer = require('nodemailer'),
    ejs = require('ejs'),
    fs = require('fs'),
    _ = require('lodash');
    


var Emailer = (function() {
    function mail(envelope_options, message_variables) {
        this.envelope_options = envelope_options;
        this.message_variables = message_variables;
        // console.log('envelope_options', envelope_options, 'message_variables', message_variables);
    }
    
    mail.prototype.envelope_options =  {};

    mail.prototype.message_variables = {};

    mail.prototype.attachments = [{
            fileName: "fg-email-logo.gif",
            filePath: ".public/layout/assets/fg-email-logo.gif",
            cid: "logo@fieldguideapp"
        }];


    mail.prototype.send = function(callback) {
        var template = './server/views/emails/'+this.envelope_options.template+'.ejs';
        var str = fs.readFileSync(template, 'utf8');
        var html = ejs.render(str, this.message_variables);

        var messageData = {
            to: this.envelope_options.to.email,
            from: "Field Guide App <contact@fieldguideapp.com>",
            subject: this.envelope_options.subject,
            html: html,
            generateTextFromHTML: true,
            attachments: [{
                filename: 'field_guide_image.jpg',
                content: 'R0lGODlh8AAiAKIAAP///yMfIH6AgtXX2E1NT+nq677Awp2foiH5BAAAAAAALAAAAADwACIAAAP/CLrc/jDKSau9OOvNOx+HQAQkQQiG5xSGSJbCUah0bd943hjj678EmWog+BkDgoFuyWw6h72jkZCCFAYzyEEqFWSf4LCYafidDIO04RAlCRy8l7dRaCMP6HTIrBz7P1h/TltAVQ8FRXIMZWZfA1FBXw5sQH0bIiaZmpaaDGyaoJyZkgygmUkWiD5Uk5kHC48mbwufQQyYoKgMdaauFYwkrxSPclh1R14sUXMTqiWkF3Y/hj6eXAGcL9AK0i/CEsRGs7SKCsAEt96lXN8ABdfjEQOVF8dSKYlH7RSEAegb3V5Qe2GNSzYS2wAEJGEIwsKG/cadSxdsHRdD77jEc/jC/9KCNTEMkLJnxFwXByAExPCooN8+C8tUytQFoBo5GDOZKdTGMdgBSm7A+cCT71/LcgAmLsjXLspPoP4WZHSTs+EDYC+ByZE09QeKbkYtFmqQL6GEKCwb2DwaNEKUhG8VdDUbcYGPL3VNlqAYoGlHuXcBE8zQI6xYejev/UgLoN/QXeoI/42wtjHSB3Ex8+Q2+YHLpZ3zJgXC1y+Jg9gEk8gwj6EWKR4XirMipV0iwxXQSqgsWjPCngG+5LNasC9o12yRfCR93PgC3QqGqw6QgRBuqVLC5lOcGsJ2H5Zad4/W+QHvyw4yp98MQPrriuZkWhKtNHpkzqebV+maIVE8If/NTbPcUDMQscoiHmnlQzw9vDQBdBCc1xZwcLHnnmf3vaecXlE1Z9p47vGHQQ+GMIKCAuJ5xYAPVuXDoD8AgkXRRhTEJJNVEvoz0z7qNaDehZNkiOGE9bWXIYQhLjiTWQqEtooM3by4oY8TdoUECFLgNSFMtak1WHIqilXhb/YhN6RzEdDHXJlo7pQfm/txwWRNb1o2xRFhNfiAf9jdecR8W+bW5Ypf2jmbmBTql6Y3iFSVmERrGgkffiAKNN0PczrJ3ZYk7lnlpuwRQuODQGiCY6H9gMIje1SSKWkAxCUmgxHfqLmXh2JZkmSpo5AKKyygTknneAVJyZ12gdZYngP/OY76HKuIwrloMFaiaWuHbH6oq6XuVFYBn89uagkw2zCC7KZSOnjWsl6u9ui6rrYanKIavvKTU+9yeG6bSHIr4gXWFXfNudd1W2e1sAFbJ5cLM4sqevKOOa+09eKaHKS3Zpsrvf9aIF5Dsi2sZ0//cWdbxuQ13C51+Sbq28SvxprcN0y1XGTN4VaKXMcMh0XSFB71w1hyQV/TzlTqwkusw+5erLTEX0AY5KQ4G4qxsFW7OR50PP8iJFRbQZbsLoU1EM4qLUIrqMqENm310y7PNe2U+Orb8qvaTpdF12svnVQIeIwk9Zk0prTS1G2m7HfbLCd3gqOU5qSLU/dCvMhQ6C08Nh0Kjp08qdZPQdInVTkNg1gFJCUtluqIF6ws23Y9rFHORlQhm8y008rXFJJkffvoUngtJARnO7vCMnO6U1TywA3dpOwnUVq79D+wDkCKcnz+M4tkHcmO2FxY4BgrVmxn/ANnR5ImJM5TgEv7ndDSyynPzU/+/DRNkP4rIuyDSBv5a4kvltKLAPLCfhdQ0BnSMIA12OF8VnggHhi4h1W0TxAY3EUaUrHBDGLgbMfCHT+ChQTmefCEKCRDyNTnAQMpJoApjKEMn5ASSJwBByxwARBiYMIZ+vCHQAyiEIdIxCIa8Yg4SAAAOw==',
                encoding: 'base64',
                cid: 'source@app.fieldguide.com'
            }]
        };

        var transport = this.getTransport();
        return transport.sendMail(messageData, function(err, message){
            // console.log('sent message to', message);
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