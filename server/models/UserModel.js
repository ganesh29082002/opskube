
import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: {type:String , require:true},
    lastName:{type:String , require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    role: {type:String , default:"user"},
})

export const User = mongoose.model("User" , UserSchema)

