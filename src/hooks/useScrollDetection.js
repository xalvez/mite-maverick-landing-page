import { useState, useEffect, useCallback } from 'react';

export const useScrollDetection = (threshold = 50, throttleDelay = 100) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    let timeoutId = null;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        
        if (timeoutId) clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        }, throttleDelay);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [threshold, throttleDelay]);
  
  return isScrolled;
};