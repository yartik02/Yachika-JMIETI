import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/auth";
import "./new.css";
import ComplaintSorting from "../../../components/CompliantSorting";

const ComplaintSection = () => {
  return (
    <section
      className="complaintView mx-auto bg-white rounded-4 p-lg-4 p-2"
      style={{ width: "100%" }}
    >

    <div className="sortingSection p-lg-3 p-0">
        <ComplaintSorting/>
    </div>


    </section>
  );
};

export default ComplaintSection;
