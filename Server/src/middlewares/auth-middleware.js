import jwt from "jsonwebtoken";
import student from "../Modals/Students-modal.js";
import admin from "../Modals/Admins-modals.js";

const authMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }
    
    const token = authHeader.replace("Bearer ", "");
    
    
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("Data after verification of token is: \n",isVerified);
    const userData = await student.findOne({ email: isVerified.email }).select({
      password: 0, // Exclude password field
    })|| await admin.findOne({ email: isVerified.email }).select({ password: 0 });
    
    req.user = userData; // attach user data to request object
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token", error: err });
  }
};

const checkNotSuspended = async (req, res, next) => {

  const {email} =req.body;
  
  try {
    // Assuming your verifyToken middleware has already attached the user to req.user
    const studentData = await student.findOne({ email }).select({
      password: 0,
    })
    const adminData= await admin.findOne({ email }).select({ password: 0 });

    if (studentData && studentData.suspensionDetails && studentData.isSuspended) {
      return res.status(403).json({ 
        message: "Your account is suspended. You cannot perform this action.",
        isSuspended: true
      });
    }
    next(); // Not suspended, let them through
  } catch (error) {
    res.status(500).json({ message: "Server error checking suspension status." });
  }
};

export { authMiddleware, checkNotSuspended };
