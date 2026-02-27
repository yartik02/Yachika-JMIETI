import { useState } from 'react';
import './PrivacyPolicies.css';
import { PolicySection, InfoCard, UsageStep, InfoListItem, PolicyAlert } from './PolicySectionCompos';
import { useNavigate } from "react-router-dom"

function PrivacyPolicy() {

const [openDropdown, setOpenDropdown] = useState(null);
const [selectedValue, setSelectedValue] = useState("Go to Section");
  const navigate = useNavigate();
  const sections = [
  { id: "section-1", title: "Information We Collect" },
  { id: "section-2", title: "How We Use Information" },
  { id: "section-3", title: "Anonymity & Transparency" },
  { id: "section-4", title: "Data Storage & Security" },
  { id: "section-5", title: "User Rights" },
  { id: "section-6", title: "Cookies & Analytics" },
  { id: "section-7", title: "Third-Party Access" },
  { id: "section-8", title: "Public Access" },
  { id: "section-9", title: "Policy Updates" },
  { id: "section-10", title: "Contact Us" },
];

  const isOpen = openDropdown === "Go to Section";
  const handleToggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div id='PPs' className="PrivacyPolicies py-5 border position-relative" style={{width:"100vw"}}>

        <button onClick={() => navigate(-1)} className="rounded-5 backBtn" >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#1a2786ff" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
        </button>
      
      <span className="badge bg-primary bg-opacity-10 fw-normal align-self-start mb-1 mb-lg-4 p-2 px-3 rounded-pill fs-6" style={{color:"#2648c2ff"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shield-shaded me-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
        </svg>
        Privacy Policies
      </span>
      <div className="row mt-3 m-5">
        
        {/* --- 1. Sticky Navigation Column --- */}
        <div className="col-lg-3 p-0 sectionBig">
          <div className="sticky-top text-start m-0 py-4 rounded-2" style={{backgroundColor:"#090f3d",top: '6rem',  width: '100%',zIndex:"3", boxShadow:"rgb(0 0 0 / 41%) 0px 0px 50px", height:"fit-content" }}>
            <h4 className="fw-light text-light mb-0 px-3 fs-2">Sections</h4>
            <nav className="flex-column my-4 border-start ps-0 py-1 px-4 ms-lg-4 ms-md-2 bg-transparent text-white" style={{width:"fit-content", boxShadow:"none"}}>
              {sections.map((section) => (
                <a
                  key={section.id}
                  className="nav-link text-white m-0 p-3"
                  href={`#${section.id}`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

{
  <div className="goToSectionDropdown text-start fw-light position-relative mb-3 p-0" style={{fontSize:"0.8rem"}}>
    <div
      className="p-2 ps-3 selects rounded-3 m-0 text-white d-flex justify-content-between align-items-center"
      role="button"
      onClick={() => handleToggleDropdown("Go to Section")}
      aria-expanded={isOpen}
      style={{backgroundColor:"#16206eff"}}
    >
      {selectedValue}
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
    </div>

    {isOpen && (
      <div className="menus mt-1 p-2 rounded-3 text-white position-absolute w-100" 
      style={{backgroundColor:"#16206eff", zIndex:"3", boxShadow:"rgb(0 0 0 / 58%) -1px 13px 20px 5px"}}
      >
        {sections.map((section) => (
          <p
            key={section.id}
            className="m-0 p-2 rounded-3 d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedValue(section.title);
              setOpenDropdown(null);
              document.getElementById(section.id)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {section.title}
            {section.title === selectedValue && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check ms-2 bg-white border border-white bg-opacity-10 rounded-circle" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
            )}
          </p>
        ))}
      </div>
    )}
  </div>
}


        {/* --- 2. Main Content Column ---*/}
        <div className="col-lg-9 text-start px-lg-5 mt-lg-0 mt-3">
          <div className="px-lg-4">
          {/* --- Header --- */}
          <header className="pb-3 border-bottom">
            <h1 className="display-5 fw-bold">Privacy Policy</h1>
            <p className="lead text-muted">
              Welcome to Yachika@JMIETI
            </p>
            <div className="d-flex flex-wrap gap-2">
                {/* <span className="badge text-bg-light border border-secondary-subtle">Effective: [Insert Date]</span> */}
                <span className="text-primary bg-primary bg-opacity-10 border border-primary-subtle px-2 py-1 rounded-3" style={{fontSize:"0.8rem"}}>Last Updated: 1 Nov, 2025</span>
            </div>
          </header>

          <p className="fw-light mt-4 my-3" id="section-1" style={{fontSize:"0.9rem"}}>
            Your trust and privacy are important to Yachika@JMIETI. This Privacy Policy explains how we collect, use, store, and protect your information when you use our platform.
          </p>
          
          <div className="row justify-content-center p-0 rounded-4 mt-lg-5" style={{backgroundColor:"#a8b2ff1e"}}>
        <div className="col-lg-10 col-xl-9 mt-4">

          {/* --- Section 1 (Card Grid) --- */}
          <PolicySection title="1. Information We Collect">
            <p className="text-body-secondary">
              When you sign up or use Yachika@JMIETI, we may collect the following data:
            </p>
            <div className="row mt-4" id="section-2">
              <InfoCard icon="bi bi-person-fill" title="Personal Information" variant="primary" path="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6">
                Name, Roll Number, Institutional Email ID, Department, Password, etc.
              </InfoCard>
              <InfoCard icon="bi bi-file-earmark-text-fill" title="Complaint Details" variant="info" path={"M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z"}>
                Information in the complaint form, including description, category, and optional attachments.
              </InfoCard>
              <InfoCard icon="bi bi-shield-check" title="Anonymity Preference" variant="success" path={"M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56 M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"}>
                Whether you choose to display or hide your identity in certain complaints.
              </InfoCard>
              <InfoCard icon="bi bi-laptop" title="Technical Data" variant="danger" path={"M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"}>
                Device type, browser type, and IP address (for security and analytics).
              </InfoCard>
            </div>
          </PolicySection>

          {/* --- Section 2 (Step Timeline) --- */}
          <PolicySection id="section-3" title="2. How We Use Your Information">
            <p className="text-body-secondary">We use your information to:</p>
            <div className="mt-4">
              <UsageStep number="01">
                Create and manage your Yachika@JMIETI account.
              </UsageStep>
              <UsageStep number="02">
                Facilitate complaint submission and tracking.
              </UsageStep>
              <UsageStep number="03">
                Notify the concerned departments or administrators.
              </UsageStep>
              <UsageStep number="04">
                Improve system performance and user experience.
              </UsageStep>
              <UsageStep number="05">
                Ensure transparency, accountability, and security within the institution.
              </UsageStep>
            </div>
            <p className="fw-light border border-info bg-info bg-opacity-10 p-3 mt-4 rounded-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={25} fill='#0dcaf0ff' className='border border-3 border-info rounded-circle me-3'>
              <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z"/>
              </svg>
              We do not sell, rent, or trade your information to any third party.
            </p>
          </PolicySection>

          {/* --- Section 3 --- */}
          <PolicySection id="section-4" title="3. Anonymity and Transparency">
            <p className="text-body-secondary">
              Yachika@JMIETI respects your right to privacy.
            </p>
            <PolicyAlert icon="bi bi-eye-slash-fill" title="Anonymous Complaints" variant="success" path={`m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z`}>
              When filing faculty or academic-related complaints, you can choose to remain anonymous. In such cases, your personal details are hidden even from administrators.
            </PolicyAlert>
            <PolicyAlert icon="bi bi-building-check" title="Identified Complaints" variant="info" path={"M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"}>
              For infrastructure or service-related issues, identity information may be shared with the concerned department for resolution purposes.
            </PolicyAlert>
          </PolicySection>
          
          {/* --- Section 4 --- */}
          <PolicySection id="section-5" title="4. Data Storage and Security">
            <p className="text-body-secondary">
              All user and complaint data are securely stored in MongoDB databases. We employ industry-standard security practices to:
            </p>
            <ul className="list-unstyled ps-0 mt-3">
                {/* Here we can reuse the simpler InfoListItem */}
                <InfoListItem variant="dark">Encrypt sensitive data (such as passwords).</InfoListItem>
                <InfoListItem variant="dark">Prevent unauthorized access, misuse, or disclosure.</InfoListItem>
                {/* <InfoListItem variant="dark">Regularly monitor system activities for suspicious behavior.</InfoListItem> */}
            </ul>
            <PolicyAlert icon="bi-exclamation-triangle-fill" title="Security Disclaimer" variant="warning" path='M320 496C342.1 496 360 513.9 360 536C360 558.1 342.1 576 320 576C297.9 576 280 558.1 280 536C280 513.9 297.9 496 320 496zM320 64C346.5 64 368 85.5 368 112C368 112.6 368 113.1 368 113.7L352 417.7C351.1 434.7 337 448 320 448C303 448 289 434.7 288 417.7L272 113.7C272 113.1 272 112.6 272 112C272 85.5 293.5 64 320 64z'>
              No online platform is 100% secure. Users are encouraged to use strong passwords and keep their login credentials confidential.
            </PolicyAlert>

            
          </PolicySection>

          {/* --- Section 5 --- */}
          <PolicySection id="section-6" title="5. User Rights">
            <p className="text-body-secondary">As a user, you have the right to:</p>
            <ul className="list-unstyled ps-0 mt-3">
              <InfoListItem>Access and update your personal information.</InfoListItem>
              <InfoListItem>Request deletion of your account.</InfoListItem>
              <InfoListItem>File complaints anonymously <span className='nextLineText'>(where applicable).</span> </InfoListItem>
              <InfoListItem>Withdraw consent for data usage <span className='nextLineText'>(subject to institutional policies).</span></InfoListItem>
            </ul>
          </PolicySection>
          
          {/* ... Other sections (6, 7, 8, 9) ... */}
          <PolicySection id="section-7" title="6. Cookies and Analytics">
             <p className="text-body-secondary">
               Yachika@JMIETI may use minimal cookies for maintaining login sessions and improving functionality. <strong>We do not use tracking or advertising cookies.</strong>
             </p>
           </PolicySection>
           
           <PolicySection id="section-8" title="7. Third-Party Access">
             <p className="text-body-secondary">
               Only authorized JMIETI administrators and developers have access to stored data for maintenance and support purposes. We do not share your information with external organizations without explicit consent.
             </p>
           </PolicySection>
           {/* ... etc ... */}
          
          {/* --- Section 8 --- */} 
            <PolicySection id="section-9"title="8. Public Access and Use">
              <p className="text-body-secondary">
                While the platform is publicly accessible, 
                only verified JMIETI students and staff can create or track complaints. 
                Visitors may view general information about the platform but cannot access private complaint data.
              </p>
            </PolicySection>
              
          {/* --- Section 9 --- */} 
          <PolicySection id="section-10" title="9. Policy Updates">
              <p className="text-body-secondary">
                This Privacy Policy may be updated from time to time to reflect system improvements
               or legal requirements. Users will be notified of major updates through the platform.
              </p>
            </PolicySection>

          {/* --- Section 10 (Card Style) --- */}
          <section className="mb-5">
             <div className="cta-card text-center border-0 bg-body-tertiary rounded-4">
                <div className="card-body p-4 p-md-5">
                   <h2 className="h4 fw-bold mb-3 text-gradient">Contact Us</h2>
                   <p className="text-muted contactText w-75 mx-auto" >
                     For questions, concerns, or requests related to this Privacy Policy, please reach out to us.
                   </p>
                   <a href="mailto:supportYachika@jmieti.edu.in" className="btn btn-primary btn-lg mt-2 d-flex mx-auto" style={{fontSize:"0.9rem", width:"fit-content"}}>
                     {/* <i className="bi bi-envelope-at me-2"></i> */}
                     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope-at me-2 d-lg-flex d-md-flex d-none" viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                    </svg>
                     supportYachika@jmieti.edu.in
                   </a>
                </div>
             </div>
           </section>

        </div>
      </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;