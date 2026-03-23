import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as XLSX from "xlsx";

function ComplaintFilterBar({ rawComplaints, onFilterChange, exportFileName = "Complaints_Export.xlsx" }) {
  const [filters, setFilters] = useState({
    Status: "All Status",
    Priority: "All Priority",
    Category: "All Categories",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownContainerRef = useRef(null);

  const dropdowns = [
    { name: "Status", options: ["All Status", "Pending", "Resolved", "Rejected"] },
    { name: "Priority", options: ["All Priority", "Low", "Medium", "High"] },
    {
      name: "Category",
      options: ["All Categories", "Infrastructure", "Faculty", "Services", "Student", "Hostel", "Other"],
    },
  ];

  // Handle clicking outside to close dropdowns
  const handleClickOutside = useCallback((event) => {
    if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: option,
    }));
    setOpenDropdown(null);
  }, []);

  const handleExport = useCallback(() => {
    if (confirm("Are you sure you want to export all complaints?")) {
      const wb = XLSX.utils.book_new();
      // Exporting the raw array passed to the component
      const ws = XLSX.utils.json_to_sheet(rawComplaints); 
      XLSX.utils.book_append_sheet(wb, ws, "Complaints");
      XLSX.writeFile(wb, exportFileName);
    }
  }, [rawComplaints, exportFileName]);

  // Apply the filters to the raw data
  const filteredComplaints = useMemo(() => {
    let complaintsToFilter = [...(rawComplaints || [])];

    if (filters.Status !== "All Status") {
      complaintsToFilter = complaintsToFilter.filter((c) => c.status === filters.Status);
    }
    if (filters.Priority !== "All Priority") {
      complaintsToFilter = complaintsToFilter.filter((c) => c.priority === filters.Priority);
    }
    if (filters.Category !== "All Categories") {
      complaintsToFilter = complaintsToFilter.filter((c) => c.category === filters.Category);
    }
    if (searchTerm.trim() !== "") {
      const lowerCaseSearch = searchTerm.toLowerCase();
      complaintsToFilter = complaintsToFilter.filter(
        (c) =>
          (c.complaintTitle && c.complaintTitle.toLowerCase().includes(lowerCaseSearch)) ||
          (c.complaintBody && c.complaintBody.toLowerCase().includes(lowerCaseSearch)) ||
          (c.createdByEmail && c.createdByEmail.toLowerCase().includes(lowerCaseSearch)) ||
          (c.createdByName && c.createdByName.toLowerCase().includes(lowerCaseSearch))
      );
    }

    complaintsToFilter.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return complaintsToFilter;
  }, [rawComplaints, filters, searchTerm]);

  // Send the filtered results back to the parent component whenever they change
  useEffect(() => {
    onFilterChange(filteredComplaints);
  }, [filteredComplaints, onFilterChange]);

  return (
    <div className="row g-2 align-items-center" ref={dropdownContainerRef}>
      {/* Search Input */}
      <div className="search-input-wrapper col-lg-4 col-md-12 m-0 border-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-icon ms-lg-1 ms-md-1" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input
          type="text"
          className="search-input ps-md-5"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dropdown Filters */}
      {dropdowns.map((dropdown) => {
        const isOpen = openDropdown === dropdown.name;
        const selectedValue = filters[dropdown.name];
        return (
          <div className="col-md-6 col-lg-2 m-0" key={dropdown.name}>
            <div
              className="p-2 ps-3 selects border rounded-3 d-flex justify-content-between align-items-center position-relative"
              role="button"
              onClick={() => handleToggleDropdown(dropdown.name)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              {selectedValue}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-down dropdown-arrow ${isOpen ? "open" : ""}`} viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
              </svg>
              {isOpen && (
                <div className="border menus mt-1 p-2 rounded-3 bg-white position-absolute" style={{ zIndex: 100 }}>
                  {dropdown.options.map((option) => (
                    <p
                      key={option}
                      className={`m-0 p-2 rounded-3 dropdown-option ${option === selectedValue ? "selected-option" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption(dropdown.name, option);
                      }}
                    >
                      {option}
                      {option === selectedValue && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check ms-2 bg-success border border-success bg-opacity-10 rounded-circle" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
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

      {/* Export Button */}
      <div className="col-lg-2 col-md-6 m-0">
        <button className="btn export-btn w-100" title="Export as excel sheet" onClick={handleExport}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download me-2" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
          <span>Export All</span>
        </button>
      </div>
    </div>
  );
}

export default ComplaintFilterBar;