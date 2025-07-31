import { useEffect } from 'react';

export const usePerformance = (componentName) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`${componentName} render time: ${endTime - startTime}ms`);
      };
    }
  }, [componentName]);
};

export const measurePerformance = (fn, label) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${label}: ${end - start}ms`);
  }
  
  return result;
};