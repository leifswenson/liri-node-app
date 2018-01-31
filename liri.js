require("dotenv").config();

// Core node package for reading and writing files
var fs = require("fs");

// Request npm package
var request = require('request');

// Twitter npm package
var Twitter = require('twitter');

// Spotify npm package
var Spotify = require('node-spotify-api');

// access your keys.js information
var keys = require("./keys.js");

// variables for twitter and spotify keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




// Capture user input
//=================================================================================================================================

var userInstruct = process.argv[2];
var userSearch = process.argv[3];


// If else statement for first argument in user input
//=================================================================================================================================

if (userInstruct === "my-tweets") {
  
  myTweets();
  
} else if (userInstruct === "spotify-this-song") {
  
  spotifyThisSong();
  
} else if (userInstruct === "movie-this") {
  
  movieThis();
  
} else if (userInstruct === "do-what-it-says") {
  
  doWhatItSays();
  
} else {
  
  console.log("Invalid response!  Please enter one of the following valid arguments,my-tweets, spotify-this-song, movie-this, do-what-it-says.");
  
}



// Twitter Function
//=================================================================================================================================


function myTweets() {
  
  // node liri.js my-tweets
  // This will show your last 20 tweets and when they were created at in your terminal/bash window.
  
  
}


// Spotify Function
//=================================================================================================================================


function spotifyThisSong() {
  
  // node liri.js spotify-this-song '<song name here>'
  
  var trackSearch;
  
  // if process.argv[3] is blank
  if(!userSearch) {
    
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    trackSearch = "The Sign";
    
  } else {
    
    trackSearch = userSearch;
    
  }
  
  
  
  spotify.search({ type: 'track', query: trackSearch, limit: 10 }, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      
      console.log(data);
      
      for (var i=0; i<5; i++) {
        
        console.log("================================================== liri ==================================================")
        // Artist(s)
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        // The song's name
        console.log("Song: " + data.tracks.items[i].name);
        // A preview link of the song from Spotify
        console.log("Preview link: " + data.tracks.items[i].preview_url);
        // The album that the song is from
        console.log("Album: " + data.tracks.items[i].album.name);

      }

    }
   
  });
  
}



// Movie Function
//=================================================================================================================================

function movieThis() {
  
  // node liri.js movie-this '<movie name here>'
  
  var userMovieSearch;
  
  // if process.argv[3] is blank
  if (!userSearch) {
    
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    userMovieSearch = "Mr. Nobody";
    
  } else {
    
    userMovieSearch = userSearch;

  }
  
  url = "http://www.omdbapi.com/";
  apiKey = "?apikey=" + "trilogy";
  movieName = "&t=" + userMovieSearch;
  queryUrl = url + apiKey + movieName;
  
  request(queryUrl, function (error, response, body) {
    
    // If there is no error and status code is 200
    if (!error && response.statusCode === 200) {
      
      // Title of the movie.
      console.log("Title: " + JSON.parse(body).Title);
      // Year the movie came out.
      console.log("Year: " + JSON.parse(body).Year);
      // IMDB Rating of the movie.
      console.log("IMDB movie rating: " + JSON.parse(body).imdbRating);
      // Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
      // Country where the movie was produced.
      console.log("Country: " + JSON.parse(body).Country);
      // Language of the movie.
      console.log("Language: " + JSON.parse(body).Language);
      // Plot of the movie.
      console.log("Plot: " + JSON.parse(body).Plot);
      // Actors in the movie.
      console.log("Actors: " + JSON.parse(body).Actors);
      
    }
    
  });
 
}



// fs random function
//=================================================================================================================================

function doWhatItSays() {
  
  // node liri.js do-what-it-says

  // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


  // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  // Feel free to change the text in that document to test out the feature for other commands.
}




//=================================================================================================================================
// THE END