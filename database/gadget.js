import { model, Schema } from "mongoose";

let gadget = new Schema({
    name:{type:String, required:true},
    number2:{type:Number, required:true},
    number1:{type:Number, required:true},
    example:{type:String, required:true},
    img:{
        data: Buffer,
        contentType: String
        }
},
    {
        timestamps:true
    }
);

export default model("gadget", gadget);