# Playlism

A mobile app that lets users create playlists for friends, and download/listen to songs (offline) that their friends have shared with them.

### Technology Used:

* React native
* Expo
* Redux
* NodeJS/MongoDB backend

### Installation:

To run the app in development mode, and provided Node and NPM are installed, clone the repo and enter the following CLI command to install dependencies:
```
$ npm install
```
Create a directory named 'config' in /src and then create an index.js file in the new directory. Add the following code, and enter a YouTube API key between the quotation marks.
```
export const API_KEY = '';
```
Download and install the Expo XDE from https://expo.io/. Open the XDE, navigate to the cloned repo and open it as an Expo project, then view it using an iOS/Android emulator or a mobile device.

To view the production version of the app, Android users can install it as a standalone application by downloading this [.apk file](https://exp-shell-app-assets.s3-us-west-1.amazonaws.com/android%2F%40tom-p-uk%2Fplaylism-2444acec-a66f-11e7-a861-0a580a78025d-signed.apk). Users may have to change their phone's security settings to allow installation of non-Play Store apps.

iOS and Android users can also run the app by first installing Expo on their mobile device from the App Store/Play Store and then scanning this [QR code](https://expo.io/@tom-p-uk/Playlism) with their phone.

### Usage:

* Users must log in using Facebook/Google OAuth flows.
* Once logged in, they can add friends by searching for them and sending a friend request.
* Create playlists for friends. Search for songs, and add them to the playlist.
* The recipient user can preview the songs, and download the ones they the like to their mobile device.
* Songs saved locally can be played back within the application using the player component.

### Demo Screens:

![OAuth](https://i.imgur.com/oaph29A.png)
![Add Friends](https://i.imgur.com/bdAhJgB.png)
![User](https://i.imgur.com/EP0dfKr.png)
![User](https://i.imgur.com/kMt9lxN.png)
![Create Playlist](https://i.imgur.com/a62khAm.png)
![Add Song](https://i.imgur.com/WM2tKSn.png)
![Playlist](https://i.imgur.com/kzVNCCk.png)
![Preview](https://i.imgur.com/oG4p0fl.png)
![Playback](https://i.imgur.com/2ozDR4F.png)
