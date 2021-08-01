const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:[true,"This email is already taken"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("wrong email entered");
                }
            }
        },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:13,
        unique:[true,"this number is already written"],
        // validate(value){
        //     if(validator.isMobilePhone(value)){
        //         throw new Error("phone number already exist");
        //     }
        // }
    },
    address:{
        type:String,
        required:true,
    }

});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
