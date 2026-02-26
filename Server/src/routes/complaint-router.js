import express from "express";
const router = express.Router();
import {complaintSubmission} from "../controllers/complaint.controllers.js"
import {authMiddleware} from "../middlewares/auth-middleware.js";

router.route('/complaint-Submission').post(authMiddleware, complaintSubmission);

export default router;