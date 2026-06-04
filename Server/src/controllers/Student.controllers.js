import student from "../Modals/Students-modal.js";
import { contactMsg } from "../Modals/ContactUs-modal.js";
import admin from "../Modals/Admins-modals.js";
import { NotificationMsg } from "../Modals/Notification-modals.js";
import { generateOtp } from "../utility/otpGenerator.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { Complaint } from "../Modals/Complaint-modal.js";
import Otp from "../Modals/Otp-modal.js";

const home = async (req, res) => {
  try {
    res.status(200).send("Hello Welcome to the Auth Page...");
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  try {
    const { name, rollno, email, password, gender, className, branch } =
      req.body;
    const correctEmail = email.endsWith("@jmieti.edu.in");
    if (!correctEmail) {
      return res
        .status(400)
        .json({ msg: "Please use your college email to register!" });
    }
    const userExists = await student.findOne({ email });
    if (userExists) {
      return res
        .status(500)
        .json({ msg: "Student with this email already exists!" });
    }
    const studentCreated = await student.create({
      name,
      rollno,
      email,
      password,
      gender,
      className,
      branch,
    });
    res.status(200).json({
      msg: "Student signed up successfully!",
      token: studentCreated.generateToken(),
      studentID: studentCreated._id.toString(),
    });
  } catch (error) {
    console.error("🔥 Signup error:", error.message);
    console.error(error.stack);
    if (error.code === 11000) {
    return res.status(400).json({
      error: "ROLL_NUMBER_EXISTS",
      message: "Student with this roll number already exists!",
    });
  }
    
    await Otp.deleteOne({ email });
    res.status(500).json({
      msg: "Internal Server Error!",
      error: error.message, // clean error text
      stack: error.stack, // where the crash happened
    });
  }
};

//login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExist = await admin.findOne({ email });
    const studentExist = await student.findOne({ email });

    if (!studentExist) {
      if (adminExist) {
        // Admin password check should ideally be here too
        const isAdminMatch = await adminExist.comparePassword(password);
        if (!isAdminMatch) {
          return res.status(401).json({ msg: "Invalid email or password" });
        }
        return res.status(200).json({
          msg: "Admin login successful",
          token: await adminExist.admingenerateToken(),
          adminID: adminExist._id.toString(),
          adminName: adminExist.name,
          role: adminExist.role,
        });
      }
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // 1. Verify Password first
    const isMatch = await studentExist.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    if (studentExist.isSuspended && studentExist.suspensionDetails) {
      const expiryDate = studentExist.suspensionDetails.expiresAt
        ? new Date(studentExist.suspensionDetails.expiresAt)
        : null;
      const now = new Date();

      // If an expiry date exists and the current time has passed it
      if (expiryDate && now > expiryDate) {
        // Lift the suspension
        studentExist.isSuspended = false;
        await studentExist.save();
      }
    }

    //2. check for the suspension
    if (isMatch && studentExist.suspensionDetails && studentExist.isSuspended) {
      return res.status(403).json({
        message: "Your account is suspended. You cannot perform this action.",
        token: await studentExist.generateToken(),
      });
    } else {
      return res.status(200).json({
        msg: "Student logged in successfully!",
        token: await studentExist.generateToken(),
        studentID: studentExist._id.toString(),
        studentName: studentExist.name,
        rollno: studentExist.rollno,
        role: studentExist.role || "student",
        isSuspended: studentExist.isSuspended,
        suspensionDetails: studentExist.suspensionDetails,
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

//user logic ie get data of the logged user from DB
const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log("User data in user in studentcontrollers:", userData);

    res.status(200).json({ userData });
  } catch (error) {
    console.error("error form the user route: ", error);
  }
};

//Contact Us
const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const messageCreated = await contactMsg.create({
      name,
      email,
      subject,
      message,
    });
    res.status(200).json({
      msg: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Message not sent:", error.message);
    console.error(error.stack);
    res.status(500).json({
      msg: "Internal Server Error!",
      error: error.message, // clean error text
      stack: error.stack, // where the crash happened
    });
  }
};

//get notifications
const getNotifications = async (req, res, next) => {
  try {
    const { rollno } = req.query;
    const notifications = await NotificationMsg.find({ rollno: rollno }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
    if (!notifications) {
      console.error("Couldn't get the notifications!");
      res.status(500).json({
        msg: "Couldn't get the notifications!",
        error: error.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

const sendOtpToMail = async (req, res) => {
  const { name, email, type } = req.body;

  const studentExist = await student.findOne({ email});
  // console.log(Boolean(studentExist));
  if(Boolean(studentExist) && type === "signup"){
    return res.status(500).json({msg:"Student with this email alraedy exist!"})
  }
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.SMTPUser,
      pass: process.env.SMTPPassword,
    },
  });

  try {

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }
    // Delete any existing OTPs for this email to prevent spam/duplicates
    await Otp.deleteMany({ email: email });

    const generatedOtp = generateOtp();
    await Otp.create({
      email: email,
      otp: generatedOtp,
    });

    const info = await transporter.sendMail({
      from: '"Yachika@JMIETI"<kambojyartik@gmail.com>',
      to: email,
      subject: "Hello from Yachika Team.",
      text: "Here is your OTP for verification.", // Plain-text version of the message
      html: `
              <h3>Hi ${name} 👋</h3>
              <p>Use the following one-time password (OTP) for verification of your Yachika@JMIETI account.</p>
              <h2 style="color:#1a4cff;">${generatedOtp}</h2>
              <p>This OTP is valid for 5 minutes only.</p>
              <p>This mail is sent to: ${email}</p><br>
              <p>If you did not request this, please ignore this email.</p><br>
              <p>Regards,</p>
              <p>Yachika@JMIETI Team</P>
            `,
    });
    console.log("Message sent:", info.messageId);

    if (!info || info.rejected.length > 0) {
      console.error("Failed to send OTP email.");
      return res.status(500).json({ msg: "Failed to send OTP email." });
    }
    res.status(200).json({
      msg: "OTP generated and email sent successfully!",
      expiresIn: "5 minutes",
    });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOtpData = await Otp.findOne({ email: email });

    if (!storedOtpData) {
      return res.status(400).json({ msg: "OTP not found or expired" });
    }

    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP." });
    }

    res.status(200).json({ msg: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const doesStudentExist = await student.findOne({ email });
  if (!doesStudentExist) {
    return res.status(400).json({ msg: "Invalid Email!" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedPassword = await student.findByIdAndUpdate(
    doesStudentExist._id,
    { $set: { password: hashedPassword } },
    { new: true },
  );

  if (!updatedPassword) {
    return res.status(404).json({ msg: "Password can't be Updated!" });
  }
  return res.status(200).json({ msg: "Password updated successfully!" });
};

const clearNotifications = async (req, res, next) => {
  try {
    const { rollno } = req.query;

    if (!rollno) {
      return res
        .status(400)
        .json({ msg: "Roll number is required to clear notifications." });
    }

    // deleteMany wipes all documents matching the criteria in one operation
    const result = await NotificationMsg.deleteMany({ rollno: rollno });

    return res.status(200).json({
      msg: "Notifications cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    next(error);
  }
};

const markNotificationsAsRead = async (req, res, next) => {
  try {
    const { rollno } = req.query;

    if (!rollno) {
      return res.status(400).json({ msg: "Roll number is required." });
    }

    // Update all notifications for this user where isRead is currently false
    await NotificationMsg.updateMany(
      { rollno: rollno, isRead: false },
      { $set: { isRead: true } },
    );

    return res.status(200).json({ msg: "Notifications marked as read." });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    next(error);
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const allComplaints = await Complaint.find();
    // console.log(allComplaints);
    const securedRecentComplaints = allComplaints.map((complaint) => {
      // If it is anonymous, ONLY the superadmin gets the real data
      if (complaint.isAnonymous) {
        complaint.createdByName = "Anonymous";
        complaint.createdByRollno = "Hidden";
        complaint.createdByClass = "Hidden";
        complaint.createdByBranch = "Hidden";
        complaint.createdByEmail = "Hidden";
      }
      return complaint;
    });

    if (!securedRecentComplaints || securedRecentComplaints.length === 0) {
      return res.status(404).json({ msg: "No complaints found" });
    }
    return res.status(200).json(securedRecentComplaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error, cant fetch complaints" });
  }
};

const submitAppeal = async (req, res) => {
  try {
    const { appealText } = req.body;
    const studentId = req.user._id;

    if (!appealText || appealText.trim() === "") {
      return res.status(400).json({ message: "Appeal text is required." });
    }

    const studentExist = await student.findById(studentId);

    if (!studentExist.isSuspended) {
      return res
        .status(400)
        .json({ message: "Your account is not currently suspended." });
    }

    if (studentExist.suspensionDetails.appeal.hasAppealed) {
      return res
        .status(400)
        .json({ message: "You have already submitted an appeal." });
    }

    // Lock in the appeal
    studentExist.suspensionDetails.appeal = {
      hasAppealed: true,
      appealText: appealText,
      submittedAt: new Date(),
      status: "Pending",
      adminRemarks: null,
    };

    await studentExist.save();

    res.status(200).json({
      message: "Appeal submitted successfully.",
      suspensionDetails: studentExist.suspensionDetails,
    });
  } catch (error) {
    console.error("Submit Appeal Error:", error);
    res.status(500).json({ message: "Server error while submitting appeal." });
  }
};

export {
  home,
  signup,
  login,
  getAllComplaints,
  user,
  contactUs,
  getNotifications,
  sendOtpToMail,
  verifyOtp,
  forgetPassword,
  clearNotifications,
  markNotificationsAsRead,
  submitAppeal,
};