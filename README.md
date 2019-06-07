# README

# Welcome to VousTube! 

VousTube is my attempt to create a functional clone of YouTube. It allows users to both upload their own videos and view the videos uploaded by everyone else. 

## Demo login 

Feel free to log in using the demo login: 

username: demo
email: demouser@demosite.com
password: password

The login form asks for either the username or email, not both. 

## User authentication

The real YouTube is a Google product, and so its login/signup features are handled entirely through Google Accounts. VousTube's login/signup process is simpler - new users don't have to enter their real names, nor write their passwords a second time – but intended to mimic the look of the Google login form as closely as possible.

On the app itself, user authentication is reflected mostly in the nav bar at this point. Being logged in gives you a little user icon in the style of the default Google account icons: the first letter of your username in a blue circle. (The same also appears as part of the user info under the video player.) It also allows you to access the video form; clicking the "Upload video" button otherwise will simply redirect you to the login page. 

## Videos

Just as on the real YouTube, videos are the centerpiece of this app. Users can upload new videos from the video form, and then they will show up to be visible to all users. 

### Video Upload

As on YouTube, selecting a video file is necessary before entering in a title or description. 

There are a few shortcomings with the video upload form at the moment. Every video has a thumbnail image for display, but VousTube doesn't have functionality to capture a screen from the video like real YouTube does. Instead, users are able to upload their own thumbnails (a function reserved on real YouTube for verified accounts) and, if they do not, their video is given a default thumbnail (a popular meme) instead. Additionally, the player is not very flexible with file types; H.264/MPEG-4 videos play without issue, but this does not seem to be the case with standard MPEG-4 files. This requires more testing to confirm. 

### Video Index

All videos show up on the main page, styled precisely in line with YouTube styling. The "Recommended" and "From your subscriptions" headings are strictly ornamental: each has all the half-dozen or so videos on the database in an order that is shuffled on every refresh. (The sidebar next to the video player works in much the same way.)

### Video Playback

The video player contains all the basic controls of the real YouTube video player. All the player buttons work, and keyboard controls allow you to pause/unpause, mute/unmute, change the volume, and jump forward and back in the video five seconds at a time. 

## Next steps

### Current features to polish and improve

* Finish styling the video player
* Add an upload progress bar to the video form
* Add properly formatted time stamps to videos

### Future features to implement 

* Let users upload their own thumbnails
* Automatically select a thumbnail from the first frame of the video if a user does not upload one
* Add the ability to post comments under videos
* Add the ability to like both videos and comments and display both appropriately
* Make search bar fully functional
