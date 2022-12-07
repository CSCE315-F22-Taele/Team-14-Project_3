// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';

//need to add OAuth 2.0 protocol info for Google specifically
//create express app
const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const session = require('express-session');
var bodyParser = require('body-parser')
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));

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

// const hostname = 'localhost';
// const port = 3000;
const PORT = process.env.PORT || 3030;

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
    res.render('placeorder');
});
app.get('/map', (req, res) => {
    res.render('map');
});

app.post('/placeorder', (req, res)=> {
    const { command } = req.body;
    console.log(command);
    console.log("Command received");
    pool
        .query(command)
        .then(query_res => {
            console.log("Order placed in database");
            res.redirect('/entree');
        });
});
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
app.get('/inventory-edit',(req,res) => {
    res.render('inventory-edit');
});
app.post('/inventory-edit',(req, res) => {
    let type=req.body.type;
    let item=req.body.item;
    let count=req.body.quantity;

    console.log(JSON.stringify(req.body));
    console.log("Updating: "+item+" to an inventory of: "+count);

    if(type=="Entrees and Proteins"){
        pool
            .query('UPDATE \"Entrees\" SET \"Entree Inventory\"= \'' + count + '\' WHERE \"Entree Items\"= \'' + item + '\'')
            .then(query_res => {
                res.redirect('/inventory');
            });
    }
    if(type=="Starters"){
        pool
            .query('UPDATE \"Starters\" SET \"Starter Inventory\"= \'' + count + '\' WHERE \"Starter Item\"=\'' + item + '\'')
            .then(query_res => {
                res.redirect('/inventory');
            });
    
    }
    else if(type=="Drinks"){
        pool
            .query('UPDATE \"Drinks\" SET \"Drink Inventory\"= \'' + count + '\' WHERE \"Drink Item\"=\'' + item + '\'')
            .then(query_res => {
                res.redirect('/inventory');
            });
    
    }
    else if(type=="Toppings"){
        pool
            .query('UPDATE \"Toppings\" SET \"Topping Inventory\"= \'' + count + '\' WHERE \"Topping Item\"=\'' + item + '\'')
            .then(query_res => {
                res.redirect('/inventory');
            });
    
    }
    else if(type=="Dressings"){
        pool
            .query('UPDATE \"Dressings\" SET \"Dressing Inventory\"= \'' + count + '\' WHERE \"Dressing Item\"=\'' + item + '\'')
            .then(query_res => {
                res.redirect('/inventory');
            });
    }
});

app.get('/sales', (req, res) => {
    Sales = []
    res.render('sales',Sales);

});
app.get('/sales-success',(req,res)=>{
    Sales =app.get('salesTable');
    res.render('sales-success',Sales);
});

