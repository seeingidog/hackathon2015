/*  */
var users = [
	{ 
		'id': '343434435',
		'statuses': [ "I love to eat Indian food and code for hours.", "I hate it if I eat too much because then I would want to go to sleep." ]
	},
	{ 
		'id': '345454545', 
		'statuses': [ "i love stuff", "i hate stuff" ] 
	},
	{ 
		'id': '345236556',
		'statuses': [ "i pooped", "i showered" ] 
	},	
	{ 
		'id': '348254587',
		'statuses': [ "In my last job, my French senior developer frequently complained about everything in America." ]
	},
	{ 
		'id': '234454545',
		'statuses': [ "Focus on creating unique & engaging apps on any platform. We take care of everything else your app needs, from the core of your app to analytics and push notifications." ] 
	}
];

var API_KEY = 'dcabc379-7d01-4357-bc05-3365882df4ba';
var endPoint = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1';

$(document).ready(function() {
	$('button').on('click', function() {

		users.forEach(function(user, index, users) {
			/* We join all of the user's status updates and pass it as the text in the post request to our endpoint: */
			var statuses = user.statuses.join(' ');
			$.post(endPoint, { apikey: API_KEY, text: statuses }, function(JSONdata) {
				/* Adding sentiment and score properties, obtained from POST response, to our users array: */
				user['sentiment'] = JSONdata.aggregate.sentiment;
				user['score'] = JSONdata.aggregate.score;
			});
		});

		/*  users is now returned with 'sentiment' and 'score' properties */
		return users;
	});
});

console.log(endPoint);

