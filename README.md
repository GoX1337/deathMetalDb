<h1>React-native death metal database app</h1>

<h2>https://play.google.com/store/apps/details?id=com.deathmetaldb&hl=en</h2>

<h3>Test in dev:</h3>
react-native run-android

<h3>Check if android device is available:</h3>
adb devices

<h3>Enable hot reloading:</h3>
adb reverse tcp:8081 tcp:8081

<h3>Build release signed apk:</h3>
cd android && gradlew assembleRelease --console plain

<h3>Test release app:</h3>
react-native run-android --variant=release
