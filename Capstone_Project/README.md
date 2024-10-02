## **Tangible Bot App**

To install the app:

1. npm install 
2. install react-native-bluetooth-serial through *npm install react-native-bluetooth-serial* if not installed yet.
3. go to *\node_modules\react-native-bluetooth-serial\android\build.gradle* change compileSdkVersion to 30 or above.
4. change dependencies *compile* to *implementation*
5. go to *\node_modules\react-native-bluetooth-serial\android\src\main\java\com\rusel\RCTBluetoothSerial\RCTBluetoothSerialPackage.java* remove *@Override* on line 23


Note: Working app Node Version v20.10.0