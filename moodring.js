// Mood Ring Code

$(document).ready(function() {
   /* $("._42fz").each(function() {
        $(this).append('<div class="moodlet"></div>');
    });*/
	var userIds = ["1402854887", "100000464907991","56456456546"];
	$.each(userIds, function( index, theUserId ) {
		//check if user is present in chat messenger
		console.log(theUserId);
		theSelector = "li[data-id='" + theUserId + "']" + "> a > div > div._5bon";
		console.log(theSelector);
		response = $(theSelector).prepend('<span style="width:5px; padding-right:4px">tt</span>');
		console.log(response);
		//$("[]=").append();
	});
	
});