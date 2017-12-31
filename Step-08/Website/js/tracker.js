window.onload = checkToken;
window.onresize = resize;

// Cognito
AWSCognito.config.region = _config.cognito.region;
     
var poolData = {
    UserPoolId : _config.cognito.userPoolId, 
    ClientId : _config.cognito.userPoolAppClientId 
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function checkToken(){
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                alert(err);
                window.location.href = '/sign-in.html';
            } else if (!session.isValid()) {
                alert('no session token');
                window.location.href = '/sign-in.html';
            } else {
                console.log(session.getIdToken().getJwtToken());
            }
        });
    } else {
        console.log('user is not logged in');
        window.location.href = '/sign-in.html';        
    }
}

function signOut(){
    userPool.getCurrentUser().signOut();
    window.location.href = '/index.html';   
}

// Map and UX
mapboxgl.accessToken = _config.mapbox.token;

var map = new mapboxgl.Map({
    container: 'divMap',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-122.343512, 47.610033],
    zoom: 12
});

resize();

//Resize the map and panels
function resize() {
    var mapDiv = document.getElementById("divMap");
    var panelDiv = document.getElementById("divPanel");
    var panelDivRight = document.getElementById("divPanelRight");
    var windowHeight = $(window).height();
    mapHeight = windowHeight - 50;
    panelHeight = windowHeight - 110;
    mapDiv.style.height = mapHeight + "px";
    panelDiv.style.height = panelHeight + "px";
    panelDivRight.style.height = panelHeight + "px";
}