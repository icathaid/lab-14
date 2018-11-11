'use strict';

import superagent from 'superagent';

import User from '../model.js';

// This is currently setup for Google, but we could easily swap it out
// for any other provider or even use a totally different module to
// to do this work.
//
// So long as the method is called "authorize" and we get the request,
// we should be able to roll on our own here...

const authorize = (req) => {

  let code = req.query.code;

  console.log('(1) code', code);

  // exchange the code or a token
  return superagent.post('https://github.com/login/oauth/access_token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth`,
      grant_type: 'authorization_code',
    })
    .then( response => {
      let githubToken = response.body.access_token;
      console.log('(2) github token', githubToken);
      return githubToken;
    })
  // use the token to get a user
    .then ( token => {
      return superagent.get('https://api.github.com/user')
        .set('Authorization', `Bearer ${token}`)
        .then (response => {
          let user = response.body;
          console.log('(3) Github User', user);
          return user;
        });
    })
    .then(githubUser => {
      console.log('(4) Creating Account');
      return User.createFromOAuth(githubUser);
    })
    .then (user => {
      console.log('(5) Created User, generating token');
      return user.generateToken();
    })
    .catch(error=>error);
};



export default {authorize};