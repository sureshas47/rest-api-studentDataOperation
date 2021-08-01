const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
         await mongoose.connect("mongodb://localhost:27017/studentsDB",{
             useCreateIndex:true,
             useUnifiedTopology:true,
             useNewUrlParser:true
            });
         console.log("connected");
    } catch (error) {
        console.log("no-connection");
    }
} 
dbConnection();