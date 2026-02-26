import student from "../Modals/Students-modal.js";
import admin from "../Modals/Admins-modals.js";
import { Complaint } from "../Modals/Complaint-modal.js";
import { contactMsg } from "../Modals/ContactUs-modal.js";
import { user } from "./Student.controllers.js";
import { NotificationMsg } from "../Modals/Notification-modals.js";


const AdminSignup = async (req, res) => {
    try {
        const {name, roleId, email, password, role} = req.body;
        const userExists = await admin.findOne({email});
        if(userExists){
            return res.status(500).json({msg: "Admin with this email already exists!"});
        }
        const adminCreated = await admin.create({name, roleId, email, password, role});
        res.status(200).json({
            msg:"Admin signed up successfully!", 
            token: adminCreated.admingenerateToken(),
            userID: adminCreated._id.toString(),
        }); 

    } catch (error) {
        console.error("🔥 Signup error:", error.message);
        console.error(error.stack);
        res.status(500).json({
        msg: "Internal Server Error!",
        error: error.message,   
        stack: error.stack
        });
    }
};

const adminLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            // console.log("req.body in login:",req.body);
            const adminExist = await admin.findOne({ email });
                // console.log("adminExist:",adminExist);
                if (adminExist) {
                    return res.status(200).json({ 
                    msg: "Admin login successfull",
                    token: await adminExist.admingenerateToken(),
                    adminID: adminExist._id.toString(), 
                    });
                }
                return res.status(400).json({ msg: "Invalid Credentials" });
            
        } catch (error) {
            return res.status(400).json({ msg: "Internal Server Error!", error: error.message });
        }
    };


const getAllStudents = async (req, res) => {
    try {
        const allStudents = await student.find({},{"password": 0});
        // console.log(allStudents);
        if (!allStudents || allStudents.length === 0) {
            return res.status(404).json({ msg: "No students found" });
        }
        return res.status(200).json(allStudents);
    } catch (error) {
        next(error);
    }
}

const getAllComplaints = async (req, res) => {
    try {
        const allComplaints = await Complaint.find();
        // console.log(allComplaints);
        if (!allComplaints || allComplaints.length === 0) {
            return res.status(404).json({ msg: "No complaints found" });
        }
        return res.status(200).json(allComplaints);
    } catch (error) {
        next(error);
    }
}

const getRecentComplaints = async (req, res) => {
    try {
        const recentComplaints = await Complaint.find({})
            .sort({ createdAt: -1 }) 
            .limit(5);               

        res.status(200).json(recentComplaints);
        if (!recentComplaints || recentComplaints.length === 0) {
            return res.status(404).json({ msg: "No recent complaints found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch recent complaints", error: error.message });
    }
};

const getContactUsMessages = async (req, res) => {
    try {
        const allMessages = await contactMsg.find();
        // console.log("all Messages: ",allMessages);
        if (!allMessages || allMessages.length === 0) {
            return res.status(404).json({ msg: "No messages found" });
        }
        return res.status(200).json(allMessages);

    } catch (error) {
        next(error);
    }
}


const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await student.deleteOne({_id: studentId});
        if (deletedStudent.deletedCount === 0) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.status(200).json({ msg: "Student deleted successfully" });
    } catch (error) {
        next(error);
    }
}

//get single student data

const getComplaintById = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const complaintData = await Complaint.find({_id: complaintId});
        if (!complaintData) {
            return res.status(404).json({ msg: "Complaint not found" });
        }
        return res.status(200).json(complaintData);
    } catch (error) {
        next(error);
    }
}

const updateComplaintById = async (req, res, next) => {
    try {
        const complaintId = req.params.id;
        const dataToUpdate = req.body;

        // Step 1: Find the complaint and update it in ONE step.
        // { new: true } tells Mongoose to return the *new, updated* document,
        // not the old one.
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { $set: dataToUpdate }, 
            { new: true }
        );

        // Step 2: Check if the complaint was found and updated
        if (!updatedComplaint) {
            return res.status(404).json({ msg: "Complaint not found!" });
        }

        // Step 3: Now that the complaint is updated, create the notification
        const rollno = updatedComplaint.createdByRollno;
        let notificationMessage = "";

        // Check the status that was just updated
        if (dataToUpdate.status === "Resolved") {
            notificationMessage = "Your complaint has been resolved.";
        } else if (dataToUpdate.status === "Progress") { 
            notificationMessage = "Our team is working on your complaint.";
        } else if (dataToUpdate.status === "Rejected") {
            notificationMessage = "Your complaint has been rejected.";
        }

        // Step 4: Create and save the notification (if a message was set)
        if (notificationMessage && rollno) {
            await NotificationMsg.create({
                rollno: rollno, // Now 'rollno' is correctly defined
                message: notificationMessage,
                complaintTitle: updatedComplaint.complaintTitle,
                complaintCategory: updatedComplaint.category,
                complaintSubCategory: updatedComplaint.subCategory,
                complaintPriority: updatedComplaint.priority,
                complaintCreatedAt:updatedComplaint.createdAt,
                complaintId: updatedComplaint._id,
                complaintRating: updatedComplaint.rating,
                complaintFeedback: updatedComplaint.feedback,
            });
        }
        
        // Step 5: Send ONE final response.
        // Sending the updated object back is best practice for your React app.
        return res.status(200).json(updatedComplaint);

    } catch (error) {
        // 'next' is now defined and will pass the error to your error handler
        next(error); 
    }
}


const updateRatingFeedback = async (req, res, next) => {
    try {
    const complaintId = req.params.id;
    const FformData = req.body;
    // Step 1: Find the complaint and update it
    const updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { $set: FformData }, // Now 'dataToUpdate' is defined
        { new: true }
    );

    // Step 2: Check if the complaint was found and updated
    if (!updatedComplaint) {
        return res.status(404).json({ msg: "Complaint not found!" });
    }

    // Step 3: Now that the complaint is updated, create the notification
    const rollno = updatedComplaint.createdByRollno;
    let notificationMessage = "Thank you for your feedback!";

    // Step 4: Create and save the notification
    if (notificationMessage && rollno ) {
        await NotificationMsg.create({
            rollno: rollno,
            message: notificationMessage,
            complaintTitle: updatedComplaint.complaintTitle,
            complaintCategory: updatedComplaint.category,
            complaintSubCategory: updatedComplaint.subCategory,
            complaintPriority: updatedComplaint.priority,
            complaintCreatedAt: updatedComplaint.createdAt,
            complaintId: updatedComplaint._id
        });
    }
    
    // Step 5: Send ONE final response
    return res.status(200).json(updatedComplaint);

} catch (error) {
    next(error); 
}
}

export {getAllStudents, getAllComplaints, getContactUsMessages, AdminSignup, adminLogin, getRecentComplaints, deleteStudent, getComplaintById, updateComplaintById, updateRatingFeedback};