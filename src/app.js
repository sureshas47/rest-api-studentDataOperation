const port = process.env.PORT || "8000";
const express = require('express');
const app = express();

require('./db/connection'); //require connection to connect with database
const Student = require('./models/students'); //require Student module

app.use(express.json()); //to recognize as json object from incoming requested object

app.get("/",(req,res)=>{
    res.send("welcome to home page");
});

// create new students 
app.post("/students",(req, res)=>{

    const user = new Student(req.body);
    console.log(user);
    
    user.save().then(() => {
        res.status(201).send(user);

    }).catch((error) => {
        res.status(400).send(error);
    });

});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});

// success code
// 200 refers to ok
// 201 refers to created
// 202 refers to accepted
// 203 refers to non-authoritative info
// 204 refers to no content

//error code
// 400 refers to failed operation
