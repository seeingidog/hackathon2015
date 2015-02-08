function initIframe() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var expiry = new Date(parseInt(localStorage.expiryTime));
        var now = new Date();
        if (localStorage.accessToken && now < expiry) {
            console.log(localStorage.accessToken);
        } else {
            $('#iframe').hide();
            loginfacebook(initIframe);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initIframe();
});