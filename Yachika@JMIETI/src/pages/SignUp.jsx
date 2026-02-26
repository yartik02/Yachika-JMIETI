import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/YachikaLogo.png";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth.jsx";
import "react-toastify/dist/ReactToastify.css";
import '../components/CompliantSorting.css'

function Signup() {
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();
  
      const dropdownContainerRef = useRef(null);

  useEffect(() => {
          const handleClickOutside = (event) => {
              if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
                  setOpenDropdown(null);
              }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, []);

  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    className: "",
    branch: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dropdown = [
    {name:"Branch" ,value:"branch", options:["Computer Science & Engineering", "Civil Engineering", "Artificial Intelligence & Machine Learning", "Bachelor of Computer Applications"]},
    {name: "Year",value:"className", options: ["1st Year", "2nd Year", "3rd Year", "4th Year"]},
  ]

  // Data for dropdowns and dynamic fields (this is a great pattern!)
  // const branches = ["CSE [Computer Science & Engineering]", "CE [Civil Engineering]", "AIML [Artificial Intelligence & Machine Learning]", "BCA[Bachelor of Computer Applications]"];
  // const Classes = ["Btech 1st Year", "Btech 2nd Year", "Btech 3rd Year", "Btech 4th Year", "BCA 1st Year", "BCA 2nd Year", "BCA 3rd Year"];
  const genders = ["Male", "Female", "Other"];
  const inputFields = [
    { label: "Name", type: "text", name: "name", placeholder: "Enter your full name" },
    { label: "Roll No", type: "text", name: "rollno", placeholder: "Enter your Roll Number" },
    { label: "College Email", type: "email", name: "email", placeholder: "Enter College Email" },
    { label: "Password", type: "password", name: "password", placeholder: "Create Password" },
    { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "Confirm Password" },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const [filters, setFilters] = useState({
          Year: "Select Year",
          Branch: "Select Branch"
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleToggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelectOption = (name, option) => {
  setFilters(prev => ({ ...prev, [name]: option }));

  // Also update formData for submission
  if (name === "Year") {
    setFormData(prev => ({ ...prev, className: option }));
  } else if (name === "Branch") {
    setFormData(prev => ({ ...prev, branch: option }));
  }

  setOpenDropdown(null);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if the form is empty
    if (!formData.name || !formData.rollno || !formData.className || !formData.branch || !formData.gender || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Oops! Something’s missing — please fill all fields 🐣");
      return; // Stop the function here
    }

    // Don't reload the page, as it clears all user input. Just show an error.
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return; // Stop the function here
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return; // Stop the function here
    }

    if(formData.branch ==="Bachelor of Computer Applications"&& formData.className === "4th Year"){
      toast.error("BCA 4th Year is not a valid class!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          rollno: formData.rollno,
          className: formData.className,
          branch: formData.branch,
          gender: formData.gender,
          email: formData.email,
          password: formData.password,
        }),
      });

      // console.log(response);
      
      if (response.ok) {
        const res_Data = await response.json(); // Parse success data
        storeTokenInLocalStorage(res_Data.token); // Store the token

        setFormData({
            name: "", rollno: "", className: "", branch: "",
            gender: "", email: "", password: "", confirmPassword: "",
        });

        toast.success("Sign up is complete, now sign in!", { autoClose: 2000 });
        navigate("/login");
      } else {
        // If the response was not ok, parse the error message from the body.
        const errorData = await response.json();
        toast.error(errorData.msg || "Sign up failed. Please check your details.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error("Sign up failed. A network error occurred.");
    }
  };

  return (
    <div className="login row m-0" style={{ width: "100vw", minHeight: "100vh" }}>
      {/* Left Section */}
      <div className="col-md-6 py-5 d-flex align-items-center justify-content-center p-4 position-relative" style={{ backgroundColor: "#1a267dd5" }}>
        <button onClick={() => navigate(-1)} className="rounded-5 position-absolute top-0 start-0 m-3" style={{ backgroundColor: "transparent", border: "none" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
        </button>
        <div className="d-flex align-items-center topxtra">
          <div className="text-white logo ms-3 p-4 rounded-3 fs-3 d-flex justify-content-center align-items-center">
            <p className="m-0"><img src={logo} alt="Yachika Logo" width={75} /></p>
          </div>
          <div className="ms-4">
            <p className="text-white mb-1 fs-3 fw-bold text-start">Yachika@JMIETI</p>
            <p className="text-white text-start mb-0">Raising Concerns Made Easy, Because Every Issue Matters.</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-md-6 d-flex justify-content-center align-items-center p-lg-5 p-md-5 p-sm-5">
        <div className="border rounded-3 p-4 my-5 shadow-lg w-100" style={{ background: "#fff" }}>
          <form onSubmit={handleSubmit} method="POST" className="w-100" autoComplete="off">
            <p className="fs-4 fw-bold mb-1">Sign-up</p>
            <p className="text-muted mb-3">Signup and become a member now!</p>

            {/* Dynamically render input fields */}
            {inputFields.map((data, idx) => (
              <div key={idx} className="mb-3 text-start">
                <input
                  id={data.name}
                  type={data.type}
                  placeholder={data.placeholder}
                  name={data.name}
                  value={formData[data.name]}
                  onChange={handleChange}
                  // required
                  className="form-control"
                />
              </div>
            ))}

            {/* Gender radio buttons */}
            <div className="mb-3 text-start">
              <label>Gender:</label>
              {genders.map((option, idx) => (
                <div key={idx} className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    id={`gender${idx}`}
                    checked={formData.gender === option}
                    onChange={handleChange}
                    className="form-check-input"
                    // required
                  />
                  <label className="form-check-label gender-label" htmlFor={`gender${idx}`}>{option}</label>
                </div>
              ))}
            </div>

            <div className="dropdowns" ref={dropdownContainerRef}>
            {dropdown.map((dropdown) => {
                const isOpen = openDropdown === dropdown.name;
                const selectedValue = filters[dropdown.name]; // Get the currently selected value for this dropdown

                return (
                    <div className="text-start" key={dropdown.name}>
                        <div
                            className="p-2 ps-3 selects border rounded-3 d-flex justify-content-between align-items-center position-relative mb-3"
                            role="button"
                            onClick={() => handleToggleDropdown(dropdown.name)}
                            aria-expanded={isOpen}
                            name={dropdown.value}
                            value={selectedValue}
                            onChange={handleChange}
                            aria-haspopup="listbox"
                        >
                            {selectedValue} {/* Display the selected value */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-down dropdown-arrow ${isOpen ? 'open' : ''}`} viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>

                            {isOpen && (
                                <div className="border menus mt-1 p-2 rounded-3 bg-white position-absolute">
                                    {dropdown.options.map((option) => (
                                        <p
                                            key={option}
                                            // Conditionally apply 'selected-option' class if this option matches the selectedValue
                                            className={`m-0 p-2 rounded-3 dropdown-option ${option === selectedValue ? 'selected-option' : ''}`}
                                            onClick={() => handleSelectOption(dropdown.name, option)}
                                        >
                                            {option}
                                            {option === selectedValue && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check ms-2 bg-success border border-success bg-opacity-10 rounded-circle" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                </svg>
                                            )}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
             })}
            </div>

            <div className="text-center">
              <button type="submit" className="login_btn p-2 rounded-2 w-100 px-4 mt-1">
                Sign Up
              </button>
            </div>
            <p className="text-center mt-3">
              Already have an account?&nbsp;<Link to="/login" className="xtraText">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
