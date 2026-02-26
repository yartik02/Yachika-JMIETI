// import React, { useState, useEffect } from 'react';

// // We need to import the CSS. We will move it to a global
// // CSS file in the next step, so let's import that.
import './ScrollToTopButton.css'; 

// function ScrollToTopButton() {
//   // State to manage visibility
//   const [showScrollToTop, setShowScrollToTop] = useState(false);

//   // Function to scroll to the top
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   // Effect to add/remove scroll listener
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowScrollToTop(true);
//       } else {
//         setShowScrollToTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Cleanup
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       {showScrollToTop && (
//         <button 
//           className="scroll-to-top-btn" 
//           onClick={scrollToTop}
//           aria-label="Scroll to top"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
//             <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
//           </svg>
//         </button>
//       )}
//     </>
//   );
// }

// export default ScrollToTopButton;


import React, { useState, useEffect } from 'react';


function ScrollToTopButton() {
  // We only need one state: is it visible or not?
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Simple scroll-to-top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Simple effect to toggle visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array, so it only runs on mount and unmount

  return (
        <button 
          // We removed the 'isLaunching' class
          className={`scroll-to-top-btn ${showScrollToTop ? 'show-btn' : ''} d-flex justify-content-center align-items-center rounded-circle`} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          {/* A clean, simple, and cute chevron icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
          </svg>
        </button>
  );
}

export default ScrollToTopButton;