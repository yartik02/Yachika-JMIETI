import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const studentSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    rollno: {
        type: Number,
        required: [true, "Roll Number is required"],
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
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:[true,"Gender is required"]
    },
    className: {
        type: String,
        required: [true, "Class is required"]
    },
    branch: {
        type: String,
        required: [true, "Branch is required"]
    }

},{timestamps: true}

);

//secure the password 


studentSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hash_Password = await bcrypt.hash(this.password, saltRounds);
        this.password = hash_Password;
    } catch (error) {
        next( error);
    }
});


// JWT are typically not stored in the database along with user credentials. Instead they are issued by the server during 
// the authentication process and then stored on the client-side (e.g., in local storage or cookies) for later use.


studentSchema.methods.generateToken = async function() {    //here generateToken is an instance method, in which u can create as many functions as u want

    try {
        return jwt.sign(
            {
                studentId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            { 
                expiresIn: process.env.JWT_TOKEN_EXPIRY,
            }
    )
    } catch (error) {
        console.error(error);
    }
};


//compare the passwords

studentSchema.methods.comparePassword = async function(password) {
        return bcrypt.compare(password, this.password);
};
// 'this' keyword refers to the current document instance being processed.

const student= mongoose.model("Student",studentSchema);
export default student