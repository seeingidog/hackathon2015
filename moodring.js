// Mood Ring Code
FB.init({
  appId      : '387276421452926',
  xfbml      : true,
  version    : 'v2.1'
});


window.fbAsyncInit = function() {
	
	//
	// Returns array of status messages from user
	function getStatusMessages(userId) {
		var messages = new Array();
		setTimeout(
		  function() 
		  {
				FB.api(
				    "/" + userId + "/feed",
				    {
							  "access_token": "CAAFgOezy31ABAD1z531DkXoTjCnZCmaqOYlCBQkKlSG9gZCgglpgqqJSwZCAS0tPJW8MmkUl9uUgKwcVZABjoKoQmcn6uGXqKAVPZA487FiqNegwMVoWdxuAlwEwEQzYp5s6Snu78UuILY1wbE0vQSi8Qz9LtlQJyhKT7D1KktOWKH9TbVdkUmPHN0xHoGISJwDHtVRB0cZCnZCbx8nZCH0S",
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
		  }, 3000);
	
	
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
		
		console.log(allFriendsAndStatuses)
	
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
	setTimeout(
	  function() 
	  {
			NEUTRAL_PNG = 'images/neutral.png';
			NEGATIVE_PNG = 'images/negative.png';
			POSITIVE_PNG = 'images/positive.png';
	
			var friendIdsAndStatuses = getFriendIdsAndStatusMessages();
			console.log(friendIdsAndStatuses);
	
			var users = getSentiment(friendIdsAndStatuses);
			console.log(users);
	
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
			
	  }, 5000);
	
	
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


