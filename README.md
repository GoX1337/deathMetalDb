React-native death metal database app

Test in dev:
react-native run-android

Check if android device is available:
adb devices

Enable hot reloading:
adb reverse tcp:8081 tcp:8081

Build release signed apk:
cd android && gradlew assembleRelease --console plain

Test release app:
react-native run-android --variant=release