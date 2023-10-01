import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:[true,'First name is required']
    },
    lastName:{
        type: String,
        
    },
    email:{
        type: String,
        required:[true,'Email Id is requred'],
        unique: true
    },
    password:{
        type: String,
        required:[true,'Password is required']
    },
   
},{
    timestamps:true
})
export default mongoose.model('User', userSchema)