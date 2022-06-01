const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
// Strict order to be followed
// const UserSchema = mongoose.Schema({
//     fname: { type: String, required: true },
//     lname: { type:String,required: true},
//     collegeId: { type: String, required: true, unique: true },
//     password: { type: String, required: true, },
//     email: { type: String },
//     cardimg:{type:String},
//     profileimg: { type: String },
//     mobile: { type: String },
//     github: { type: String },
//     instagram: { type: String },
//     linkedIn: { type: String },
  
//   }, {
//     timestamps: true
//   })
  
// const User = mongoose.model('User', UserSchema)
  
// module.exports = {UserSchema , User}