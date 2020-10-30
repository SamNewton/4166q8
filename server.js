// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const mongoDBClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/personal-budget';


app.use(cors());
app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/budget', (req, res) => {
    mongoDBClient.connect(url, { useUnifiedTopology: true}, (operationError, dbHandler) => {
        if(operationError) {
            console.log("An error has occured during the connection process");
        } else {
            console.log("Connected to the database");
            
    
            let data = dbHandler.db('personal-budget').collection('personal-budget-collection').find({}).toArray(function(error, documents) {
            
                res.send(documents);
            });
        }
    });
    
});

app.post('/addbudget', (req, res) => {
    console.log(req.body);
    mongoDBClient.connect(url, { useUnifiedTopology: true}, (operationError, dbHandler) => {
        if(operationError) {
            console.log("An error has occured during the connection process");
        } else {
            console.log("Connected to the database");
            let data = req.body
    
            dbHandler.db('personal-budget').collection('personal-budget-collection').insertOne(data, (operr, opresult) => {
                if(operr) {
                    console.log("unable to insert data");
                } else {
                    console.log("inserted data");
                    dbHandler.close();
                }
            });   
        }
    });
    
  
  res.end("added information: " + req.body);
}); 

app.post('/editbudget', (req, res) => { 
    
}); 

app.listen(port, () => {
    console.log(`API Served at http://localhost:${port}`);
});