//
// Returns array of status messages from user
function getStatusMessages(userId) {
	var messages = new Array();
	
	FB.api(
	    "/" + userId + "/feed",
	    {
	        "filter": "app_2915120374"
	    },
	    function (response) {
	      if (response && !response.error) {
		    response['data'].forEach(function(post) {
			    if (post['message']) {
			      messages.push(post['message']);
			    }
		  	});
	      }
	    }
	)
	
	return messages;
}


//
// Returns array of logged in friend ids
function getFriendIds() {
	var friendIds = new Array();
  var friendTags = document.getElementsByClassName("fbChatSidebarBody")[0].getElementsByTagName("li");
	
	Array.prototype.forEach.call(friendTags, function (item) {
		friendIds.push(item.getAttribute("data-id"));
	});
	
	return friendIds;
}


//
// Returns example: [{id: 1000325398472, statuses: ["i like cats", "i like dogs"]]] 
function getFriendIdsAndStatusMessages() {
	var allFriendsAndStatuses = new Array();
	
	getFriendIds().forEach(function(friendId) {
		var statuses = getStatusMessages(friendId);
		allFriendsAndStatuses.push({id: friendId, statuses: statuses});
  });
	
	return allFriendsAndStatuses;
}


var API_KEY = 'dcabc379-7d01-4357-bc05-3365882df4ba';
var endPoint = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1';

function getSentiment(users) {
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
};


