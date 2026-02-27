import student from "../Modals/Students-modal.js";
import { contactMsg } from "../Modals/ContactUs-modal.js";
import admin from "../Modals/Admins-modals.js";
import { NotificationMsg } from "../Modals/Notification-modals.js";
import { generateOtp } from "../utility/otpGenerator.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

// temporary in-memory store (use DB / Redis in production)
const otpStore = new Map();

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
    // console.log("req.body in login:",req.body);

    const adminExist = await admin.findOne({ email });
    // console.log("adminExist:",adminExist);

    const studentExist = await student.findOne({ email });
    if (!studentExist) {
      if (adminExist) {
        return res.status(200).json({
          msg: "Admin login successfull",
          token: await adminExist.admingenerateToken(),
          adminID: adminExist._id.toString(),
          adminName: adminExist.name,
          role: adminExist.role,
        });
      }
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await studentExist.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    res.status(200).json({
      msg: "Student logged in successfully!",
      token: await studentExist.generateToken(),
      studentID: studentExist._id.toString(),
      studentName: studentExist.name,
      rollno: studentExist.rollno,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Internal Server Error!", error });
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
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use true for port 465, false for port 587
    auth: {
      user: process.env.SMTPUser,
      pass: process.env.SMTPPassword,
    },
  });

  try {
    // const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const otp = generateOtp();

    // OTP expiry (5 minutes)
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, { otp, expiresAt });

    console.log("Generated OTP:", otp); // for debugging

    const info = await transporter.sendMail({
      from: '"Yachika@JMIETI"<kambojyartik@gmail.com>',
      to: email,
      subject: "Hello from Yachika Team.",
      text: "Here is your OTP for verification.", // Plain-text version of the message
      html: `
              <h3>Hi ${name} 👋</h3>
              <p>Use the following one-time password (OTP) for verification of your Yachika@JMIETI account.</p>
              <h2 style="color:#1a4cff;">${otp}</h2>
              <p>This OTP is valid for 5 minutes only.</p>
              <p>This mail is sent to: ${email}</p><br>
              <p>If you did not request this, please ignore this email.</p><br>
              <p>Regards,</p>
              <p>Yachika@JMIETI Team</P>
            `,
    });
    console.log("Message sent:", info.messageId);

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

    const storedOtpData = otpStore.get(email);

    if (!storedOtpData) {
      return res.status(400).json({ msg: "OTP not found or expired" });
    }

    if (Date.now() > storedOtpData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    otpStore.delete(email);

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


export { home, signup, login, user, contactUs, getNotifications, sendOtpToMail, verifyOtp, forgetPassword };
