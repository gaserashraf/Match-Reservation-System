// initiate a service and run it on port 3000 
const express = require('express');
const app = express();
const port = 3000;

const DB_URI = "mongodb://localhost/MatchReservationsSystem";
require('./db/mongoose')(DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// initiate a service and run it on port 3000    
app.listen(port, () => console.log(`Example app listening on port ${port}!`));