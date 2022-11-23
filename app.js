

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
    pool
        .query('SELECT * FROM \"Entrees\";', function (err, data, fields) {
        if (err) throw err;
        res.render('inventory', { title: 'Entree List', entData: data});
        });
    //res.render('inventory');
    /*
    pool
        .query('SELECT * FROM \"Entrees\";')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                servers.push(query_res.rows[i]);
            }
            const data = {servers: servers};
            console.log(servers);
            res.render('placeorder', data);
        });
    */
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


