// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';

//create express app
const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const session = require('express-session');

//implement firebase
// const firebase = require('firebase/app');
// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCDQ1FLuqa5dFbwZFWHU0qRf3xiq2C7D0I",
//     authDomain: "pom-honey.firebaseapp.com",
//     projectId: "pom-honey",
//     storageBucket: "pom-honey.appspot.com",
//     messagingSenderId: "604614429107",
//     appId: "1:604614429107:web:f8d45bae115533002823c6"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const firebaseAuth = require("firebase/auth");

// const provider = new firebaseAuth.GoogleAuthProvider();

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
app.use(express.json());
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
    // res.sendFile(__dirname + '/views/placeorder.ejs');
});

app.post('/placeorder', (req, res)=> {
    // console.log(req.body);
    // console.log(req);
    const { command } = req.body;
    console.log(command);
    console.log("Command received");
    pool
        .query(command)
        .then(query_res => {
            console.log("Order placed in database");
        });
});
// app.get('/ordersent',(req,res)=> {
//     console.log("Order Received");

// });
// --------------- MANAGER RELATED -------------------------
app.get('/manager', (req, res) => {
    res.render('manager');
});


app.get('/inventory', (req, res) => {
    Entrees = []
    //Dressings = []
  
    pool
        .query('SELECT \"Entree Items\" as \"Items\", \"Entree Inventory\" as \"Inventory\" FROM \"Entrees\";')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                Entrees.push(query_res.rows[i]);
            }
            pool
                .query('SELECT \"Dressing Item\" as \"Items\", \"Dressing Inventory\" as \"Inventory\" FROM \"Dressings\";')
                .then(query_res => {
                    for (let j = 0; j < query_res.rowCount; j++) {
                        Entrees.push(query_res.rows[j]);
                    }
                    pool
                        .query('SELECT \"Topping Item\" as \"Items\", \"Topping Inventory\" as \"Inventory\" FROM \"Toppings\";')
                        .then(query_res => {
                            for (let j = 0; j < query_res.rowCount; j++) {
                                Entrees.push(query_res.rows[j]);
                            }
                            pool
                                .query('SELECT \"Starter Item\" as \"Items\", \"Starter Inventory\" as \"Inventory\" FROM \"Starters\";')
                                .then(query_res => {
                                    for (let j = 0; j < query_res.rowCount; j++) {
                                        Entrees.push(query_res.rows[j]);
                                    }
                                    pool
                                        .query('SELECT \"Drink Item\" as \"Items\", \"Drink Inventory\" as \"Inventory\" FROM \"Drinks\";')
                                        .then(query_res => {
                                            for (let j = 0; j < query_res.rowCount; j++) {
                                                Entrees.push(query_res.rows[j]);
                                            }
                                            res.render('inventory', Entrees);
                                            
                                        });
                                    
                                });
                                    
                        });
                    
                });
        });
});

app.get('/sales', (req, res) => {
    res.render('sales');
});

app.get('/excess', (req, res) => {
    res.render('excess');
});
app.get('/restock', (req, res) => {
    Stock = []
  
    pool
        .query('SELECT \"Entree Items\" as \"Items\", \"Entree Inventory\" as \"Inventory\" FROM \"Entrees\";')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                Stock.push(query_res.rows[i]);
            }
            pool
                .query('SELECT \"Dressing Item\" as \"Items\", \"Dressing Inventory\" as \"Inventory\" FROM \"Dressings\";')
                .then(query_res => {
                    for (let j = 0; j < query_res.rowCount; j++) {
                        Stock.push(query_res.rows[j]);
                    }
                    pool
                        .query('SELECT \"Topping Item\" as \"Items\", \"Topping Inventory\" as \"Inventory\" FROM \"Toppings\";')
                        .then(query_res => {
                            for (let j = 0; j < query_res.rowCount; j++) {
                                Stock.push(query_res.rows[j]);
                            }
                            pool
                                .query('SELECT \"Starter Item\" as \"Items\", \"Starter Inventory\" as \"Inventory\" FROM \"Starters\";')
                                .then(query_res => {
                                    for (let j = 0; j < query_res.rowCount; j++) {
                                        Stock.push(query_res.rows[j]);
                                    }
                                    pool
                                        .query('SELECT \"Drink Item\" as \"Items\", \"Drink Inventory\" as \"Inventory\" FROM \"Drinks\";')
                                        .then(query_res => {
                                            for (let j = 0; j < query_res.rowCount; j++) {
                                                Stock.push(query_res.rows[j]);
                                            }
                                            res.render('restock', Stock);
                                            
                                        });
                                    
                                });
                                    
                        });
                    
                });
        });
});

//app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
    console.log(`Pom&Honey Web App listening at http://localhost:${port}`);
});
/*app.listen(port, orderFunction(),() =>{
    console.log('OrderFunction Recognized');
});*/


