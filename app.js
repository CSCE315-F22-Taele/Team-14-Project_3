//import {google} from 'googleapis';
// const { appendFile } = require('fs');
// const http = require('http');

//create express app
const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_ClIENT_ID = '625697344229-lehp84g2idbdpus8u4giv5h3dg9caaaj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
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

const hostname = 'localhost';
const port = 3000;

//create oauth client
// const oauth2Client = new google.auth.OAuth2(
//     GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET,
//     /*
//      * This is where Google will redirect the user after they
//      * give permission to your application
//      *
//     */
//     'localhost:3000/auth/google',
// );
//create pool
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
app.use(passprt.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

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
    servers = []
    pool
        .query('SELECT \"Server Name\" as \"ServerName\" FROM \"Servers\";')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                servers.push(query_res.rows[i]);
            }
            const data = {servers: servers};
            console.log(servers);
            res.render('placeorder', data);
        });
});

app.get('/placeorder',(req,res)=> {
    Entrees =["Grain Bowl","Salad","Pita","Green & Grains"]
    Protein =["Gyro","Falafel","Vegetable Medley","Meatballs"]
    Toppings =["Pickled Onions", "Diced Cucumbers","Citris Couscous","Roasted Cauliflower","Tomato-Onion"]
});

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile','email']}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/error'}),
    function(req, res ) {
        res.redirect('/success');
});

passport.serializeUser(function(user,cb) {
    cb(null,user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null,obj);
});



//app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
    console.log(`Pom&Honey Web App listening at http://localhost:${port}`);
});


//----------------front-end JS
// let buttons = document.querySelectorAll("button");
// let count=0;
// let entree_count=0;
// let protein_count=0;
// let combo_count=0;
// for(let i=0; i<buttons.length-2; i++){
//     buttons[i].addEventListener('click', function(){
//         if(buttons[i].classList.contains('active')){
//             count--;
//             if(count == 0){
//                 document.getElementById('cart_content').innerHTML="Your cart is currently empty!";
//             }
//             buttons[i].classList.remove('active');
//             let d = document.getElementsByClassName('inner_order_content');
//             for(let j=0; j<d.length; j++){
//                 //console.log(d[j].innerHTML);
//                 //console.log(buttons[j].innerHTML);
//                 if(buttons[i].innerHTML == d[j].innerHTML){
//                     d[j].parentNode.removeChild(d[j]);
//                 }
//             }
            
//         }
//         else{
//             buttons[i].classList.add('active');
//             // if(buttons[i].classList.contains('entree_btn')){entree_count++;}
//             // if(buttons[i].classList.contains('protein_btn')){protein_count++;}
//             // if(buttons[i].classList.contains('combo_btn')){
                
//             // }
//             if(count==0){
//                 document.getElementById('cart_content').innerHTML ="";
//             }
//             // document.getElementById('cart_content').innerHTML += `
//             //       <div class="order_content" id="cart_content">${this.innerHTML}</div>
//             // `;  
    
//             document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
//                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
//              `)
//             count++;
//         }
//     });
// }