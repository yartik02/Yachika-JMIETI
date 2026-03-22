import student from "../Modals/Students-modal.js";
import admin from "../Modals/Admins-modals.js";
import { Complaint } from "../Modals/Complaint-modal.js";
import { contactMsg } from "../Modals/ContactUs-modal.js";
import { user } from "./Student.controllers.js";
import { NotificationMsg } from "../Modals/Notification-modals.js";

const AdminSignup = async (req, res) => {
  try {
    const { name, roleId, email, password, role } = req.body;
    const userExists = await admin.findOne({ email });
    if (userExists) {
      return res
        .status(500)
        .json({ msg: "Admin with this email already exists!" });
    }
    const adminCreated = await admin.create({
      name,
      roleId,
      email,
      password,
      role,
    });
    res.status(200).json({
      msg: "Admin signed up successfully!",
      token: adminCreated.admingenerateToken(),
      userID: adminCreated._id.toString(),
    });
  } catch (error) {
    console.error("🔥 Signup error:", error.message);
    console.error(error.stack);
    res.status(500).json({
      msg: "Internal Server Error!",
      error: error.message,
      stack: error.stack,
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
    return res
      .status(400)
      .json({ msg: "Internal Server Error!", error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const allStudents = await student.find({}, { password: 0 });
    // console.log(allStudents);
    if (!allStudents || allStudents.length === 0) {
      return res.status(404).json({ msg: "No students found" });
    }
    return res.status(200).json(allStudents);
  } catch (error) {
    next(error);
  }
};

const getAllComplaintsAdmins = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).lean();

    // Safely grab the role, default to 'guest' if something went wrong in middleware
    const userRole = req.user?.role || "guest"; 

    const securedComplaints = complaints.map((complaint) => {
      
      // FIX: Secure by Default. If it is anonymous, ONLY the superadmin gets the real data.
      if (complaint.isAnonymous && userRole !== "superadmin") {
        
        complaint.createdByName = "Anonymous Student";
        complaint.createdByRollno = "Hidden";
        complaint.createdByClass = "Hidden";
        complaint.createdByBranch = "Hidden";
        complaint.createdByEmail = "Hidden";
      }
      
      return complaint;
    });

    return res.status(200).json(securedComplaints);

  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ message: "Internal server error while fetching complaints." });
  }
};

const getRecentComplaints = async (req, res) => {
  try {
    // 1. Added .lean() for performance and mutability
    const recentComplaints = await Complaint.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 2. BUG FIX: Check if empty BEFORE sending a response
    if (!recentComplaints || recentComplaints.length === 0) {
      return res.status(404).json({ msg: "No recent complaints found" });
    }

    // 3. Safely grab the role from the middleware
    const userRole = req.user?.role || "guest";

    // 4. Apply the Secure by Default masking logic
    const securedRecentComplaints = recentComplaints.map((complaint) => {
      // If it is anonymous, ONLY the superadmin gets the real data
      if (complaint.isAnonymous && userRole !== "superadmin") {
        complaint.createdByName = "Anonymous Student";
        complaint.createdByRollno = "Hidden";
        complaint.createdByClass = "Hidden";
        complaint.createdByBranch = "Hidden";
        complaint.createdByEmail = "Hidden";
      }
      return complaint;
    });

    // 5. Send the secured data
    return res.status(200).json(securedRecentComplaints);

  } catch (error) {
    console.error("Error fetching recent complaints:", error);
    return res.status(500).json({ msg: "Failed to fetch recent complaints", error: error.message });
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
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await student.deleteOne({ _id: studentId });
    if (deletedStudent.deletedCount === 0) {
      return res.status(404).json({ msg: "Student not found" });
    }
    return res.status(200).json({ msg: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//get single student data

const getComplaintById = async (req, res, next) => {
  try {
    const complaintId = req.params.id;
    const complaintData = await Complaint.findById(complaintId).lean();

    if (!complaintData) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    const userRole = req.user?.role || "guest";
    if (complaintData.isAnonymous && userRole !== "superadmin") {
      complaintData.createdByName = "Anonymous Student";
      complaintData.createdByRollno = "Hidden";
      complaintData.createdByClass = "Hidden";
      complaintData.createdByBranch = "Hidden";
      complaintData.createdByEmail = "Hidden";
    }

    return res.status(200).json(complaintData);

  } catch (error) {
    next(error);
  }
};

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
      { new: true },
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
        complaintCreatedAt: updatedComplaint.createdAt,
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
};

const updateRatingFeedback = async (req, res, next) => {
  try {
    const complaintId = req.params.id;
    const FformData = req.body;
    // Step 1: Find the complaint and update it
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { $set: FformData }, // Now 'dataToUpdate' is defined
      { new: true },
    );

    // Step 2: Check if the complaint was found and updated
    if (!updatedComplaint) {
      return res.status(404).json({ msg: "Complaint not found!" });
    }

    // Step 3: Now that the complaint is updated, create the notification
    const rollno = updatedComplaint.createdByRollno;
    let notificationMessage = "Thank you for your feedback!";

    // Step 4: Create and save the notification
    if (notificationMessage && rollno) {
      await NotificationMsg.create({
        rollno: rollno,
        message: notificationMessage,
        complaintTitle: updatedComplaint.complaintTitle,
        complaintCategory: updatedComplaint.category,
        complaintSubCategory: updatedComplaint.subCategory,
        complaintPriority: updatedComplaint.priority,
        complaintCreatedAt: updatedComplaint.createdAt,
        complaintId: updatedComplaint._id,
      });
    }

    // Step 5: Send ONE final response
    return res.status(200).json(updatedComplaint);
  } catch (error) {
    next(error);
  }
};

const reportComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the complaint and flip the isEscalated flag to true
    // { new: true } returns the updated document rather than the old one
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { isEscalated: true },
      { new: true },
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    return res.status(200).json({
      message: "Complaint successfully reported to Super Admin.",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Reporting Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during report." });
  }
};

export {
  getAllStudents,
  getAllComplaintsAdmins,
  getContactUsMessages,
  AdminSignup,
  adminLogin,
  getRecentComplaints,
  deleteStudent,
  getComplaintById,
  updateComplaintById,
  updateRatingFeedback,
  reportComplaint,
};