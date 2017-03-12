"use strict";
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');
const cookieSession = require('cookie-session');
var path = require("path");

const config = require('../config');

const secureChat = (app) => {
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        done(null, user);
    });
    const strategy = new Auth0Strategy({
            domain: config.auth0.domain,
            clientID: config.auth0.clientID,
            clientSecret: config.auth0.clientSecret,
            callbackURL: config.auth0.callbackURL
        },
        function(accessToken, refreshToken, extraParams, profile, done) {
            return done(null, profile);
        }
    );
    passport.use(strategy);
    app.use(cookieSession({
        name: 'sessionChat',
        keys: ['jncjdsc'],
        maxAge: 24 * 60 * 60 * 1000
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    const authenticationMiddleware = (req, res, next) => {
        if (req.user) {
            if (req.user._json.app_metadata.role === 'important') {
                next();
            } else {
                res.redirect('/noaccess');
            }
        } else {
            res.send('not autheticated');
        }
    }

    app.get('/chatlogin',
      passport.authenticate('auth0', { failureRedirect: '/failed' }),
      (req, res) => {
        if (!req.user) {
            console.error('no user');
        } else {
            req.user._json.app_metadata = req.user._json.app_metadata || {};
            if (req.user._json.app_metadata.role === 'important') {
                res.redirect('/chat');
            } else {
                res.redirect('/noaccess');
            }
        }
      }
    );

    app.get('/failed', (req, res) => {
        res.send('login failed!');
    });

    app.get('/noaccess', (req, res) => {
        res.send('you logged in, but don\'t have permission');
    });

    app.get('/chat', authenticationMiddleware,  (req, res) => {
        let idCookie = 'myid=' + req.user.nickname;
        res.setHeader('Set-Cookie', idCookie);
        res.sendFile(path.join(__dirname, '../public/', 'chat.html'));
    });
}

module.exports = secureChat;