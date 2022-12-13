import { model, Schema } from "mongoose";

let signUp = new Schema({
    name:{type:String, required:true},
    sure:{type:String, required:true},
    gender:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
},
    {
        timestamps:true
    }
);

export default model("user", signUp);