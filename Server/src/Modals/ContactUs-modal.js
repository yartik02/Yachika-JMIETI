import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

}, { timestamps: true });

const contactMsg =  mongoose.model("Contact", ContactSchema);
export {contactMsg}