import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import './FeedbackForm.css';
import { toast } from 'react-toastify';

// This form takes the 'complaintId' as a prop
const FeedbackForm = ({ complaintId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0); // For the star hover effect
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(""); // To show "Thank you!"
    const { token, refetchComplaints } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a star rating before submitting.");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:5000/api/admin/feedbackForm/${complaintId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating: rating,
                    feedback: feedback
                })
            });

            if (response.ok) {
                toast.success("Thank you for your feedback!");
                refetchComplaints();
            } else {
                toast.error("Couldn't submit feedback. Please try again.");
            }
        
        } catch (error) {
            console.error("Feedback submission error:", error);
            toast.error("Couldn't connect to the server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (message) {
        return (
            <div className={`alert ${message.includes("Error") ? 'alert-danger' : 'alert-success'} mt-3`}>
                {message}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-2">
                <span className="fw-semibold me-3">Rate the Results:</span>
                <div className="star-rating d-inline-block">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const isStarOn = ratingValue <= (hover || rating);
            
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    className={isStarOn ? "star-on" : "star-off"}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${ratingValue} out of 5 stars`}
                  >
                    {isStarOn ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.16-.888.282-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            </div>

            <div className="mb-3">
                <label htmlFor={`feedback-${complaintId}`} className="form-label fw-semibold">Share your experience:</label>
                <textarea
                    className="form-control"
                    id={`feedback-${complaintId}`}
                    rows="3"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what we did well or what we can improve..."
                ></textarea>
            </div>

            <button type="submit" className="btn btn-sm btn-success" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
        </form>
    );
};

export default FeedbackForm;