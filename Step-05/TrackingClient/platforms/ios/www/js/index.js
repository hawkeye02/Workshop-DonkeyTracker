var bgGeo;
var map = null;
var mapTracks = false;
var markers = [];

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    onDeviceReady: function () {
        // UI Components
        // $('#btnOpenSettings').click(openSettings);
        // $('#btnCloseSettings').click(closeSettings);
        $('#btnOpenMapStyles').click(openMapStyles);
        $('#btnCloseMapStyles').click(closeMapStyles);
        $('#btnSetMapStyleStreets').click(setMapStyleStreets);
        $('#btnSetMapStyleOutdoors').click(setMapStyleOutdoors);
        $('#btnSetMapStyleLight').click(setMapStyleLight);
        $('#btnSetMapStyleDark').click(setMapStyleDark);
        $('#btnSetMapStyleSatellite').click(setMapStyleSatellite);
        $('#btnSetMapStyleSatelliteStreets').click(setMapStyleSatelliteStreets);
        $('#cbTracking').click(toggleTracking);
        $('#cbSleep').click(toggleSleep); 
        $('#cbShowTracks').click(toggleShowTracks); 

        // The Map
        mapboxgl.accessToken = 'YOUR MAPBOX KEY';
        map = new mapboxgl.Map({
            container: 'divMap',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [-122.018016, 47.671432],
            zoom: 12
        });
        
        // Get a reference to the plugin.
        bgGeo = window.BackgroundGeolocation;

        //This callback will be executed every time a geolocation is recorded in the background.
        var callbackFn = function (location) {
            var coords = location.coords;
            var lat = coords.latitude;
            var lon = coords.longitude;
            var speed = coords.speed;
        
            if (mapTracks){
                try{
                    var pin = document.createElement('div');
                    pin.className = 'marker';
                    pin.style.width = '10px';
                    pin.style.height = '10px';
                
                    if (speed >= 13.4) {
                        pin.style.backgroundImage = 'url(img/green_circle_10.png)';
                    } else if (speed < 13.4 && speed >= 4.4 ) {
                        pin.style.backgroundImage = 'url(img/yellow_circle_10.png)';
                    } else {
                        pin.style.backgroundImage = 'url(img/red_circle_10.png)';
                    }

                    var marker = new mapboxgl.Marker(pin);
                    marker.setLngLat([lon, lat])
                    markers.push(marker);
                    marker.addTo(map);
                    map.setCenter([lon, lat]);
                }
            catch (ex){
                console.log('Error mapping location' + ex);
            }
        }
        else{
                console.log('track point:  ' + lat + ',' + lon + ',' + speed);
            }
        };

        // This callback will be executed if a location-error occurs.  Eg: this will be called if user disables location-services.
        var failureFn = function (errorCode) {
            console.warn('BackgroundGeoLocation error: ', errorCode);
        }

        // Listen to location events & errors.
        bgGeo.on('location', callbackFn, failureFn);

        // Fired whenever state changes from moving->stationary or vice-versa.
        bgGeo.on('motionchange', function (isMoving) {
            console.log('onMotionChange: ', isMoving);
        });

        // Fired whenever a geofence transition occurs.
        bgGeo.on('geofence', function (geofence) {
            console.log('onGeofence: ', geofence.identifier, geofence.location);
        });

        // Fired whenever an HTTP response is received from your server.
        bgGeo.on('http', function (response) {
            console.log('http success: ', response.responseText);
        }, function (response) {
            console.log('http failure: ', response.status);
        });

        bgGeo.configure({
            // Geolocation config
            // desiredAccuracy
            // 0 GPS + Wifi + Cellular; highest power consumption, highest accuracy
            // 10 Wifi + Cellular; medium power; medium accuracy;
            // 100: Wifi (low power) + Cellular; low power; no GPS
            // 1000: Cellular only; lowest power; lowest accuracy
            desiredAccuracy: 0,
            distanceFilter: 50,
            stationaryRadius: 25,
            // Activity Recognition config
            activityRecognitionInterval: 10000,
            stopTimeout: 5,
            // Application config
            debug: false, // Debug sounds & notifications.
            stopOnTerminate: false,
            startOnBoot: false,
            // HTTP config
            url: "[YOUR API INVOKE URL]",
            method: "POST",
            autoSync: true,
            maxDaysToPersist: 3,
            headers: {
                "x-api-key": "[YOUR API KEY]"
            },
            params: {
                device: {
                    platform: device.platform,
                    version: device.version,
                    uuid: device.uuid,
                    cordova: device.cordova,
                    model: device.model,
                    manufacturer: device.manufacturer
                }
            },
            // iOS-specific
            activityType: 'Other'
        }, function (state) {
            // This callback is executed when the plugin is ready to use.
            console.log("BackgroundGeolocation ready: ", state);
            if (!state.enabled) {
                bgGeo.stop();
            }
        }, function (error) {
            console.log("Background Geolocation failed to configure:" + error);
        });
    }
};

app.initialize();

//UX
// function openSettings() {
//     $(".panelLeft").animate({ "margin-left": "0px" }, 500);
// };

// function closeSettings() {
//     $(".panelLeft").animate({ "margin-left": "-300px" }, 500);
// };

function openMapStyles() {
    $(".panelRight").animate({ "margin-right": "0px" }, 500);
};

function closeMapStyles() {
    $(".panelRight").animate({ "margin-right": "-300px" }, 500);
};

// Plugins
function toggleSleep() {
    if ($('#cbSleep').prop('checked')) {
        window.plugins.insomnia.keepAwake();
        console.log('Staying awake');
    }
    else {
        window.plugins.insomnia.allowSleepAgain();
        console.log('Allowing sleep again');
    }
}

function toggleTracking() {
    if ($('#cbTracking').prop('checked')) {
        bgGeo.start();
        console.log('start tracking');
    }
    else {
        bgGeo.stop();
        console.log('stop tracking');
    }
}

// Map
function toggleShowTracks() {
    if ($('#cbShowTracks').prop('checked')) {
        mapTracks = true;
        console.log('Showing locations on the map');
    }
    else {
        mapTracks = false;
        for (i = 0; i < markers.length; i++){
            markers[i].remove();
        }
        console.log('Removing locations from the map');
    }
}

function setMapStyleStreets() {
    map.setStyle('mapbox://styles/mapbox/streets-v10');
}

function setMapStyleOutdoors() {
    map.setStyle('mapbox://styles/mapbox/outdoors-v10');
}

function setMapStyleLight() {
    map.setStyle('mapbox://styles/mapbox/light-v9');
}

function setMapStyleDark() {
    map.setStyle('mapbox://styles/mapbox/dark-v9');
}

function setMapStyleSatellite() {
    map.setStyle('mapbox://styles/mapbox/satellite-v9');
}

function setMapStyleSatelliteStreets() {
    map.setStyle('mapbox://styles/mapbox/satellite-streets-v10');
}