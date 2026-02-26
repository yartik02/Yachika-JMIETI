import dotenv from "dotenv";
dotenv.config({path: './.env'});

import express from "express";
import authRouter from "./src/routes/auth-router.js";
import router from "./src/routes/complaint-router.js";
import adminRoute from "./src/routes/admin-router.js";
import cors from "cors";
import { connectDB } from "./src/db/connection.js";
import errorMiddleware from "./src/middlewares/error-middleware.js";

const app = express();

// ... (rest of your cors and middleware code is perfect) ...
const corsOptions = {
    origin:"*",
    methods: ["GET","POST","PUT","DELETE", "PATCH", "HEAD"],
    credentials:true,
}
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/complaints", router);
//define admin route
app.use("/api/admin", adminRoute);


app.use(errorMiddleware);

const PORT = process.env.PORT || 4000; // It's safer to have a fallback

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to DB. Server not started.", err);
});