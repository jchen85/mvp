#Restauranteur

Gamifies the process of picking restaurants. After entering your location, the app presents two restaurants side-by-side. Pick one or the other within 5 seconds, or one will be chosen for you. At the end, the winner is presented to you. The winner is calculated using the [elo rating formula](https://en.wikipedia.org/wiki/Elo_rating_system).

<img src=http://i.imgur.com/gW1rcWQ.jpg></img>

####Instructions for use
Fork and clone this repo. You must obtain Yelp Developer API keys and place them in server/config.js in a JavaScript object with the following format: 

        module.exports = {
          consumer_key: 'consumer_key',
          consumer_secret: 'consumer_secret',
          token: 'token',
          token_secret: 'token_secret'
        };
Start the server with `npm start`
