import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth.jsx";
import backImage from "../assets/backgroundImageComplaintForm.png";
import "./CompliantForm.css";
import { Error } from "../pages/Error.jsx";
import { useTheme } from "../utils/useTheme.jsx";

const subCategoryMap = {
  Infrastructure: [
    "Plumbing",
    "Electrical",
    "Furniture",
    "Cleanliness",
    "Safety",
    "HVAC",
  ],
  Services: [
    "Internet",
    "Cafeteria",
    "Library",
    "Transport",
    "Medical",
    "Security",
  ],
  Faculty: ["Teaching", "Behaviour", "Attendance", "Grading", "Availability"],
  Student: [
    "Misbehavior or Rude Conduct",
    "Discrimination",
    "Intimidation or Threat",
    "Harassment or Bullying",
    "Ragging",
    "Cyber Misconduct (Social Media Issues)",
    "Other Student-Related Issue",
  ],
  Hostel: [
    "Warden",
    "Maintenance",
    "Food Quality",
    "Room Allocation",
    "Cleanliness",
    "Safety",
    "Harassment or Bullying",
    "Ragging",
    "Cyber Misconduct (Social Media Issues)",
    "Other Student-Related Issue",
  ],
  Other: ["General", "Feedback", "Suggestion"],
};

// --- OPTIMIZATION: Moved static constants outside the component ---
const categoryOptions = Object.keys(subCategoryMap);
const priorityOptions = ["Low", "Medium", "High"];

