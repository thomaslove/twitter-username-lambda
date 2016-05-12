var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

console.log(credentials);

var Promise = require('bluebird');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: credentials.twitter.consumer_key,
  consumer_secret: credentials.twitter.consumer_secret,
  access_token_key: credentials.twitter.access_token_key,
  access_token_secret: credentials.twitter.access_token_secret
});
var clientGet = Promise.promisify(client.get);
var mailgun = require('mailgun-js')({apiKey: credentials.mailgun.api_key, domain: credentials.mailgun.domain});
var APP_NAME = "Prometheus";

exports.handler = handler;

function handler (event, context) {
    checkUsernames(event.usernames, function(availableUsernames){
      if(availableUsernames.length > 0){
        console.log('Free usernames: ' + availableUsernames);
        sendFreeUsernamesEmail(availableUsernames, function(){
          context.done(null, 'Finished. Usernames available. Email sent');
        });
      }else{
        context.done(null, 'Finished. No usernames available.');
      }
    });
};

function checkUsername(username) {
  return new Promise(function(resolve, reject){
    console.log('CHECKING: '+ username);
    client.get('users/show', { screen_name: username }, function(err, success){
      var code = err ? err[0].code : 200;
      var userObj = { username: username, available: code == 50 ? true : false };
      resolve(userObj);
    });
  });
}

function checkUsernames(usernames, cb){
  var promises = [];
  var err = false;
  usernames.forEach(function(each) {
    promises.push(checkUsername(each));
  });
  Promise.all(promises).then(function(returned) {
    var availableUsernames = [];
    returned.forEach(function(username) {
      if(username.available){
        availableUsernames.push(username.username);
      }
    });
    cb(availableUsernames);
  });
}

function sendEmail(subject, text, cb){
  var data = {
    to: credentials.mailgun.to,
    from: credentials.mailgun.from,
    subject: subject,
    html: text
  };
  mailgun.messages().send(data, function(error, body) {
    if (error){
      console.log("MailGun Error : ", err);
    }
    cb();
  });
}

function sendFreeUsernamesEmail(freeUsernames, cb) {
  var text = "<h1>New Usernames Found</h1><ul>";
  freeUsernames.forEach(function(u) {
    text += "<li>"+ u + "</li>";
  });
  text += "</ul><p><a href=\"http://mobile.twitter.com/settings/screen_name\">Change Username (Mobile)</a> | <a href=\"https://twitter.com/settings/account\">Change Username (Desktop)</a></p>";
  console.log('Sending Emails...')
  sendEmail(APP_NAME + " - New usernames available", text, cb);
}
