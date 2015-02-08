function loginfacebook(callback) {
    chrome.windows.create({
        'url' : "https://www.facebook.com/dialog/oauth?"
                + "display=popup&"
                + "app_id=387276881452880&"
                + "redirect_uri=http://moodring.wizkidweb.com/index.php"
                // + "scope=scopestuff"
                + "&response_type=token",
        'width': 580,
        'height': 400
    }, function(popupWindow) {
        chrome.tabs.query({
            active: true
        }, function(tabs) {
            tabid = tabs[0].id;
            chrome.tabs.onUpdated.addListener(function(tabid,changeinfo,tab) {
                var url = tab.url;
                var params = url.split("#")[1];
                var regex = /\access_token=(.*)\&/g;
                var ret = "";
                url.replace(regex, function($0) {
                    var ret = $0;
                    ret = ret.substr(13,ret.length-14);
                    //console.log(ret);
                    
                    var token = ret;
                    localStorage.accessToken = token;

                    var expires_in = extractExpiry(tab.url);
                    var currentDate = new Date();
                    var expiryTime = currentDate.getTime()+1000*(expires_in - 300);
                    localStorage.expiryTime = expiryTime;

                    chrome.windows.remove(popupWindow.id);
                    callback();
                });
            });
        });
    })
}