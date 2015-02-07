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
var onFacebookLogin = function() {
    if (!localStorage.accessToken) {
        chrome.tabs.getCurrent(function(c) {
            console.log(c);
            if (c.url.indexOf(successURL)) {
                alert("Is Success URL");
                var access = c.url.split('?')[1];
                alert(access);
                localStorage.accessToken = access;
                chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                return;
            }
        });
    }
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);