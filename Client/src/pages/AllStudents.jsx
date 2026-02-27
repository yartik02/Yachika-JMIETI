import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";

const AllStudents = () => {
    const[allStudents, setallStudents] = useState([]);
    const token= localStorage.getItem("authToken");


    const getAllStudents = async () => {
            try {
                const response = await fetch(
                  `${import.meta.env.VITE_API_BASE_URL}/api/admin/allStudents`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                const data= await response.json();
                setallStudents(data);
                // console.log("All Students:",data);

            } catch (error) {
                console.log(error);
            }
        }


    useEffect(()=>{
        getAllStudents();
    },[]);

    const deleteStudent = async (studentId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/student/delete/${studentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Student deleted successfully!");
        } catch (error) {
            toast.error("An error occured, try agian later!");
            console.error(error);
        }
        if (response.ok) {
        getAllStudents();
    }
    }

    return (
        <section className="d-flex flex-column justify-content-center align-items-center allStudents" style={{width:"100%"}}>
            <p className="text-start fw-light ms-sm-5 m-lg-0 mt-sm-4 mb-0 fs-3 w-100" style={{ color: "#065064" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#065064" className="bi bi-ui-checks-grid me-2 mb-1" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg>
                All Students</p>
            <hr className="mx-auto w-100" style={{ color: "#065064"}}/>
            <div className="text-center mt-2 row g-4" style={{width:"100%"}}>
                {allStudents.map((curStudent, idx)=>{

                    const formatDateTime = (isoString) => {
                    if (!isoString) return 'N/A'; 
                                    
                    const date = new Date(isoString);
                    const formattedDate = date.toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    });
                    const formattedTime = date.toLocaleTimeString([], {
                        hour: '2-digit', minute: '2-digit', hour12: false
                    });
                    
                    return `${formattedDate} at ${formattedTime}`;
                };
                
                const formattedCreatedAt = formatDateTime(curStudent.createdAt);
                const formattedUpdatedAt = formatDateTime(curStudent.updatedAt);
                
                
                return <>
                <div key={idx} className="col-lg-6 col-sm-12 col-md-12 px-4" style={{}}>
                    <div className="card rounded-4 py-sm-4 text-start" style={{backgroundColor:"#e0e1dd42"}}>
                        <span className="my-auto">
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Name:</span> {curStudent.name}</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Email:</span> {curStudent.email}</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Roll No:</span> {curStudent.rollno}</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Class:</span> {curStudent.className }</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Branch:</span> {curStudent.branch}</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">gender:</span> {curStudent.gender}</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Created at:</span> {formattedCreatedAt}</p>
                            <p className="m-0" style={{fontSize:"0.9rem"}}><span className="fw-bold me-2">Updated at:</span> {formattedUpdatedAt}</p>
                            <button className="p-2 px-3 rounded-pill deleteBtn mt-2 ms-2" onClick={()=> deleteStudent(curStudent._id)} style={{fontSize:"0.8rem"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" class="bi bi-trash3-fill me-2 " viewBox="0 0 16 16">
                                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                            <span className ="text">Delete Student</span>
                            </button>
                        </span>
                    </div>
                </div>
                </>  
            })}
            </div>
        </section>
    );
};

export default AllStudents;