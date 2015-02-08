$(document).ready(function() {
	var userData = [
		{ 	//Adi
			'id': '1245885826',
			'statuses': [ "I love to eat Indian food and code for hours.", 
			"I hate it if I eat too much because then I would want to go to sleep.",
			"Hackathon 2005 time, woohoo!"]
		},
		{ 
			//Channing
			'id': '100009087614394', 
			'statuses': [ "Hacking on the new HP IDOL API's, and I have to say they are just incredible beyond belief. Can't stop taking photos of my 6 pack with their image recognition app to find easter eggs. I'm having so much fun, my life is so awesome right now!",
			 "Discovered that catnip is not just for cats. Sprinkled a bit on my counter and felt absolutely giddy and wonderful. Started dancing and gyrating around my mansion. Can life get any more amazing??",
			 "Just scored 2 hot dogs for the price of 1 at 7eleven. I feel great. What a beautiful and bountiful world we all live in. As a wise man once said, I'm loving it!" ]
		},
		{ 
			//Scarlett
			'id': '100009027256958',
			'statuses': [ "Stood up for the hundredth time. Guess I'm gonna be alone forever. I'm so lonely. Sure could use a cute geek to cuddle up with right now. Preferably one with at least 15+ years of NoSQL and Node.js experience. I pretty much hate everything right now.",
			"So apparently there are health and safety laws against filling your pool with champagne. Health Inspector totally screwed me over today. I'm just so depressed and angry over this. So pissed off!",
			"Being beautiful is hard work, guys! Had the worst, most terrible day sorting through hundred of Tinder requests today. FML." ]
		}
		
	];

	var API_KEY = 'dcabc379-7d01-4357-bc05-3365882df4ba';
	var endPoint = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1';

	function getSentiment(users) {
	    users.forEach(function(user, index, users) {
	        var statuses = user.statuses.join(' ')

	        $.ajax({
	            type: 'POST',
	            url: endPoint,
	            data: {
	                apikey: API_KEY,
	                text: statuses
	            },
	            dataType: 'JSON',
	            async: false
	        }).done(function(JSONdata) {
	  					user['sentiment'] = JSONdata.aggregate.sentiment;
	            user['score'] = JSONdata.aggregate.score;
	        });
	    });
			
			console.log(users);
	    return users;
	};

	NEUTRAL_PNG = 'images/neutral.png';
	NEGATIVE_PNG = 'images/negative.png';
	POSITIVE_PNG = 'images/positive.png';
	
	sentiments = getSentiment(userData);
	
	var refreshIcons = setInterval(function() {
		console.log("refreshing icons");
		
		$(".moodlet").remove();

		for (var i = 0; i < sentiments.length; i++) {
			var user = sentiments[i];
			//check if user is present in chat messenger
			switch(user.sentiment) {
			    case "positive":
			        sentimentImage = POSITIVE_PNG;
			        break;
			    case "neutral":
			        sentimentImage = NEUTRAL_PNG;
			        break;
			    case "negative":
			        sentimentImage = NEGATIVE_PNG;
			        break;
			    default:
			        sentimentImage = "";
			}
			theSelector = "li[data-id='" + user.id + "']" + "> a > div > div._5bon";
			if(sentimentImage != ""){
				HTMLToPrepend = '<span class="moodlet"><img src="'+ chrome.extension.getURL(sentimentImage) +'" width="15" height="15" /></span>';
				response = $(theSelector).prepend(HTMLToPrepend);
			}
		}
	}, 1000);
	
});