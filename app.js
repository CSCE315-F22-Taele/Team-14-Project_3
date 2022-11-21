// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// const { appendFile } = require('fs');
// const http = require('http');

//create express app
const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const session = require('express-session');
// const passport = require('passport');
// var userProfile;

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

app.get('/placeorder',(req,res)=> {
    Entrees =["Grain Bowl","Salad","Pita","Green & Grains"]
    Protein =["Gyro","Falafel","Vegetable Medley","Meatballs"]//need to finish toppings list
    Toppings =["Pickled Onions", "Diced Cucumbers","Citris Couscous","Roasted Cauliflower","Tomato-Onion Salad"]
});

//app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
    console.log(`Pom&Honey Web App listening at http://localhost:${port}`);
});
/*app.listen(port, orderFunction(),() =>{
    console.log('OrderFunction Recognized');
});*/


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