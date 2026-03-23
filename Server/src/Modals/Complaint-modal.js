import mongoose from "mongoose";

const subCategoryMap = {
  Infrastructure: ["Plumbing", "Electrical", "Furniture", "Cleanliness", "Safety", "HVAC"],
  Services: ["Internet", "Cafeteria", "Library", "Transport", "Medical", "Security"],
  Faculty: ["Teaching", "Behaviour", "Attendance", "Grading", "Availability"],
  Student: [
  "Misbehavior or Rude Conduct",
  "Discrimination",
  "Intimidation or Threat",
  "Harassment or Bullying",
  "Ragging",
  "Cyber Misconduct (Social Media Issues)",
  "Other Student-Related Issue"
  ],
  Hostel: ["Warden",
  "Maintenance", 
  "Food Quality", 
  "Room Allocation", 
  "Cleanliness", 
  "Safety",
  "Harassment or Bullying",
  "Ragging",
  "Cyber Misconduct (Social Media Issues)",
  "Other Student-Related Issue"],
    Other: ["General", "Feedback", "Suggestion"]
};

const compliantSchema = new mongoose.Schema({
    createdByName: {
        type: String,
        required: true
    },
    createdByRollno: {
        type: String,
        required: true
    },
    createdByEmail: {
        type: String,
        required: true
    },
    createdByClass: {
        type: String,
        required: true
    },
    createdByBranch: {
        type: String,
        required: true
    },
    complaintTitle: {
        type: String,
        required: true
    },
    complaintBody: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // Get the keys from the map to automatically populate the enum
        enum: Object.keys(subCategoryMap),
        required: true
    },
    subCategory: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // 'this' refers to the document being validated.
                // We check if the provided subCategory 'value' exists in the array
                // corresponding to the document's 'category'.
                if (!this.category) return false; // Ensure category is present
                return subCategoryMap[this.category].includes(value);
            },
            // Custom error message
            message: props => `${props.value} is not a valid subcategory for the selected category.`
        }
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ["Pending","Progress", "Resolved", "Rejected"],
        default: "Pending"
    },
    rating:{
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    feedback:{
        type: String,
        default: " "
    },
    isReported:{
        type: Boolean,
        default: false
    },
    isUnResolved:{
        type: Boolean,
        default: false
    }

}, { timestamps: true });


compliantSchema.index({ isReported: 1 });

const Complaint =  mongoose.model("Complaint", compliantSchema);
export {Complaint}