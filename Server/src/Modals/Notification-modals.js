import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: [true, "Roll number is required"],
        index: true // Faster queries for specific students
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
    // Changed to Date for better querying
    complaintCreatedAt: {
        type: Date, 
        required: true
    },
    complaintSubCategory: {
        type: String,
        required: true
    },
    // Changed to ObjectId for proper linking
    complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaints",
        required: true
    },
    // These might be better left in the Complaint model 
    // to keep a "Single Source of Truth"
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    feedback: {
        type: String,
        default: ""
    },
}, { timestamps: true });

// Ensure the index is created correctly. 
// Note: If you change 2592000 later, you MUST drop the index manually in the DB.
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

const NotificationMsg = mongoose.model("Notifications", NotificationSchema);
export { NotificationMsg };