# README

# Welcome to VousTube! 

VousTube is my attempt to create a functional clone of YouTube. It allows users to both upload their own videos and view the videos uploaded by everyone else. 

## User authentication

The real YouTube is a Google product, and so its login/signup features are handled entirely through Google Accounts. VousTube's login/signup process is simpler - new users don't have to enter their real names, nor write their passwords a second time – but intended to mimic the look of the Google login form as closely as possible.

On the app itself, user authentication is reflected mostly in the nav bar at this point. Being logged in gives you a little user icon in the style of the default Google account icons: the first letter of your username in a blue circle. (The same also appears as part of the user info under the video player.) It also allows you to access the video form; clicking the "Upload video" button otherwise will simply redirect you to the login page. 

## Videos

Just as on the real YouTube, videos are the centerpiece of this app. Users can upload new videos from the video form, and then they will show up to be visible to all users. 

### Video Upload

As on YouTube, selecting a video file is necessary before entering in a title or description. 

There are a few shortcomings with the video upload form at the moment. Every video has a thumbnail image for display, but VousTube doesn't have functionality to capture a screen from the video like real YouTube does. Instead, users are able to upload their own thumbnails (a function reserved on real YouTube for verified accounts) and, if they do not, their video is given a default thumbnail (a popular meme) instead. Additionally, the player is not very flexible with file types; H.264/MPEG-4 videos play without issue, but this does not seem to be the case with standard MPEG-4 files. This requires more testing to confirm. 

### Video Index

All videos show up on the main page

### Video Playback




Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
