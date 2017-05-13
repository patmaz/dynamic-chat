"use strict";
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');
//const cookieSession = require('cookie-session');
const path = require("path");

var session = require('express-session');
const RedisStore = require("connect-redis")(session);

const config = require('../config');

const secureChat = (app, redisClient) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    const strategy = new Auth0Strategy(config.auth0,
        (accessToken, refreshToken, extraParams, profile, done) => {
            return done(null, profile);
        }
    );
    passport.use(strategy);

    const redisStore = new RedisStore({ host: 'localhost', port: 6379, client: redisClient });
    app.use(session({
        store: redisStore,
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false
    }));
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
            res.redirect('/chatlogin');
        }
    };

    app.get('/', (req, res) => {
        if (!req.user) {
            res.redirect('/chatlogin');
        } else {
            res.redirect('/chatchoice');
        }
    });

    app.get('/chatlogin',
        passport.authenticate('auth0', { failureRedirect: '/failed' }),
        (req, res) => {
            if (!req.user) {
                console.error('no user');
            } else {
                req.user._json.app_metadata = req.user._json.app_metadata || {};
                if (req.user._json.app_metadata.role === 'important') {
                    res.redirect('/chatchoice');
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

    app.get('/chatchoice', authenticationMiddleware,  (req, res) => {
        res.sendFile(path.join(__dirname, '../public/', 'chatchoice.html'));
    });

    app.get('/chat', authenticationMiddleware,  (req, res) => {
        res.sendFile(path.join(__dirname, '../public/', 'chat.html'));
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    });
};

module.exports = secureChat;