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
                //console.log(session.getIdToken().getJwtToken());
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

// Resize the map and panels
function resize() {
    var mapDiv = document.getElementById("divMap");
    var panelDiv = document.getElementById("divPanel");
    //var panelDivRight = document.getElementById("divPanelRight");
    var windowHeight = $(window).height();
    mapHeight = windowHeight - 50;
    panelHeight = windowHeight - 110;
    mapDiv.style.height = mapHeight + "px";
    panelDiv.style.height = panelHeight + "px";
    //panelDivRight.style.height = panelHeight + "px";
}

var markers = [];

// Get data from DynamoDB
function getAjax(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Api-Key', _config.api.key);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
    };
    xhr.send();
    return xhr;
}

function GetTracks() {
    getAjax(_config.api.invokeUrl + '?u=' + document.getElementById('txtUUID').value + '&t=' + document.getElementById('txtDate').value, function (data) {
        var resp = JSON.parse(data);
        for (i = 0; i < resp.Items.length; i++) {
            var pin = document.createElement('div');
            pin.className = 'marker';
            pin.style.width = '10px';
            pin.style.height = '10px';

            if (resp.Items[i].speed >= 13.4) {
                pin.style.backgroundImage = 'url(../img/green_circle_10.png)';
            } else if (resp.Items[i].speed < 13.4 && resp.Items[i].speed >= 4.4 ) {
                pin.style.backgroundImage = 'url(../img/yellow_circle_10.png)';
            } else {
                pin.style.backgroundImage = 'url(../img/red_circle_10.png)';
            }

            var marker = new mapboxgl.Marker(pin);
            marker.setLngLat([resp.Items[i].longitude, resp.Items[i].latitude]);
            marker.setPopup(new mapboxgl.Popup().setHTML('<table><tr><td>Longitude</td><td>' + resp.Items[i].longitude.toFixed(5) + '</td></tr>'
                + '<tr><td>Latitude</td><td>' + resp.Items[i].latitude.toFixed(5) + '</td></tr>'
                + '<tr><td>Speed</td><td>' + resp.Items[i].speed.toFixed(0) + '</td></tr>'
                + '<tr><td>Time</td><td>' + resp.Items[i].timestamp + '</td></tr></table>'));
            markers.push(marker);

            marker.addTo(map);
        }
    });
}

function ClearTracks(){
    for (i = 0; i < markers.length; i++){
        markers[i].remove();
    }
}