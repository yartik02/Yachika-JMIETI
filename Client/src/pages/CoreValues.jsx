import React,{useState} from "react";
import HowWorks from './HowWorks'
import './AboutEnd.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link } from 'react-router-dom'

const coreData = [
    {
        name:"Transparency",
        viewBox:"0 0 16 16",
        w:"25",
        para:"Open communication and clear processes ensure everyone knows what's happening with their concerns.",
        classValue:"bi bi-shield",
        path:"M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56",
        background:"#3838ff"
    },
    {
        name:"Accountability",
        viewBox:"0 0 16 16",
        w:"25",
        para:"Every complaint is tracked, assigned, and followed up to ensure responsible resolution of your complains.",
        classValue:"bi bi-person-check-fill",
        path:"M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0 M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
        background:"#f10000de"
    },
    {
        name:"Innovation",
        viewBox:"0 0 20 20",
        w:"30",
        para:"Continuously improving our platform to better serve the evolving needs of our campus community.",
        classValue:"bi bi-lightbulb",
        path:"M14.3352 10.0257C14.3352 7.6143 12.391 5.66554 10.0002 5.66537C7.60929 5.66537 5.66528 7.61419 5.66528 10.0257C5.66531 11.5493 6.44221 12.8881 7.61938 13.6683H12.3811C13.558 12.8881 14.3352 11.5491 14.3352 10.0257ZM8.84399 16.9984C9.07459 17.3983 9.50543 17.6683 10.0002 17.6683C10.495 17.6682 10.926 17.3984 11.1565 16.9984H8.84399ZM8.08813 15.6683H11.9114V14.9984H8.08813V15.6683ZM1.66626 9.33529L1.80103 9.34896C2.10381 9.41116 2.3313 9.67914 2.3313 10.0003C2.33115 10.3214 2.10377 10.5896 1.80103 10.6517L1.66626 10.6654H0.833252C0.466091 10.6654 0.168389 10.3674 0.168213 10.0003C0.168213 9.63306 0.465983 9.33529 0.833252 9.33529H1.66626ZM19.1663 9.33529L19.301 9.34896C19.6038 9.41116 19.8313 9.67914 19.8313 10.0003C19.8311 10.3214 19.6038 10.5896 19.301 10.6517L19.1663 10.6654H18.3333C17.9661 10.6654 17.6684 10.3674 17.6682 10.0003C17.6682 9.63306 17.966 9.33529 18.3333 9.33529H19.1663ZM3.0481 3.04818C3.2753 2.82099 3.62593 2.79189 3.88403 2.96224L3.98853 3.04818L4.57739 3.63705L4.66235 3.74154C4.83285 3.99966 4.80464 4.35021 4.57739 4.57748C4.35013 4.80474 3.99958 4.83293 3.74146 4.66244L3.63696 4.57748L3.0481 3.98861L2.96216 3.88412C2.79181 3.62601 2.82089 3.27538 3.0481 3.04818ZM16.012 3.04818C16.2717 2.7886 16.6927 2.78852 16.9524 3.04818C17.2117 3.30786 17.2119 3.72901 16.9524 3.98861L16.3625 4.57748C16.1028 4.83717 15.6818 4.83718 15.4221 4.57748C15.1626 4.31776 15.1625 3.89669 15.4221 3.63705L16.012 3.04818ZM9.33521 1.66634V0.833336C9.33521 0.466067 9.63297 0.168297 10.0002 0.168297C10.3674 0.168472 10.6653 0.466175 10.6653 0.833336V1.66634C10.6653 2.0335 10.3674 2.33121 10.0002 2.33138C9.63297 2.33138 9.33521 2.03361 9.33521 1.66634ZM15.6653 10.0257C15.6653 11.9571 14.7058 13.6634 13.2415 14.6917V16.3333C13.2415 16.7004 12.9444 16.9971 12.5774 16.9974C12.282 18.1473 11.2423 18.9982 10.0002 18.9984C8.75792 18.9984 7.71646 18.1476 7.42114 16.9974C7.05476 16.9964 6.75806 16.7 6.75806 16.3333V14.6917C5.29383 13.6634 4.33523 11.957 4.33521 10.0257C4.33521 6.88608 6.86835 4.33529 10.0002 4.33529C13.132 4.33547 15.6653 6.88618 15.6653 10.0257Z",
        background:"#a700a7"
    },
    {
        name:"Inclusivity",
        viewBox:"0 0 16 16",
        w:"25",
        para:"Creating a safe space where every student feels comfortable sharing their concerns and feedback.",
        classValue:"bi bi-people",
        path:"M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
        background:"#ff7a00"
    },
    {
        name:"Efficiency",
        viewBox:"0 0 16 16",
        w:"25",
        para:"Streamlined processes and automated workflows ensure quick response times and timely resolutions.",
        classValue:"bi bi-clock",
        path:"M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0",
        background:"#00a800"
    },
    {
        name:"Empathy",
        viewBox:"0 0 16 16",
        w:"25",
        para:"Understanding and addressing student concerns with compassion and genuine care for their wellbeing.",
        classValue:"bi bi-heart",
        path:"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15",
        background:"#ed657d"
    },
]

const CoreValues = () => {
    const isToken = localStorage.getItem("authToken");
    const url = isToken ? "/complaintSubmission" : "/login";

    const handleClick = () =>{
      if(url=="/login"){
        toast.info("Please Login to start !")
      }
    }

    return( 
    <div className="CoreMain pt-5" style={{backgroundColor:"#4258ff10"}}>
        <div className="texts mx-auto">
          <h6 className="display-6 heading fw-bold mt-3 mb-1 text-center">
            Our Core <span className="text-gradient">Values</span>
          </h6>
          <p className="fs-6 fw-light text-muted mb-5 text-center mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="row w-75 mx-auto mb-5 pb-5 g-4">
          {coreData.map((item, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={idx}>
              <div className="bg-white xtra p-4 rounded-4">
                <span
                  className="p-3 rounded-4 d-inline-block" 
                  style={{ backgroundColor: item.background }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={`${item.w}`}
                    height={`${item.w}`}
                    fill="white"
                    className={`${item.classValue}`}
                    viewBox={`${item.viewBox}`}
                  >
                    <path d={item.path} />
                  </svg>
                </span>
                <p className="fw-bold mt-3 mb-1 mx-0">{item.name}</p>
                <p
                  className="fw-light text-secondary mx-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  {item.para}
                </p>
              </div>
        
            </div>
          ))}
        </div>
      
        <HowWorks />
        
      <section className="cta-section py-5 bg-white">
      <div className="container my-5">
        <div className="cta-card rounded-5 text-center p-5">
          <div className="texts mx-auto">
            <h6 className="display-6 heading fw-bold my-3 text-center">
              Ready to Make Your Voice <span className="text-gradient">Heard?</span>
            </h6>
            <p className="fs-6 fw-normal text-muted mb-4 text-center mx-auto">
              Join our community of students who are already using Yachika@JMIETI to improve their campus experience.
            </p>
          </div>
          <Link to={url} onClick={handleClick}>
            <p className="cta-button d-inline-flex rounded-pill text-white align-items-center text-gradient">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="me-2"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
              <span>Get Started Today</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
    </div>
    );
};

export default CoreValues;