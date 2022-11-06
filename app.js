// const { appendFile } = require('fs');
// const http = require('http');
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//variable constants
const GOOGLE_ClIENT_ID = '625697344229-lehp84g2idbdpus8u4giv5h3dg9caaaj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const hostname = 'localhost';
const port = 3000;


// Create a server object and pass an arrow function
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end("hello world");
// });

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

//Passport setup:
var userProfile;
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req,res) => res.send(userProfile));
app.get('/error', (req,res) => res.send("error logging in"));

passport.serializeUser(function(user,cb) {
    cb(null,user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null,obj);
});

//Google OAuth
passport.use(new GoogleStrategy({
        clientID: GOOGLE_ClIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google', 
    passport.authenticate('google', {scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/error'}),
    function(req, res) {
        //Successful authentication, redirect sucess.
        res.redirect('/sucess');
    }
);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/entree', (req, res) => {
    res.render('entree');
});
app.get('/manager', (req, res) => {
    res.render('manager');
});
app.get('/starter', (req, res) => {
    res.render('starter');
});
app.get('/topping', (req, res) => {
    res.render('topping');
});
app.get('/placeorder', (req, res) => {
    res.render('placeorder');
});

//app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
    console.log(`Pom&Honey Web App listening at http://localhost:${port}`);
});