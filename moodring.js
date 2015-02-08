// Mood Ring Code

var access_token = "CAAFgOezy31ABAMWyExoU193G09tvZBgjA6whGRknZAXjlGUZAR6FnjKklQpF7OpUgZCVdRsG2vrXemua6YbqZBF6MyQZBStOmztsGpBeZB5uCJiC08jAcdayyBOJxq97R3aQOQXprNJgkOOPzd3jG5ydpGPcY9lVxFd47bTYdMYfKtK30XBJw4EEnTAue0XWI6x2qsxrjuayzOeYMXbqbBi"

function runMoodRing() {
    console.log("MOOD RING RUNNING");
	//
	// Returns array of status messages from user
	function getStatusMessages(userId, callback) {
        console.log("GetStatusMessages");
		var messages = new Array();
        FB.api(
            "/" + userId + "/feed",
            {
                      "access_token": access_token,
                "filter": "app_2915120374"
            },
            function (response) {
              if (response && !response.error) {
                for (var i = 0; i < response['data'].length; i++) {
                    var post = response['data'][i];
                    if (post['message'])
                        messages.push(post['message']);
                }
                callback(messages);
              } else {
                  console.error(reponse.error);
              }
            }
        )
	}


	//
	// Returns array of logged in friend ids
	function getFriendIds(callback) {
		var friendIds = new Array();
	  var friendTags = document.getElementsByClassName("fbChatSidebarBody")[0].getElementsByTagName("li");
        
        $.each(friendTags, function(key, value) {
            friendIds.push(value.getAttribute('data-id'));
        });
            
        callback(friendIds);
	}


	//
	// Returns example: [{id: 1000325398472, statuses: ["i like cats", "i like dogs"]]] 
	function getFriendIdsAndStatusMessages(callback) {
		var allFriendsAndStatuses = new Array();
	
		getFriendIds().forEach(function(friendId) {
			var statuses = getStatusMessages(friendId);
			allFriendsAndStatuses.push({id: friendId, statuses: statuses});
	    });
		
		console.log(allFriendsAndStatuses);
	
		callback(allFriendsAndStatuses);
	}


	var API_KEY = 'dcabc379-7d01-4357-bc05-3365882df4ba';
	var endPoint = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1';

	function getSentiment(users,callback) {
		users.forEach(function(user, index, users) {
			/* We join all of the user's status updates and pass it as the text in the post request to our endpoint: */
			var statuses = user.statuses.join(' ')
            
            $.ajax({
                type: 'POST',
                url: endPoint,
                data: {
                    apikey: API_KEY,
                    text: statuses
                },
                dataType: json,
                async: false
            }).done(function(JSONdata) {
                /* Adding sentiment and score properties, obtained from POST response, to our users array: */
				user['sentiment'] = JSONdata.aggregate.sentiment;
				user['score'] = JSONdata.aggregate.score;
            });
		});
        
        callback(users);
	};
    
    NEUTRAL_PNG = 'images/neutral.png';
    NEGATIVE_PNG = 'images/negative.png';
    POSITIVE_PNG = 'images/positive.png';

    var friendIdsAndStatuses = getFriendIdsAndStatusMessages(function(friendCallback) {

        var users = getSentiment(friendCallback, function(sentimentCallback) {
            console.log(sentimentCallback);

            for (var i = 0; i < sentimentCallback.length; i++) {
                var user = sentimentCallback[i];
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
            }
        });
    });
};

