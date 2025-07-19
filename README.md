## Prerequisite
### 1. Xcode
- You can install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) by go to **App Store** and install xcode 

- Make sure already install iOS simulator

### 2. iOS Simulator <br>
- Open **Simulator** on Spotlight Search
- Go to **File** > **Open Simulator**
- Choose iPhone that you want
- Wait for simulator start

### 3. Android Studio
- Download [Android Studio](https://developer.android.com/studio) and install

### 4. Android Simulator
- Open Android Studio
- More Actions > Visual Device Manager
- Start Simulator

### 5. Ruby version 3
```
brew install ruby
```
After that follow export path from instruction

---

## Initial Project
Run command
```
npx @react-native-community/cli init <YOUR_APP_NAME> --version 0.79.0 --template @react-native-community/template
```
If you never install **Cocoapod** the terminal will ask to install 
```
? Do you want to install CocoaPods now? Needed for running iOS project › (y/N) -> Y
```
If installing **Cocoapod** does not complete you can try again with this command
```
brew install cocoapods
```
Move code base
```
mv ./<YOUR_APP_NAME>/* .
```

## How to Run
### First Run
```
cd ios && pod install
``` 
### iOS Simulator
``` 
npm run ios
```

### Android Simulator
```
npm run android
```