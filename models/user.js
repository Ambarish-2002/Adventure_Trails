const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true 
    }
});
//pasport will handel the username password thing
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);