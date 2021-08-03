
const express = require('express');
require('./db/connection'); //require connection to connect with database
const router = require('../src/routers/student');//require student router

const app = express();
const port = process.env.PORT || "8000";

// what we used in our app
app.use(express.json()); //to recognize as json object from incoming requested object
app.use(router);

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});





