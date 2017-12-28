# Troubleshooting

## 'Unable to mount developer disk image' when trying to debug from Visual Studio Code on a physical device

You need to update the library that is used to interact with iOS devices. Please run 
```text
brew update && brew upgrade libimobiledevice --HEAD && brew upgrade ideviceinstaller ios-webkit-debug-proxy
```

and try again.