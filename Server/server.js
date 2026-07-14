import 'dotenv/config';

import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth-router.js";
import router from "./src/routes/complaint-router.js";
import adminRoute from "./src/routes/admin-router.js";
import cors from "cors";
import { connectDB } from "./src/db/connection.js";
import errorMiddleware from "./src/middlewares/error-middleware.js";
import { AutoEscalationOfComplaints } from'./src/utility/cronJobs.js'

const app = express();

const corsOptions = {
    origin: process.env.FRONT_END_URL,
    methods: ["GET","POST","PUT","DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true, // Required for cookies to be sent cross-origin
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Required to read req.cookies

// Security headers
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/complaints", router);
app.use("/api/admin", adminRoute);


app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

AutoEscalationOfComplaints();

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to DB. Server not started.", err);
});