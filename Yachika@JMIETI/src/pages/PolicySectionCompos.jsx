// PolicySection.jsx
import React from 'react';
import './PolicyStyles-Alt.css'; // We will create this new CSS file

/**
 * A wrapper for a single policy section with a new heading style.
 */
function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="mb-5">
      <h2 className="h4 policy-section-heading">{title}</h2>
      <div className="pt-2 policy-text">{children}</div>
    </section>
  );
}


/**
 * A card-based list item, perfect for a grid layout.
 * Used for: Section 1
 */
function InfoCard({ icon, title, children, variant = 'primary', path }) {

    let iconColor;
    if(variant==='danger'){
        iconColor="#dc3545";
    }
    if(variant==="primary"){
        iconColor='#0d6efd';
    }
    if(variant==="info"){
        iconColor='#0dcaf0';
    }
    if(variant==='success'){
        iconColor='#198754'
    }
  return (
    <div className="col-lg-6 col-md-6 mb-4 d-flex align-items-stretch">
      <div className="card policy-card shadow-sm border-1 border-0 w-100">
        <div className="card-body p-0">
          <div className={`icon-circle bg-${variant} border-1 border-${variant} bg-opacity-10 text-${variant} mb-3 shadow-sm`}>
            {/* <i className={`bi ${icon} fs-4`}></i> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={`${iconColor}`} className={`${icon} m-0`} viewBox="0 0 16 16">
              <path d={path}/>
            </svg>
          </div>
          <h5 className="card-title fw-semibold">{title}</h5>
          <p className="card-text text-body-secondary mb-0">{children}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * A "timeline" or "step" item with a number and vertical line.
 * Used for: Section 2
 */
function UsageStep({ number, children }) {
  return (
    <div className="usage-step d-flex mb-3">
      <div className="usage-step-number text-primary fw-bold">{number}</div>
      <div className="usage-step-text ps-4">
        {children}
      </div>
    </div>
  );
}


/**
 * A simple, clean list item with a colored checkmark.
 * Used for: Section 5
 */
function InfoListItem({ children, variant = 'success' }) {
  return (
    <li className="d-flex align-items-center mb-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-check-circle-fill me-3" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
      <div className="text-body-secondary listtext">{children}</div>
    </li>
  );
}


function PolicyAlert({ icon, title, children, variant = 'info', path }) {
let iconColor, view, me;
    if(variant==='warning'){
        iconColor="#ffc107";
        view='0 0 640 640';
        me='0'

    }
    if(variant==="info"){
        iconColor='#0dcaf0';
        view='0 0 16 16';
    }
    if(variant==='success'){
        iconColor='#198754'
        view='0 0 16 16'
    }

  return (
    <div className={`alert alert-${variant}-subtle border bg-${variant} bg-opacity-10 border-${variant}-subtle rounded-4 mt-3`}>
      <h5 className={`alert-heading text-${variant} fw-semibold mb-2 d-flex align-items-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={view} width={30} fill={`${iconColor}`} className={`me-${me||'2'} ${icon||" "}`}>
        <path d={`${path}`}/>
        </svg>
        {title}
      </h5>
      <p className="mb-0 fw-light alertPara">{children}</p>
    </div>
  );
}

export { PolicySection, InfoCard, UsageStep, InfoListItem, PolicyAlert };