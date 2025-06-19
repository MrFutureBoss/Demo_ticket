"use client";

import React from 'react';

interface LoadingDotsProps {
  text?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ text = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <span className="loading-text">{text}</span>
    </div>
  );
};

export default LoadingDots; 