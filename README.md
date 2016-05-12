# Twitter Username Lambda

## Setting credentials

Create a credentials.json in the root of your project with the following values Setting
```
{
  "twitter": {
    "consumer_key": "<YOUR_TWITTER_CONSUMER_KEY>",
    "consumer_secret": "<YOUR_TWITTER_CONSUMER_SECRET>",
    "access_token_key": "<YOUR_TWITTER_ACCESS_TOKEN_KEY>",
    "access_token_secret": "<YOUR_TWITTER_ACCESS_TOKEN_SECRET>"
  },
  "mailgun": {
    "api_key": "<YOUR_MAILGUN_API_KEY>",
    "domain": "<YOUR_MAILGUN_DOMAIN>",
    "to": "<YOUR_RECIPIENT_EMAIL_ADDRESS>",
    "from": "<YOUR_SENDING_EMAIL_ADDRESS>"
  }
}
```

## TODO
* grunt-aws-lambda broken deployment
* update cloudwatch / sample event automatically
* alternatively - easier way to add names
* smarter email notifications. Check 30mins email every 24hrs?
* pushover notifications?
* speed enhancements, ~60 usernames = 5000ms
* tidy up codebase/format
* detect inactive account? get_username fallback?
* auto limit API to prevent rate limiting
