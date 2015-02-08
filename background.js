// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains 'facebook' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'facebook' }
                    })
                ],
                // And shows the extensions's page action
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

var successURL = 'http://www.wizkidweb.com';

function loginfacebook(callback) {
    chrome.windows.create({
        'url' : "https://www.facebook.com/dialog/oauth?"
                + "display=popup&"
                + "app_id=387276881452880&"
                + "redirect_uri=http://moodring.wizkidweb.com/index.php&"
                + "scope=read_stream&"
                + "response_type=token",
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
                    
                    var token = ret;
                    console.log(token);
                    
                    console.log("Message sent at "+(new Date().getTime()));
                    chrome.runtime.onMessage.addListener(
                        function(request, sender, sendResponse) {
                            console.log("background.js got a message at "+(new Date().getTime()));
                            console.log(request);
                            console.log(sender);
                            sendResponse(token);
                        }
                    );

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