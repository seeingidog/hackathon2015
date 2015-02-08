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
// Returns example: [1000325398472, ["i like cats", "i like dogs"]] 
function getFriendIdsAndStatusMessages() {
	var allFriendsAndStatuses = new Array();
	
	getFriendIds().forEach(function(friendId) {
		var statuses = getStatusMessages(friendId);
		allFriendsAndStatuses.push([friendId, statuses]);
  });
	
	return allFriendsAndStatuses;
}
