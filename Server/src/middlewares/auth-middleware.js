import jwt from "jsonwebtoken";
import student from "../Modals/Students-modal.js";
import admin from "../Modals/Admins-modals.js";

const authMiddleware = async(req, res, next) => {
  try {
    // Read the JWT from the HttpOnly secure cookie set by the server.
    // The cookie name uses the __Host- prefix for maximum security.
    // Note: The __Host- prefix cannot be set on localhost (no HTTPS), so we
    // also accept 'authToken' as a fallback for development environments.
    const token = req.cookies["__Host-authToken"] || req.cookies["authToken"];

    if (!token) {
      return res.status(401).json({ msg: "No token provided. Please log in." });
    }

    // Cryptographically verify the token. Hardcode 'HS256' to prevent algorithm confusion attacks.
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ["HS256"] });

    const userData = await student.findOne({ email: isVerified.email }).select({
      password: 0, // Exclude password field
    }) || await admin.findOne({ email: isVerified.email }).select({ password: 0 });

    if (!userData) {
      return res.status(401).json({ msg: "User not found." });
    }

    req.user = userData; // attach user data to request object
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (err) {
    // Fail closed — deny access on any error
    return res.status(401).json({ msg: "Invalid or expired session. Please log in again." });
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
