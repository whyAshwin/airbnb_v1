import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M16 3C19.3 3 22 5.7 22 9C22 12.3 19.3 15 16 15C12.7 15 10 12.3 10 9C10 5.7 12.7 3 16 3ZM16 18C21.5 18 26 20.2 26 23V26C26 26.6 25.6 27 25 27H7C6.4 27 6 26.6 6 26V23C6 20.2 10.5 18 16 18Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;