import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/auth";
import "../Admindashboard/new.css";
import ReportedComplaintsContainer from "./ReportedComplaintsContainer";

const ComplaintSection = () => {
  return (
    <section
      className="complaintView mx-auto bg-white rounded-4 p-lg-4 p-2"
      style={{ width: "100%" }}
    >

    <div className="sortingSection p-lg-3 p-0">
        <ReportedComplaintsContainer/>
    </div>


    </section>
  );
};

export default ComplaintSection;
