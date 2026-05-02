import React, { useState, useEffect } from "react";
import "./FAQ.css";

const faqData = [
  {
    id: "faq1",
    question: "How do I submit a complaint?",
    answer: "Simply create an account using your institutional email, verify it via the secure OTP process, log in, and use the submission form. You can categorize your issue for direct routing and choose to submit anonymously if needed."
  },
  {
    id: "faq2",
    question: "How long does resolution take?",
    answer: "Resolution times depend on the specific category and its strict Service Level Agreement deadline. If the assigned administrator fails to resolve your issue within the mandated timeframe, the system automatically escalates your ticket to higher administration for immediate intervention."
  },
  {
    id: "faq3",
    question: "Can I track my complaint status?",
    answer: "Yes. Your dashboard provides a real time timeline and audit trail for every complaint except the anonymous ones. You will also receive asynchronous push notifications the exact moment an administrator updates the status of your ticket."
  },
  {
    id: "faq4",
    question: "Is my information secure?",
    answer: "Absolutely. The platform utilizes enterprise grade cryptographic hashing to protect your credentials and strict role based access control to ensure only authorized staff can view your submissions."
  },
  {
    id: "faq5",
    question: "How does the anonymous feature actually work?",
    answer: "When you toggle the anonymous option, the backend explicitly strips your personal identifiers before routing the ticket to the administrator. Your identity is completely hidden to prevent academic retaliation. However, higher administration retains emergency override authority strictly for cases of severe platform abuse."
  },
  {
    id: "faq6",
    question: "What happens after my complaint is marked as resolved?",
    answer: "Once an administrator marks your complaint as resolved, the system triggers a mandatory feedback form. You will provide a rating and comments regarding the handling of your issue. This data is pushed directly to the SuperAdmin dashboard to track departmental efficiency and student satisfaction."
  },
  {
    id: "faq7",
    question: "Who sees my complaint after I submit it?",
    answer: "All submitted complaints are securely routed directly to the centralized Admin dashboard. The core institutional administrative team reviews every submission from this central queue and ensures your issue is processed and resolved efficiently."
  },
  {
    id: "faq8",
    question: "What kind of details should I include to make my complaint effective?",
    answer: "Be as specific as possible utilizing text. Currently, the system does not support multimedia attachments like photos. Clearly state the exact location, the subject, and the factual details of the situation to help administrators resolve the issue efficiently."
  },
  {
    id: "faq9",
    question: "What happens if a complaint is ignored by the department?",
    answer: "Our system features automated deadline enforcement. If a departmental administrator neglects a pending ticket, background scripts will automatically strip their access and escalate the issue directly to the SuperAdmin queue for a top down resolution."
  },
  {
    id: "faq10",
    question: "What is the exact role of the SuperAdmin?",
    answer: "The SuperAdmin represents senior institutional leadership. They monitor platform efficiency, review automatically escalated/reported tickets, manage administrative accounts, and hold the absolute authority to intervene in stalled departmental issues."
  },
  {
    id: "faq11",
    question: "Is there a penalty for submitting false or spam complaints?",
    answer: "Yes. Submitting abusive or spam complaints violates platform policies and the institutional code of conduct. The SuperAdmin holds overarching authority to issue temporary or permanent account suspensions. Furthermore, severe or malicious misuse of the system may be escalated to the disciplinary committee, resulting in formal institutional penalties. If suspended, you will lose primary access and must route an explanation through the secure Appeals Portal for review."  }
];

function AuroraFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="aurora-faq-section" id="faqs">
      {/* The new animated background elements */}
      <div className="aurora-bg">
        <div className="aurora-shape aurora-shape1"></div>
        <div className="aurora-shape aurora-shape2"></div>
        <div className="aurora-shape aurora-shape3"></div>
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="texts mx-auto">
          <h6 className="display-6 heading fw-bold text-center">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h6>
          <p
            className="fs-6 fw-light mb-5 text-center mx-auto text-muted"
          >
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
                key={item.id}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className={`accordion-header ${openIndex ===index ?" rounded-top-4":"rounded-4 "}`}>
                  <span className="question-text text-start">{index+1}. {item.question}</span>
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
