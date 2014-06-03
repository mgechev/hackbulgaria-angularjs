/* global require: false, module: false */

var Observer = require('./Observer'),
    mail = require('nodemailer').mail;

function MailObserver(config) {
  'use strict';
  this.config = config;
}

MailObserver.prototype = Object.create(Observer.prototype);

MailObserver.prototype.update = function (title, data) {
  'use strict';
  var config = JSON.parse(JSON.stringify(this.config));
  config.text = data;
  config.html = data;
  config.subject = title;
  mail(config);
};

module.exports = MailObserver;

