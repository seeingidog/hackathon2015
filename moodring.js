// Mood Ring Code

$(document).ready(function() {

	NEUTRAL_PNG = 'images/neutral.png';
	NEGATIVE_PNG = 'images/negative.png';
	POSITIVE_PNG = 'images/positive.png';

	var users = [
		{ 
			'id': '1402854887',
			'statuses': [ "I love to eat Indian food and code for hours.", "I hate it if I eat too much because then I would want to go to sleep." ],
			'sentiment': "neutral"
		},
		{ 
			'id': '345454545', 
			'statuses': [ "i love stuff", "i hate stuff" ],
			'sentiment': "neutral"
		},
		{ 
			'id': '345236556',
			'statuses': [ "i pooped", "i showered" ], 
			'sentiment': "positive"
		},	
		{ 
			'id': '348254587',
			'statuses': [ "In my last job, my French senior developer frequently complained about everything in America." ],
			'sentiment': "negative"
		},
		{ 
			'id': '234454545',
			'statuses': [ "Focus on creating unique & engaging apps on any platform. We take care of everything else your app needs, from the core of your app to analytics and push notifications." ], 
			'sentiment': "negative"
		}
	];
	
	/*
	var users = getSentiment(getFriendIdsAndStatusMessages);
	console.log(users);
	*/

	var userIds = ["1402854887", "100000464907991","56456456546"];
	
	$.each(users, function( index, user ) {
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
		console.log(user.id);
		theSelector = "li[data-id='" + user.id + "']" + "> a > div > div._5bon";
		console.log(theSelector);
		if(sentimentImage != ""){
			HTMLToPrepend = '<span style="width:5px; padding-right:4px"><img src="'+ sentimentImage +'" />tt</span>';
			response = $(theSelector).prepend(HTMLToPrepend);
			console.log(response);
		}
		
	});
	
});