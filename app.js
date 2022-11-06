// const { appendFile } = require('fs');
// const http = require('http');
const express = require('express');
const app = express();
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
    console.log(`Example app listening at http://localhost:${port}`);
});