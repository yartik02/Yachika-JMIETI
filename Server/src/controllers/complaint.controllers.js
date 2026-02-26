import { Complaint } from "../Modals/Complaint-modal.js";


const complaintSubmission = async (req, res) => {
    // console.log("in complaint submission controller");
    
    // Destructure only the fields you want from req.body
    const {
        complaintTitle,
        complaintBody,
        category,
        subCategory,
        priority,
        rating,
        feedback,
        isAnonymous,
        createdByName, // Add fields you expect
        createdByRollno,
        createdByEmail,
        createdByClass,
        createdByBranch
    } = req.body;
    
    // console.log("About to insert:", {
    //         complaintTitle,
    //         complaintBody,
    //         createdByEmail,
    //         category,
    //         subCategory,
    //         priority,
    //         rating,
    //         feedback,
    //         isAnonymous,
    //         createdByName,
    //         createdByRollno,
    //         createdByClass,
    //         createdByBranch
    //     });

    try {
        // const student = req.student;
        // const complaint = req.body;
        await Complaint.create({
            complaintTitle,
            complaintBody,
            createdByEmail,
            category,
            subCategory,
            priority,
            rating,
            feedback,
            isAnonymous,
            createdByName,
            createdByRollno,
            createdByClass,
            createdByBranch
        });

        // console.log("Complaint data:", req.body);
        
        return res.status(200).json({ msg: "Complaint submitted successfully!" });
    } catch (error) {
        return res.status(500).json({ msg: "complaint submission failed", error: error.message });
    }
}

export { complaintSubmission };