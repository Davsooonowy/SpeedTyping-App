import React from 'react';

const GoogleIconWithGradient: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <defs>
      <radialGradient id="googleIconGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ea4335" />
        <stop offset="25%" stop-color="#fbbc05" />
        <stop offset="50%" stop-color="#34a853" />
        <stop offset="75%" stop-color="#4285f4" />
        <stop offset="100%" stop-color="#ea4335" />
      </radialGradient>
    </defs>
    <path d="M255.68 130.93c0-8.49-.77-16.69-2.18-24.56H130.4v46.37h70.45c-3.04 20.15-15.53 37.2-37.2 48.77v40.64h60.13c35.22-32.42 55.5-80.18 55.5-135.22z" fill="url(#googleIconGradient)"/>
    <path d="M130.4 262c35.35 0 65-11.64 86.6-31.63l-60.13-40.64c-11.64 7.82-26.5 12.42-42.9 12.42-32.96 0-60.88-22.22-70.82-52.22H9.57v41.33C29.82 228.08 76.09 262 130.4 262z" fill="url(#googleIconGradient)"/>
    <path d="M59.58 157.93c-4.3-12.7-4.3-26.38 0-39.08V77.52H9.57c-15.9 24.77-15.9 55.85 0 80.62l50.01-41.33z" fill="url(#googleIconGradient)"/>
    <path d="M130.4 52.58c18.77 0 35.69 6.45 48.96 19.12l36.69-36.69C197.4 17.45 165.24 0 130.4 0 76.09 0 29.82 33.92 9.57 77.52l50.01 41.33c9.94-30 37.87-52.22 70.82-52.22z" fill="url(#googleIconGradient)"/>
  </svg>
);

export default GoogleIconWithGradient;
