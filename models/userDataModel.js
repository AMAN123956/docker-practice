const mongoose = require('mongoose');

const UserDataSchema = mongoose.Schema({
    fname: {
        type:String
    },
    lname: {
        type:String
    },
    email: {
        type:String
    },
    username: {
        type:String
     },
    cardImg: {
        type:String
    },
    password:{
        type:String
    }
})

const UserData = mongoose.model("UserData", UserDataSchema)

module.exports=UserData
   