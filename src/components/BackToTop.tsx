import React, { useState, useEffect } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;

      setShowButton(scrollTop > 50); 
      setProgress(scrollProgress); 
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <div className="fixed bottom-6 right-6 z-10 max-[991px]:bottom-[5rem]">
          <button
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="relative flex justify-center items-center w-12 h-12 rounded-full bg-white text-blue-600 shadow-xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
          >
            <RiArrowUpLine className="text-2xl" />
            <div className="absolute top-0 left-0 w-full h-full rounded-full">
              <svg
                className="w-full h-full absolute top-0 left-0 transform -rotate-90"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e6e6e6"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#6c7fd8"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="283" // Circumference of the circle (2 * π * r)
                  strokeDashoffset={283 - (progress / 100) * 283} // Progress percentage
                  className="transition-all duration-200 ease-out"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default BackToTop;
