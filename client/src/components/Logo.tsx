import { useState } from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', alt = 'sreai logo', size = 'md' }: LogoProps) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-16 h-16'
  };
  
  const logoSrc = '/sreai_1758074442530.png';
  const fallbackSrc = '/sreai-logo.png';
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // If both images fail, show a text fallback
  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-xs ${className}`}>
        S
      </div>
    );
  }
  
  return (
    <img
      src={imageError ? fallbackSrc : logoSrc}
      alt={alt}
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={handleImageError}
      onLoad={() => console.log('Logo loaded successfully')}
    />
  );
};

export default Logo;