function ComplaintForm() {
  const { user, token, refetchComplaints } = useAuth();
  const { theme } = useTheme();
  if (!user || !token) {
    return <Error />;
  }

  const [formData, setFormData] = useState({
    createdByName: "",
    createdByRollno: "",
    createdByClass: "",
    createdByBranch: "",
    createdByEmail: "",
    complaintTitle: "",
    complaintBody: "",
    category: "",
    subCategory: "",
    priority: "",
    isAnonymous: false,
  });
  const navigate = useNavigate(); // --- DROPDOWN LOGIC ---

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownContainerRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains(event.target)
    ) {
      setOpenDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggleDropdown = useCallback((name) => {
    setOpenDropdown((prevOpen) => (prevOpen === name ? null : name));
  }, []);

  const handleSelectOption = useCallback((name, option) => {
    setFormData((prev) => {
      if (name === "category") {
        return {
          ...prev,
          category: option,
          subCategory: "",
        };
      }
      return {
        ...prev,
        [name]: option,
      };
    });
    setOpenDropdown(null); // Close dropdown after selection
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        createdByName: user.name,
        createdByRollno: user.rollno,
        createdByClass: user.className,
        createdByBranch: user.branch,
        createdByEmail: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const goOutside = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.complaintTitle ||
      !formData.complaintBody ||
      !formData.category ||
      !formData.subCategory ||
      !formData.priority
    ) {
      toast.error("Fill all the form fields!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to submit a complaint.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints/complaint-Submission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        toast.success("Complaint submitted successfully!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
        setFormData({
          complaintTitle: "",
          complaintBody: "",
          category: "",
          subCategory: "",
          priority: "",
          isAnonymous: false,
          createdByName: user ? user.name : "",
          createdByRollno: user ? user.rollno : "",
          createdByClass: user ? user.className : "",
          createdByBranch: user ? user.branch : "",
          createdByEmail: user ? user.email : "",
        });
        await refetchComplaints();
        setTimeout(() => {
          goOutside();
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to submit complaint.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
        console.error("Server responded with an error:", errorData);
      }
    } catch (error) {
      console.error("Error while submitting complaint: ", error);
      toast.error("Can’t reach the server!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
    }
  };

  const availableSubcategories = useMemo(() => {
    return subCategoryMap[formData.category] || [];
  }, [formData.category]);

  const renderDropdown = ({
    name,
    options,
    value,
    placeholder,
    disabled = false,
  }) => {
    const isOpen = openDropdown === name;
    const displayValue = value || (
      <span className="opacity-75">{placeholder}</span>
    );

    return (
      <div
        className={`p-2 ps-3 selects rounded-3 d-flex justify-content-between align-items-center position-relative ${disabled ? "disabled" : ""}`}
        role="button"
        onClick={disabled ? null : () => handleToggleDropdown(name)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        style={{ minHeight: "38px", cursor: disabled ? "not-allowed" : "pointer", color: "var(--text-primary)", border: `1px solid ${theme === 'light' ? 'var(--text-primary)' : 'var(--light-hover)'}` }}
      >
        {displayValue}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`bi bi-chevron-down dropdown-arrow ${isOpen ? "open" : ""}`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
        {isOpen && (
          <div className="menus mt-1 p-2 rounded-3 position-absolute" style={{backgroundColor: "var(--bg-surface)", border: "1px solid var(--light-hover)"}}>
            {options.map((option) => (
              <p
                key={option}
                className={`m-0 p-2 rounded-3 dropdown-option ${option === value ? "selected-option" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectOption(name, option);
                }}
              >
                {option}
                {option === value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="green"
                    className="bi bi-check ms-2 border border-success rounded-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                  </svg>
                )}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="py-5 complaintForm mesh-container"
      // style={{ backgroundImage: `url(${backImage})`, backgroundSize: "cover" }}
    >
      {/* Animated Background Elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="px-5 position-relative">
        <button
          onClick={() => navigate(-1)}
          className="rounded-5 position-absolute top-0 start-0 mx-5"
          style={{ backgroundColor: "transparent", border: "none"}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="var(--accent-primary)"
            className="bi bi-arrow-left back"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0.708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
      </div>
      <div className="card backImg shadow-lg mx-auto text-start my-5 glass-panel">
        <div
          className="card-header p-3 rounded-3 text-white"
          style={{ backgroundColor: "var(--accent-primary)" }}
        >
          <h2 className="mb-0 text-center header">Submit a New Complaint</h2>
        </div>
        <div className="card-body" style={{ color: "var(--text-primary)" }}>
          <form onSubmit={handleSubmit} autoComplete="false">
            <div className="mb-3">
              <input
                type="text"
                className="form-control formText"
                placeholder="Complaint Title"
                id="complaintTitle"
                name="complaintTitle"
                value={formData.complaintTitle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control formText"
                id="complaintBody"
                name="complaintBody"
                placeholder="Describe your issue in detail..."
                rows="4"
                value={formData.complaintBody}
                onChange={handleChange}
              ></textarea>
            </div>
            <div ref={dropdownContainerRef}>
              <div className="row formText">
                <div className="col-md-6 mb-3">
                  {renderDropdown({
                    name: "category",
                    options: categoryOptions,
                    value: formData.category,
                    placeholder: "Select a category...",
                  })}
                </div>
                <div className="col-md-6 mb-3">
                  {renderDropdown({
                    name: "subCategory",
                    options: availableSubcategories,
                    value: formData.subCategory,
                    placeholder: "Select a sub-category...",
                    disabled: !formData.category,
                  })}
                </div>
              </div>

              <div className="mb-3 formText">
                {renderDropdown({
                  name: "priority",
                  options: priorityOptions,
                  value: formData.priority,
                  placeholder: "Select a priority...",
                })}
              </div>
            </div>

            <div className="form-check check mb-4 formText">
              <input
                className="form-check-input mt-2"
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
              />

              <label
                className="form-check-label ms-2 mt-2"
                htmlFor="isAnonymous"
                title="For sensitive issues"
              >
                Submit Anonymously
              </label>
            </div>

            <button type="submit" className="py-2 rounded-3 login_btn w-100 formText btn-click-animation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                width="18"
                height="18"
                className="bi bi-send me-2"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"></path>
              </svg>
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;