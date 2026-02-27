import React from "react";
import logo from "../assets/YachikaLogo.png";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


// const quickLinks = [
//     {name:"About Us", url: "/about"},
//     {name:"How it works",hash:<HashLink smooth to="/contact#howItWorks">FAQs</HashLink>, url: "/howItWorks"},
//     {name:"FAQs", hash:<HashLink smooth to="/contact#faqs">FAQs</HashLink>, url: "/faqs"},
//     // {name:"Privacy Policy", url: "/privacyPolicy"}
// ];

const contactInfo = [
    { 
        label: "Email",
        name:" director@jmieti.edu.in",
        value: "mailto:director@jmieti.edu.in",
        path:"M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"
    },
    { 
        label: "Phone",
        name:" +91 8295905215",
        value: "tel:+91 8295905215",
        path:"M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
    },
    { 
        label: "website",
        name:" jmieti.edu.in",
        value: " https://www.jmieti.edu.in",
        path:"M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z" 
 },
    { 
        label: "Address",
        name:" Chota Bans, Radaur-135133",
        value: "",
        path:"M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" 
    },
];

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/jmietiinstitute",
    classn:"bi bi-facebook",
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/jmietiofficial/",
    classn:"bi bi-instagram",
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
  },
  {
    name: "Twitter / X",
    url: "https://x.com/jmietiradaur",
    classn:"bi bi-twitter-x",
    path: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jmieti-radaur-b10943301/",
    classn:"bi bi-linkedin",
    path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@JmietiCollege",
    classn:"bi bi-youtube",
    wid:"25",
    path: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
  }
];

function Footer() {
  const handleClick = (url) => {
    url!=="" &&
    window.open(url, "_blank");
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <footer className="text-light py-4 " style={{width: "100vw"}}>
      <div className="container my-lg-5 ">
        <div className="row text-start">
          {/* Logo + About */}
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <p className="fs-5 fw-bold m-0 d-flex align-items-center">
              <img
                src={logo}
                alt="Logo"
                className="me-2"
                style={{ width: "40px", height: "auto" }}
              />
              Yachika@JMIETI
            </p>
            <p className="mt-2 fw-lighter" style={{ fontSize: "0.9rem" }}>
              Empowering students to voice their concerns and create positive
              change in their academic environment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3 mb-3 ps-lg-5 ps-md-3 text-lg-start text-md-center text-sm-start">
            <p className="mb-2 ms-lg-5">Quick Links</p>
            <ul className="list-unstyled ms-lg-5">
              {/* {quickLinks.map((link, index) => ( */}
                <Link to="/about" onClick={scrollToTop} style={{ textDecoration: "none" , color: "inherit"}}>
                    <li className="fw-lighter footer-item" style={{cursor: "pointer"}}>About Us</li>
                </Link>
              {/* ))} */}
              <li className="fw-lighter footer-item" style={{cursor: "pointer", textDecoration:"none", color:"inherit"}}>
                <HashLink smooth to="/about#howItWorks" style={{textDecoration:"none", color:"inherit"}}>How it works</HashLink>
              </li>
              <li className="fw-lighter footer-item" style={{cursor: "pointer"}}>
                <HashLink smooth to="/contactus#faqs" style={{textDecoration:"none", color:"inherit"}}>FAQs</HashLink>
              </li>
              <li className="fw-lighter footer-item" style={{ cursor: "pointer" }}>
                <HashLink smooth to="/privacy-policy" onClick={scrollToTop} style={{ color: "inherit",textDecoration: "none"}}>Privacy Policy</HashLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <p className="mb-2">Contact Info</p>
            <ul className="list-unstyled text-start">
              {contactInfo.map((item, index) => (
                  <li key={index} onClick={() => handleClick(item.value)} className="fw-lighter d-flex flex-row footer-item" title={item.label} style={{ cursor: "pointer"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} fill="rgba(255, 255, 255, 0.8)" className="me-1" viewBox="0 0 640 640">
                      <path d={item.path}/>
                      </svg>
                    <span className="text-fluid">{item.name}</span>
                  </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-12 icons col-md-6 col-lg-3 ps-lg-5 mb-3 text-center">
            <p className="mb-2 text-lg-start ps-lg-5 text-center">Follow Us</p>
            <ul className="list-unstyled text-lg-start ps-lg-5 text-center">
              {socialLinks.map((social, index) => (
                <Link to={social.url} target="_blank" title={social.name} key={index} className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width={social.wid||"18"} fill="rgba(255, 255, 255, 0.8)" className={`${social.classn} mx-1`} viewBox="0 0 16 16">
                      <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center mb-0 mx-auto py-2 fs-6 text-secondary text-wrap">
            © {new Date().getFullYear()} Yachika@JMIETI. All rights reserved.<br />
            <span className="text-fluid " style={{ fontSize: "0.9rem" }}> Designed and Developed with ❤️ for JMIETI students by Yartik.</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;