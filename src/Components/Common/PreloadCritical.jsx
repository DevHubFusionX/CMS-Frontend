import { useEffect } from 'react';

const PreloadCritical = () => {
  useEffect(() => {
    // Preload critical routes
    const criticalRoutes = [
      () => import('../../Pages/Dashboard'),
      () => import('../../Pages/Posts/PostsList')
    ];
    
    // Preload after 2 seconds to avoid blocking initial render
    setTimeout(() => {
      criticalRoutes.forEach(route => route());
    }, 2000);
  }, []);

  return null;
};

export default PreloadCritical;