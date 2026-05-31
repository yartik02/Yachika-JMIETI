import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useAuth } from "../../../store/auth";
import "./new.css";
import '../../../components/CompliantSorting.css';
import ComplaintItem from '../../../components/ComplaintItem';
import ComplaintDetails from '../../../components/ComplaintDetails';
import ComplaintFilterBar from '../../../components/ComplaintFilterBar'


const ITEMS_PER_PAGE = 10;
const ComplaintSection = () => {

  // 1. Get raw data from context
    const { allAdminsComplaints } = useAuth(); 

    // 2. State to hold the filtered data returned from the Filter Bar
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    
    // UI State
    const [clickedComplaint, setClickedComplaint] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // 3. Callback to catch the filtered data from the child component
    const handleFilteredData = useCallback((data) => {
        setFilteredComplaints(data);
    }, []);

    // 4. Reset to page 1 whenever the filtered list changes
    useEffect(() => {
        setCurrentPage(1); 
    }, [filteredComplaints]); 

    const viewClickedComplaint = useCallback((complaintClicked) => {
        setClickedComplaint(complaintClicked);
    }, []); 

    // --- Pagination Logic ---
    const totalPages = useMemo(() => {
        return Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE) || 1;
    }, [filteredComplaints]);

    const paginatedComplaints = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredComplaints.slice(startIndex, endIndex);
    }, [currentPage, filteredComplaints]);

    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages)); 
    }, [totalPages]);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prev => Math.max(prev - 1, 1)); 
    }, []);

  return (
    <section
      className="complaintView mx-auto rounded-4 py-3 p-2 w-100"
      style={{ backgroundColor: "var(--bg-main)" }}
    >

    <div className="sortingSection p-lg-3 p-0">
        <ComplaintFilterBar 
                rawComplaints={allAdminsComplaints} 
                onFilterChange={handleFilteredData}
                exportFileName="All_Complaints_Export.xlsx"
            />

            <div className="row p-2 mt-3" >
                {/* --- COMPLAINT LIST COLUMN --- */}
                <div className="col-lg-6 col-sm-12 col-sm-12 complaintItems text-start">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-normal text-start px- my-auto">
                            All Complaints ({filteredComplaints.length})
                        </h6>

                        {/* --- PAGINATION CONTROLS --- */}
                        {totalPages > 1 && (
                            <div className="d-flex align-items-center">
                                <button 
                                    className="btn btn-sm login_btn" 
                                    onClick={handlePrevPage} 
                                    disabled={currentPage === 1}
                                >
                                    &lt; <span className='pageBtn'>Prev</span>
                                </button>
                                <span className="mx-2 opacity-75" style={{fontSize: '0.9rem'}}>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button 
                                    className="btn btn-sm login_btn" 
                                    onClick={handleNextPage} 
                                    disabled={currentPage === totalPages}
                                >
                                    <span className='pageBtn'>Next</span> &gt;
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Use the paginated list to map */}
                    {paginatedComplaints.length > 0 ? (
                        paginatedComplaints.map((complaint) => (
                            <ComplaintItem
                                key={complaint._id}
                                complaint={complaint}
                                onClick={viewClickedComplaint}
                                isActive={clickedComplaint?._id === complaint._id}
                            />
                        ))
                    ) : (
                        <p className="opacity-75 text-center p-3">No complaints match the current filters or search term.</p>
                    )}
                </div>

                {/* --- COMPLAINT DETAILS COLUMN --- */}
                <div 
                    className="col-lg-6 col-sm-12 col-sm-12 complaint-details px-5 pt-4" 
                    style={{ zIndex: 10 }}
                >
                    <ComplaintDetails complaint={clickedComplaint} />
                </div>
            </div>
    </div>


    </section>
  );
};

export default ComplaintSection;
