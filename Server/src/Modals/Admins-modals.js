import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    roleId: {
        type: String,
        required: [true, "roleId is required"],
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        endsWith: "@jmieti.edu.in"
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role:{
        type:String,
        enum:["Admin","SuperAdmin"],
        required:[true,"Role is required"]
    }

},{timestamps: true}
);


adminSchema.methods.admingenerateToken = async function() {    //here generateToken is an instance method, in which u can create as many functions as u want

    try {
        return jwt.sign(
            {
                adminId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            { 
                expiresIn: process.env.JWT_TOKEN_EXPIRY,
            })
    } catch (error) {
        console.error("Modals error:",error);
    }
};


const admin= mongoose.model("admin",adminSchema);
export default admin;