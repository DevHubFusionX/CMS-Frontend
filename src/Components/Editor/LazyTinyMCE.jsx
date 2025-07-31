import React, { lazy, Suspense } from 'react';

const TinyMCEEditor = lazy(() => import('@tinymce/tinymce-react').then(module => ({ default: module.Editor })));

const LazyTinyMCE = (props) => (
  <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded"></div>}>
    <TinyMCEEditor {...props} />
  </Suspense>
);

export default LazyTinyMCE;