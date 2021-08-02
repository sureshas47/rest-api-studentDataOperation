const port = process.env.PORT || "8000";
const express = require('express');
const app = express();

require('./db/connection'); //require connection to connect with database
const Student = require('./models/students'); //require Student module

app.use(express.json()); //to recognize as json object from incoming requested object

app.get("/",(req,res)=>{
    res.send("welcome to home page");
});

// create new students using .then and catch promises
// app.post("/students",(req, res)=>{

//     const user = new Student(req.body);
//     console.log(user);
    
//     user.save().then(() => {
//         res.status(201).send(user);

//     }).catch((error) => {
//         res.status(400).send(error);
//     });

// });



// // usiing router..................................................
// const router = new express.Router();//create a Router
// router.get("/suresh",(req, res)=>{
//     res.send("i am using express router");
// }); //define a router
// app.use(router)// register a router
// // ...............................................................



// create new students using async and await..........
app.post("/students", async(req,res) => {
    try {
        console.log(req.body);
       const user = new Student(req.body);
       const createUser = await user.save();
        res.status(201).send(createUser);
       
    } catch (error) {
        res.status(400).send(error);
    }
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

//read/get students data using async and await..........
app.get("/students", async (req,res) => {
    try {
        
        const studentsData = await Student.find();
        res.status(200).send(studentsData);

    } catch (error) {
        res.ststus(400).send(error);
    }
});

// read specific student data by Id..............
app.get("/students/:id", async(req,res) => {
    try {
        // get the id provided in url
        const _id = req.params.id;
        const individualStudentData = await Student.findById({_id}); //get indivudual data
        
        if(!individualStudentData){return res.status(404).send();}
        else{
            res.status(200).send(individualStudentData);
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
});

// update student data by id.................
app.patch("/students/:id", async(req,res) => {
    try {
        
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new : true //this updates data instatnly 
        });
        res.send(updateStudents); 

    } catch (error) {
        res.status(400).send(error);
        
    }
});

// delete student data by id

app.delete("/students/:id", async (req, res) => {
    try {

        const _id = req.params.id;
        const deleteStudents = await Student.findByIdAndDelete(_id);
        if(!_id){
            return res.status(404).send();
        }else{
            res.send(deleteStudents);
        }

    } catch (error) {
        res.status(400).send(error);
    }
});





