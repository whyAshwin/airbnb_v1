import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  tooltip
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all';
  
  const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    outline: 'bg-transparent border border-gray-300 text-gray-700'
  };

  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={onClick}
      title={tooltip}
    >
      {children}
    </span>
  );
};

export default Badge;