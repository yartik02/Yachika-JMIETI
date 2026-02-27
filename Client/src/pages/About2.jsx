import groupImg from '../assets/groupImage.png';
import './About2.css';

function AestheticMissionSection() {
  return (
    <section className="mission-section mt-5" style={{width:"100%"}}>
      <div className="container">
        <div className="row g-5 align-items-center">

          <div className="col-12 col-lg-6">
            <div className="mission-card bg-light p-5">
                <div className='d-flex align-items-center mb-4' >
                    <div className="icon-wrapper d-flex align-items-center justify-content-center m-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                    </div>
                    <h3 className='m-0 ms-3'>Our Mission</h3>
                </div>
              <p className='text-muted'>
                To create a comprehensive platform that facilitates seamless communication between students and college administration. We strive to ensure every concern is heard, tracked, and resolved efficiently while maintaining transparency and accountability.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="image-wrapper">
              <img
                src={groupImg}
                alt="Students collaborating aesthetically"
                className="img-fluid"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AestheticMissionSection;