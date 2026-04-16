import React from "react";
import "./FAQ.css"
import { Link } from "react-router-dom";

export const Error = () => {
    return (
        <section className="d-flex justify-content-center align-items-center" style={{flexDirection: "column", minHeight: "100vh", backgroundColor: "#f2f5fe"}}>
            <div className="main bg-white m-md-5 m-lg-5 m-0 border rounded-4 shadow p-5 w-75 text-center d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-gradient fw-bold mb-0 errorTXT">404</h1>
                <p className="text-muted m-0 fw-semibold errorTAG" >SORRY! PAGE NOT FOUND</p>
                <p className="text-muted m-0 w-75 w-sm-100 errorPARA">
                    Oops! It seems that the page you are trying to access does not exist.
                    If you believe there's an issue, feel free to report it, and we'll look into it.
                </p>
                <div className="buttons d-flex justify-content-center p-3 align-items-center">
                    <Link to="/" className="btn login_btn m-2">Go to Home</Link>
                    <Link to="/contactUs" className="btn login_btn m-2">Report Problem</Link>
                </div>
            </div>
        </section>
    );
};