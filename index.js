//pkg index.js --output omniticker
const interval = 12; //In seconds
// var _ = require("lodash");
var fs = require('fs');
const readline = require("readline-sync");
var ComfyJS = require("comfy.js");

var newestSub = 'c:\\Users\\Rieke\\Documents\\Streamlabels\\most_recent_subscriber.txt';
var newestFollower = "C:/Users/Rieke/Documents\\Streamlabels/most_recent_follower.txt";
var newestCheerer = "C:/Users/Rieke/Documents\\Streamlabels/most_recent_cheerer.txt";
var currentFollowers = "C:/Users/Rieke/Documents\\Streamlabels/total_follower_count.txt"
var nowPlaying = "C:\Users/Rieke/Documents/GTA San Andreas User Files/Now Playing.txt"
// var sessionSubs = "C:/Users/Rieke/Documents\\Streamlabels/session_subscriber_count.txt";
var extraTXT = "D:/Gsync/Projects/Stream/apps/Omniticker/txts/extratxt.txt";
var firstTxt = "D:/Gsync/Projects/Stream/apps/Omniticker/txts/first.txt";
var twitterTxt = "D:/Gsync/Projects/Stream/apps/Omniticker/txts/twitter.txt"
var twitchTxt = "D:/Gsync/Projects/Stream/apps/Omniticker/txts/twitch.txt"
var kofiTxt = "D:/Gsync/Projects/Stream/apps/Omniticker/txts/kofi.txt"

var subImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/sub.png";
var cheerImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/cheers.png";
var followerImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/followers.png";
var nowPlayingImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/musiccover.png";
var cstmMsgImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/msg.png";
// var sesstarImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/sesstar.png";
var oneImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/one.png";
var twitterImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/twitter.png";
var twitchImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/twitch.png";
var kofiImage = "D:/Gsync/Projects/Stream/apps/Omniticker/img/kofi.png";

var options = [newestSub, newestFollower, newestCheerer, currentFollowers, twitterTxt, twitchTxt, kofiTxt];
var optionsImage = [subImage, followerImage, cheerImage, followerImage, twitterImage, twitchImage, kofiImage];
var currentState = 0;
var lines = "";
var userinput = "";
var customMsg = "";
var readChannel = "riekelt"
var slideshowOutput = 'slideshow.txt';
var slideshowImageOutput = 'slideshowimage.png';

userinput = readline.question('Will there be GTA music? (y/n)');
if (userinput.match("y")) {
  options.push(nowPlaying);
  optionsImage.push(nowPlayingImage);
  console.log("there will be GTA music");
}
userinput = readline.question('Do you have a custom message? (n for no): ');
if (userinput !== "n") {
  customMsg = userinput;
  options.push(customMsg);
  optionsImage.push(cstmMsgImage);
  console.log("Added message: " + userinput);
}

// // Below is a minimum subs in a session thing
//userinput = readline.question('Is this stream eligible for an end-of-stream bonus?');
//if (userinput !== "n") {
//  options.push(sessionSubs);
//  optionsImage.push(sesstarImage);
//  console.log("Have fun streaming, gamer.");
//}
ComfyJS.onChat = ( user, command, message, flags, extra ) => {
	if( extra.customRewardId == '11287d42-05a6-48fd-a398-b23ae12a756a') {
		console.log(user + ' is now first');
		  options.push(firstTxt);
		  optionsImage.push(oneImage);
		fs.writeFile(firstTxt, user + ' was the first chatter today.', (err) => {
		if (err) throw err;
		});
	}
}
ComfyJS.Init( readChannel );
doSwap();
setInterval(function() {
  // Invoke function every 10 minutes
  doSwap();
}, interval * 1000);

function doSwap() {
  if (currentState == options.length) {
    currentState = 0;
  }
  if (options[currentState] == customMsg) {
    console.log(customMsg);
    fs.writeFile(slideshowImageOutput, customMsg, (err) => {
      if (err) throw err;
    });
  } else {
    fs.readFile(options[currentState], function(err, data) {
      if (err) throw err;
      //Fills lines with everything in a string array, seperated by \n.
      lines = data.toString();
      console.log(lines);
      fs.writeFile(slideshowOutput, lines, (err) => {
        if (err) throw err;
      });
    });
  }
  fs.readFile(optionsImage[currentState], function(err, data) {
    if (err) throw err;
    fs.writeFile(slideshowImageOutput, data, function(err) {
      if (err) throw err;
    });
  });
  currentState++
}
