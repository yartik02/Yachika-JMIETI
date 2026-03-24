import React, { useState, useEffect } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How do I submit a complaint?",
    answer:
      "Simply create an account, log in, and use our complaint submission form. You can choose to submit anonymously if needed.",
  },
  {
    question: "How long does resolution take?",
    answer:
      "Most complaints are resolved within 2-5 working days or depending on complexity. You'll receive regular updates throughout the process.",
  },
  {
    question: "Can I track my complaint status?",
    answer:
      "Yes! Your dashboard shows real-time status updates, and you'll receive notifications whenever there are changes in your notifications tab.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Absolutely. We use industry-standard security measures and offer anonymous submission options to protect your privacy.",
  },
  {
    question: "How does the 'anonymous' feature actually work?",
    answer:
      "When you submit a complaint anonymously, the system completely hides your personal details (name, roll no., email) from all admins and faculty. Your identity is encrypted and fully dissociated from the complaint itself, ensuring your privacy for sensitive issues.",
  },
  {
    question: "What if my complaint is closed but the issue is not resolved?",
    answer:
      "Once an admin marks your complaint as 'Resolved,' you will be prompted to provide feedback on the outcome. This includes giving a rating (e.g., Satisfied or Unsatisfied) and adding comments. If you are not happy with the result and give a poor rating, the complaint will be automatically re-opened and sent for further review. This ensures your voice is heard and the issue is genuinely fixed to your satisfaction.",
  },
  {
    question: "Who sees my complaint after I submit it?",
    answer:
      "It depends on the category. Hostel-related complaints are routed directly to the designated Warden. All other complaints (Infrastructure, Academics) are managed by the central Admin team, who then assign them to the relevant department for action.",
  },
  {
    question:
      "What kind of details should I include to make my complaint effective?",
    answer:
      "Be as specific as possible. For infrastructure issues, include the exact location (e.g., 'Room 304, Hostel B, broken window latch'). For academic issues, mention the course/subject and describe the situation factually. Clear details help us resolve your issue much faster.",
  },
  {
    question: "Can I submit a complaint on behalf of someone else?",
    answer:
      "We recommend that the person facing the issue submit the complaint themselves for clear communication and tracking. However, if you are reporting a general issue affecting a group (e.g., 'No water in C-Block'), you can state that in the description.",
  },
  {
    question: "Is there a limit to how many complaints I can submit?",
    answer:
      "There is no limit on submitting genuine complaints. However, we encourage you to check if a similar issue has already been reported. Please use the platform responsibly, as spamming or submitting frivolous complaints may lead to account review.",
  },
];

function AuroraFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="aurora-faq-section" id="faqs">
      {/* The new animated background elements */}
      <div className="aurora-bg">
        <div className="aurora-shape aurora-shape1"></div>
        <div className="aurora-shape aurora-shape2"></div>
        <div className="aurora-shape aurora-shape3"></div>
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5">
          <h3 className="faq-heading mb-3">Frequently Asked Questions</h3>
          <p className="faq-subheading mb-5 mx-auto text-muted">
            Quick answers to common questions
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {faqData.map((item, index) => (
              <div
                className={`accordion-item rounded-4 ${
                  openIndex === index ? "active" : ""
                }`}
                key={index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className={`accordion-header ${openIndex ===index ?" rounded-top-4":"rounded-4 "}`}>
                  <span className="question-text text-start">{item.question}</span>
                  <div className="accordion-icon">
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="#4F46E5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className="accordion-collapse"
                  style={{ maxHeight: openIndex === index ? "300px" : "0" }}
                >
                  <div className="accordion-body text-start">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuroraFaq;
