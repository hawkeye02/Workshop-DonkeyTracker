cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-background-fetch.BackgroundFetch",
    "file": "plugins/cordova-plugin-background-fetch/www/BackgroundFetch.js",
    "pluginId": "cordova-plugin-background-fetch",
    "clobbers": [
      "window.BackgroundFetch"
    ]
  },
  {
    "id": "cordova-background-geolocation-lt.BackgroundGeolocation",
    "file": "plugins/cordova-background-geolocation-lt/www/BackgroundGeolocation.js",
    "pluginId": "cordova-background-geolocation-lt",
    "clobbers": [
      "window.BackgroundGeolocation"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-insomnia.Insomnia",
    "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
    "pluginId": "cordova-plugin-insomnia",
    "clobbers": [
      "window.plugins.insomnia"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-background-fetch": "5.1.1",
  "cordova-plugin-cocoalumberjack": "0.0.4",
  "cordova-background-geolocation-lt": "2.9.1",
  "cordova-plugin-device": "1.1.7",
  "cordova-plugin-insomnia": "4.3.0"
};
// BOTTOM OF METADATA
});