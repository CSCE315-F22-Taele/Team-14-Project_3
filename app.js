// Import the functions you need from the SDKs you need
const firebaseAppModule = require("firebase/app");
//const firebaseAnalytics = require("firebase/analytics");
const firebaseAuth = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDQ1FLuqa5dFbwZFWHU0qRf3xiq2C7D0I",
  authDomain: "pom-honey.firebaseapp.com",
  projectId: "pom-honey",
  storageBucket: "pom-honey.appspot.com",
  messagingSenderId: "604614429107",
  appId: "1:604614429107:web:f8d45bae115533002823c6",
  measurementId: "G-92S5RQ1WE3"
};

// Initialize Firebase
const firebaseApp = firebaseAppModule.initializeApp(firebaseConfig);
//const analytics = firebaseAnalytics.getAnalytics(firebaseApp);

// Set-up for Google OAuth UI
const firebase = require('firebase');
const firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
                'https://www.googleapis.com/auth/contacts.readonly'
            ],
            customParameters: {
                prompt: 'select_account'
            }
        },
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        }
        
    ],
    // Other config options...
  });
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  ui.start('#firebaseui-auth-containter', uiConfig);

//create express app
const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const session = require('express-session');

const hostname = 'localhost';
const port = 3000;

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

//add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
})


// Create a server object and pass an arrow function
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end("hello world");
// });

app.use(express.static(__dirname + '/public'));
// app.use(passport.initialize());
// app.use(passport.session());

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/entree', (req, res) => {
    res.render('entree');
});

app.get('/topping', (req, res) => {
    res.render('topping');
});
app.get('/starter', (req, res) => {
    res.render('starter');
});

app.get('/placeorder', (req, res) => {
//     servers = []
//     pool
//         .query('SELECT \"Server Name\" as \"ServerName\" FROM \"Servers\";')
//         .then(query_res => {
//             for (let i = 0; i < query_res.rowCount; i++){
//                 servers.push(query_res.rows[i]);
//             }
//             const data = {servers: servers};
//             console.log(servers);
//             res.render('placeorder', data);
//         });
    
    res.render('placeorder');
});

app.post('/ordersent',(req,res)=> {
    // console.log(req.body);
    // console.log(req);
    const { command } = req.body;
    console.log(command);
    console.log("Command received");
});
app.get('/ordersent',(req,res)=> {
    console.log("Order Received");

});
// --------------- MANAGER RELATED -------------------------
app.get('/manager', (req, res) => {
    res.render('manager');
});
app.get('/inventory', (req, res) => {
    res.render('inventory');
});
app.get('/sales', (req, res) => {
    res.render('sales');
});

app.get('/excess', (req, res) => {
    res.render('excess');
});
app.get('/restock', (req, res) => {
    res.render('restock');
});

//app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
    console.log(`Pom&Honey Web App listening at http://localhost:${port}`);
});
/*app.listen(port, orderFunction(),() =>{
    console.log('OrderFunction Recognized');
});*/


