/*
const express = require("express")

const app = express()

app.get("/", async (req, res) => {
    res.json([
        { "name": "Service C" }
    ])
})

app.listen(8080, "0.0.0.0")
*/
//Exo 5 : 

const express = require("express");
const fs = require('fs');
const path = require('path');
const promClient = require('prom-client');

const app = express();
const dataFile = process.env.DATA_FILE || '/data/counter.txt';

const reqCounter = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total des requêtes HTTP reçues',
    labelNames: ['service']
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.get("/", async (req, res) => {
    reqCounter.inc({ service: 'C' }); 
    
    let count = 0;
    if (fs.existsSync(dataFile)) {
        count = parseInt(fs.readFileSync(dataFile, 'utf8')) || 0;
    }
    count++;
    
    const dir = path.dirname(dataFile);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFile, count.toString());
    
    res.json({ service: "C", language: "Node", counter: count });
});

app.listen(8080, "0.0.0.0", () => console.log("Service C listening on port 8080"));