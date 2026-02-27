import React from "react";
import image2 from "../assets/complainImageNew.png";

const data = [
  {
    path: "M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5 M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z",
    name: "bi bi-file-earmark-text",
    title: "Easy Submission",
    des: "Submit complaints in just a few clicks with our intuitive, user-friendly interface designed for students.",
    backgroundColor: "blue",
  },
  {
    path: "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6",
    name: "bi bi-file-earmark-text",
    title: "Real-time Updates",
    des: "Get instant notifications when your complaints are viewed, updated, or resolved by our admin team.",
    backgroundColor: "green",
  },
  {
    path: "M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56",
    name: "bi bi-shield",
    title: "Anonymous Options",
    des: "Submit complaints anonymously when needed, ensuring your privacy and encouraging honest feedback.",
    backgroundColor: "purple",
  },
  {
    path: "M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5",
    name: "bi bi-headphones",
    title: "24/7 Support",
    des: "Our dedicated support team is available around the clock to help address your concerns promptly.",
    backgroundColor: "orangeRed",
  },
];
function Main2() {
  return (
    <section className="main2 py-5 p-lg-5 px-sm-2" style={{ backgroundColor: "#1a267d16" }}>
      <div className="head my-5 py-lg-5 d-flex flex-column align-items-center">
        <p className="fs-3 fw-bold">Why Choose Yachika@JMIETI?</p>
        <p className="fw-light text-dark w-75 text-muted opacity-75">
          Designed specifically for JMIETI family, our platform ensures your voice is heard and your concerns are addressed promptly and
          effectively.
        </p>

        <div className="container mt-3 px-5">
          <div className="row justify-content-center g-4">
            {data.map((item, idx) => (
              <div className="col-12 col-md-6 col-lg-3" key={idx}>
                <div className="p-4 bg-white rounded-4 xtra">
                  <span
                    className="p-3 rounded-4 d-inline-block"
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className={`${item.name}`}
                      viewBox="0 0 16 16"
                    >
                      <path d={item.path} />
                    </svg>
                  </span>
                  <p className="fw-bold mt-4 mb-1 mx-0">{item.title}</p>
                  <p
                    className="fw-light text-secondary mx-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {item.des}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Main2;