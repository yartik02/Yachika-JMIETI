import dotenv from "dotenv";
dotenv.config({path: './.env'});
import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
    try {
        const isAdminMail =
          req.user.email === process.env.AdminMail ||
          req.user.email === process.env.SuperAdminMail
            ? true
            : false; ;
        // console.log(isAdminMail);
        if(!isAdminMail){
            return res.status(403).json({msg: "Access Denied! You are not an admin!"});
        }

        next();
    } catch (error) {
        next(error);
    }

}

const verifyAdminToken = (req, res, next) => {
    try {
        // 1. Extract the token from the HttpOnly secure cookie.
        // Falls back to 'authToken' for development (HTTP/localhost).
        const token = req.cookies["__Host-authToken"] || req.cookies["authToken"];

        if (!token) {
            return res.status(401).json({ msg: "Access Denied! No session found. Please log in." });
        }

        // 2. Cryptographically verify the token.
        // Hardcode 'HS256' to prevent algorithm confusion attacks.
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ["HS256"] });

        // 3. Ensure the decoded payload contains the email
        if (!decoded || !decoded.email) {
            return res.status(401).json({ msg: "Unauthorized! Invalid token structure." });
        }

        const userEmail = decoded.email;
        const adminEmail = process.env.AdminMail;
        const superAdminEmail = process.env.SuperAdminMail;

        // 4. Create the req.user object and assign the strict role
        req.user = { email: userEmail };

        if (userEmail === adminEmail) {
            req.user.role = 'admin';
        }
        else if (userEmail === superAdminEmail) {
            req.user.role = 'SuperAdmin';
        } else {
            // Reject anyone who holds a valid token but isn't one of the two admins
            return res.status(403).json({ msg: "Access Denied! You do not have admin privileges." });
        }

        // 5. Token is valid and role is verified. Pass control to the controller.
        next();
        
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        
        // Handle specific JWT errors cleanly
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Session expired. Please log in again." });
        }
        
        return res.status(401).json({ msg: "Unauthorized! Token verification failed." });
    }
};

export {adminMiddleware, verifyAdminToken};