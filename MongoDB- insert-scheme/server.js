const mongoose = require("mongoose");
// const nodemon = require("nodemon");
const express = require("express");
const cors = require("cors");


const app =express();
app.use(cors());



app.get("/getFriends",async(req,res)=>{

    let friendsArr = await Friend.find();

    res.json(friendsArr);
})

app.listen(2024,()=>{
    console.log("Listening to port 2024");
})


let friendSchema =new mongoose.Schema({

    firstName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z]{2,30}(?:\s[a-zA-Z]{2,30})*$/.test(v);
          },
          message: props => `${props.value} is not a valid First Name!`,
        },
        required: [true, 'User firstname is required']
      },


      lastName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z]{2,30}(?:\s[a-zA-Z]{2,30})*$/.test(v);
          },
          message: props => `${props.value} is not a valid lastname`,
        },
        required: [true, 'User lastname is required'],
      },
   age:{
    type:Number,
    min:[12,"you are to young to use our app."],
    max:[111,"you are to old to create account."],
    required:true,
   },
   email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'User email is required']
  },
   gender:{
    type:String,
    enum:["male","female"],
    lowercase:true,
    required:true,
   },
   batchID:String,


})


let Friend =new mongoose.model("friend",friendSchema,"CLGFriends");


let getDataFromDB= async ()=>{
    let friendsArr = await Friend.find();
    console.log(friendsArr);
}
    let insertIntoDB = async()=>{

try{
    let teja = new Friend({
        firstName:"Teja",
        lastName:"Kaali",
        age:21,
        email:"tejakali303@gmail.com",
        gender:"male",
        batchID:"2020-24", 
         });
        //  await teja.save();
        


        let ravi = new Friend({
            firstName:"Ravi kumar",
            lastName:"manukonda",
            age:23,
            email:"Ravikumar@gmail.com",
            gender:"Male",
            batchID:"2020-24", 
             });
 
             Friend.insertMany([teja,ravi]);
             console.log("Saved into DB");

            //  await ravi.save();

}catch(err){
    console.log("Unable to Insert data into DB");
}


    
}


let connectToMDB = async()=>{
    try{

    mongoose.connect("mongodb+srv://kaaliteja:kaaliteja@teja1.njmq2.mongodb.net/DNRDB?retryWrites=true&w=majority&appName=Teja1");
    console.log("Connected to MDB Successfully");
    // insertIntoDB();
    getDataFromDB();


    }catch(err){

    console.log("Unable to Connect to MDB");

    }
};


connectToMDB();