app.post('/sales',(req,res)=>{

    const current =new Date();//plan to use this for testing to make sure both are before current date
    let year = current.getFullYear();
    let month = current.getMonth()+1;
    let day =current.getDate();
    let fullCurrent = year + "-" + month + "-" + day;
    
    /**
     * Query set up just waiting for front end to setup.
     * turn dates into date1 and date2
     */
     let date1 = ""+req.body.year1+"-"+req.body.month1+"-"+req.body.day1;
     let date2 = ""+req.body.year2+"-"+req.body.month2+"-"+req.body.day2;
     
     /**
      * Query set up just waiting for front end to setup.
      * turn dates into date1 and date2
      */
      Sales = [] //use as in queries to change to Items and Count
     pool
         .query('SELECT  \"Entrees\".\"Entree Items\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Entrees\" on \"Order\".\"Entree ID\" = \"Entrees\".\"Entree ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' group by \"Entrees\".\"Entree Items\" order by \"Entrees\".\"Entree Items\";')
         .then(query_res => {
             for (let i = 0; i < query_res.rowCount; i++) {
                 Sales.push(query_res.rows[i]);
             }
             pool
                 .query('SELECT  \"Dressings\".\"Dressing Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Dressings\" on \"Order\".\"Dressing ID\" = \"Dressings\".\"Dressing ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Dressing Item\"!= \'None\' group by \"Dressings\".\"Dressing Item\" order by \"Dressings\".\"Dressing Item\";')
                 .then(query_res => {
                     for (let j = 0; j < query_res.rowCount; j++) {
                         Sales.push(query_res.rows[j]);
                     }
                     pool
                         .query('SELECT  \"Drinks\".\"Drink Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Drinks\" on \"Order\".\"Drinks ID\" = \"Drinks\".\"Drink ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Drink Item\"!=\'None\' group by \"Drinks\".\"Drink Item\" order by \"Drinks\".\"Drink Item\";')
                         .then(query_res => {
                             for (let j = 0; j < query_res.rowCount; j++) {
                                 Sales.push(query_res.rows[j]);
                             }
                             pool
                                 .query('SELECT  \"Starters\".\"Starter Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Starters\" on \"Order\".\"Starter ID\" = \"Starters\".\"Starter ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Starter Item\"!=\'None\' group by \"Starters\".\"Starter Item\" order by \"Starters\".\"Starter Item\";')
                                 .then(query_res => {
                                     for (let j = 0; j < query_res.rowCount; j++) {
                                         Sales.push(query_res.rows[j]);
                                     }
                                     pool
                                         .query('SELECT  \"Toppings\".\"Topping Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Toppings\" on \"Order\".\"Topping IDs\"[1] = \"Toppings\".\"Topping ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Topping Item\"!=\'None\' group by \"Toppings\".\"Topping Item\" order by \"Toppings\".\"Topping Item\";')
                                         .then(query_res => {
                                             for (let j = 0; j < query_res.rowCount; j++) {
                                                 Sales.push(query_res.rows[j]);
                                             }
                                            app.set('salesTable', Sales);
                                            res.redirect("/sales-success");
                                         });
                                     
                                 });
                                     
                         });
                     
                 });
         });
});

app.get('/excess', (req, res) => {
    Excess = []
    res.render('excess',Excess);
});
app.get('/excess-success',(req,res)=>{
    Excess =app.get('excessTable');
    res.render('excess-success',Excess);
});
app.post('/excess',(req,res)=>{
    let date1 = ""+req.body.year1+"-"+req.body.month1+"-"+req.body.day1;

    const current =new Date();//plan to use this for testing to make sure both are before current date
    let year = current.getFullYear();
    let month = current.getMonth()+1;
    let day =current.getDate();
    let date2 = year + "-" + month + "-" + day;
    
    /**
     * Query set up just waiting for front end to setup.
     * turn dates into date1 and date2
     */
     Sales = [] //use as in queries to change to Items and Count
     pool
        .query('SELECT  \"Entrees\".\"Entree Items\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Entrees\" on \"Order\".\"Entree ID\" = \"Entrees\".\"Entree ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' group by \"Entrees\".\"Entree Items\" order by \"Entrees\".\"Entree Items\";')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                Sales.push(query_res.rows[i]);
            }
            pool
                .query('SELECT  \"Dressings\".\"Dressing Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Dressings\" on \"Order\".\"Dressing ID\" = \"Dressings\".\"Dressing ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Dressing Item\"!= \'None\' group by \"Dressings\".\"Dressing Item\" order by \"Dressings\".\"Dressing Item\";')
                .then(query_res => {
                    for (let j = 0; j < query_res.rowCount; j++) {
                        Sales.push(query_res.rows[j]);
                    }
                    pool
                        .query('SELECT  \"Drinks\".\"Drink Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Drinks\" on \"Order\".\"Drinks ID\" = \"Drinks\".\"Drink ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Drink Item\"!=\'None\' group by \"Drinks\".\"Drink Item\" order by \"Drinks\".\"Drink Item\";')
                        .then(query_res => {
                            for (let j = 0; j < query_res.rowCount; j++) {
                                Sales.push(query_res.rows[j]);
                            }
                            pool
                                .query('SELECT  \"Starters\".\"Starter Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Starters\" on \"Order\".\"Starter ID\" = \"Starters\".\"Starter ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Starter Item\"!=\'None\' group by \"Starters\".\"Starter Item\" order by \"Starters\".\"Starter Item\";')
                                .then(query_res => {
                                    for (let j = 0; j < query_res.rowCount; j++) {
                                        Sales.push(query_res.rows[j]);
                                    }
                                    pool
                                        .query('SELECT  \"Toppings\".\"Topping Item\" as \"Item\", count(\"Order ID\") From \"Order\" Inner Join \"Toppings\" on \"Order\".\"Topping IDs\"[1] = \"Toppings\".\"Topping ID\" where \"Date\"  between \'' + date1 + '\' And \'' + date2 + '\' and \"Topping Item\"!=\'None\' group by \"Toppings\".\"Topping Item\" order by \"Toppings\".\"Topping Item\";')
                                        .then(query_res => {
                                            for (let j = 0; j < query_res.rowCount; j++) {
                                                Sales.push(query_res.rows[j]);
                                            }
                                        

                                            Entrees = []
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
                                                                .query('SELECT \"Drink Item\" as \"Items\", \"Drink Inventory\" as \"Inventory\" FROM \"Drinks\";')
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
                                                                                .query('SELECT \"Topping Item\" as \"Items\", \"Topping Inventory\" as \"Inventory\" FROM \"Toppings\";')
                                                                                .then(query_res => {
                                                                                    for (let j = 0; j < query_res.rowCount; j++) {
                                                                                        Entrees.push(query_res.rows[j]);
                                                                                    }
                                                                                    
                                                                                    
                                                                                    Excess = []
                                                                                    for (var r in Sales) {
                                                                                        sale = Sales[r];
                                                                                        let sold = parseFloat(sale.count);
                                                                                        let currInv = parseFloat(Entrees[r].Inventory);
                                                                                        let oldInv = sold + currInv;
                                                                                        excess = {};
                                                                                        excess.Item = sale.Item;
                                                                                        excess.percent = parseFloat(((sold / oldInv) * 100).toFixed(2));
                                                                                        // console.log(excess);
                                                                                        if (sold < oldInv * 0.1) {
                                                                                            Excess.push(excess);
                                                                                            // console.log(excess);
                                                                                        }
                                                                                        // Excess.push(Sales[r]);
                                                                                    }
                                                                                    app.set('excessTable', Excess);
                                                                                    res.redirect("/excess-success");

                                                                                    // res.render('excess', Excess);
                                                                                    // res.render('');
                                                                                });
                                                                            
                                                                        });
                                                                            
                                                                });
                                                            
                                                        });
                                                });
                                    });
                                
                            });
                                
                    });
                
            });
    });
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

app.listen(PORT, hostname, () => {
    console.log(`Pom&Honey Web App listening at http://localhost:${PORT}`);
});
/*app.listen(port, orderFunction(),() =>{
    console.log('OrderFunction Recognized');
});*/


