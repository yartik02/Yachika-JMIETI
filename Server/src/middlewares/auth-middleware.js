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
    
    
    // console.log("Auth Header:", token);
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("Data after verification of token is: \n",isVerified);
    const userData = await student.findOne({ email: isVerified.email }).select({
      password: 0, // Exclude password field
    })|| await admin.findOne({ email: isVerified.email }).select({ password: 0 });
    // console.log("userData from auth middleware: ", userData);
    
    req.user = userData; // attach user data to request object
    req.token = token;
    req.userId = userData._id;

    // req.student = { _id: decoded.id }; // attach student id
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token", error: err });
  }
};

export { authMiddleware };
