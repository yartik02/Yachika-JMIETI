import cron from "node-cron";
import { Complaint } from "../Modals/Complaint-modal.js";
import { NotificationMsg } from "../Modals/Notification-modals.js";

export const AutoEscalationOfComplaints = () => {
  // This cron string means: "Run at 00:00 (midnight) every single day"
  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily complaint escalation check...");

    try {
      // 1. Calculate the exact time 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // 2. Find the overdue complaints (Pending/Progress) that aren't forwarded yet
      const overdueComplaints = await Complaint.find({
        createdAt: { $lte: sevenDaysAgo },
        status: { $nin: ["Resolved", "Rejected"] },
        isReported: false,
      });

      // If nothing is overdue, stop here.
      if (overdueComplaints.length === 0) {
        console.log("No complaints needed escalation to SuperAdmin today.");
        return;
      }
      console.log("overdue Complaints are:", overdueComplaints);

      // 3. Prepare the arrays for Bulk Operations
      const complaintIds = [];
      const notificationsToCreate = [];

      for (const complaint of overdueComplaints) {
        // Save ID for updating the complaint later
        complaintIds.push(complaint._id);

        // Build the notification EXACTLY matching your NotificationSchema
        notificationsToCreate.push({
          rollno: complaint.createdByRollno, 
          message: "Update: Your complaint has been pending for 7 days and has been automatically escalated to the Super Admin for review.",
          complaintTitle: complaint.complaintTitle,
          complaintPriority: complaint.priority,       
          complaintCategory: complaint.category,       
          complaintSubCategory: complaint.subCategory,
          complaintCreatedAt: complaint.createdAt,    
          complaintId: complaint._id,                 
          isRead: false
        });
      }

      // 4. Execute the bulk operations simultaneously (Super Fast)
      
      // A. Insert all notifications in one go
      await NotificationMsg.insertMany(notificationsToCreate);

      // B. Update all overdue complaints in one go
      await Complaint.updateMany(
        { _id: { $in: complaintIds } },
        { 
          $set: { 
            isUnResolved: true
          } 
        }
      );

      console.log(`Successfully escalated ${complaintIds.length} complaints to SuperAdmin and notified students.`);

    } catch (error) {
      console.error("Critical error in escalation cron job:", error);
    }
  });
};
