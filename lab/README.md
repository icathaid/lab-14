##  Lab 14 - OAuth

###  Build Instructions

  - Both servers are contained in the same repo
    - /auth-server contains the backend server
    - /web-server contains the front end server
      - both can be built with `npm i` and then started with `npm start`


####  Description

This app provides an oauth login interface through the GitHub oauth api.  

There is also a user sign-up sign-in interface that we were given.  


###  Back End


.env variables:

```
PORT=3000
GITHUB_CLIENT_ID=7d76d491d83ba05335bd


GITHUB_URL=https://github.com/login/oauth/
CLIENT_URI=http://localhost:3000/
STORAGE=mongo
MONGODB_URI=mongodb://heroku_jzbktcp7:lm32lnfpdon634jb4niltvjv4m@ds159263.mlab.com:59263/heroku_jzbktcp7
API_URL=http://localhost:3000
```

I had to use the mongo db that Ashley Breunich deployed to Heroku because I can't get my local one to connect to anything.

I don't want to push my github credentials in a readme so they are included in the canvas submission comments.


###  Front End


This consists of a simple user sign-up/sign-in interface, and a link for logging in through github's oauth service, which is the portion we worked on.  Clicking on it brings up their Oauth pop-up, and logging in successfully returns a valid token (verified with JWT.io)  Screenshots of both are linked below.



[![login screen](./assets/login.png)](login.png)
[![jwt decoded screen](./assets/jwt.png)](jwt.png)