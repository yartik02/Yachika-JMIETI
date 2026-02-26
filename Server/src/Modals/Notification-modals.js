import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: [true, "Name is required"]
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    complaintTitle: {
        type: String,
        required: true
    },
    complaintPriority: {
        type: String,
        required: true
    },
    complaintCategory: {
        type: String,
        required: true
    },
    complaintCreatedAt: {
        type: String,
        required: true
    },
    complaintSubCategory: {
        type: String,
        required: true
    },
    complaintId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    feedback: {
        type: String,
        default: " "
    }
    
}, { timestamps: true });

const NotificationMsg =  mongoose.model("Notifications", NotificationSchema);
export {NotificationMsg};