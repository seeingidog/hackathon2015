if (localStorage.accessToken) {
    var graphUrl = 'https://graph.facebook.com/me?' + localStorage.accessToken + '&callback=displayUser';
    console.log(graphUrl);
    
    var script = document.createElement('script');
    script.src = graphUrl;
    document.body.appendChild(script);
    
    function displayUser(user) {
        console.log(user);
    }
}

$("body").on('click', '#cleartoken', function(event) {
    event.preventDefault();
    localStorage.accessToken = null;
    alert("Token Cleared");
});