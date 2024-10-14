import React from 'react';
import { ClipLoader } from 'react-spinners';
import '../assets/css//LoadingSpinner.css'; 

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-text">KANGYOO</div>
      <ClipLoader size={50} color={"#123abc"} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
