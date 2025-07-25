import React from 'react';
import AuthHeader from '../Components/AuthHeader';
import BrandLogo from '../Components/BrandLogo';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* <AuthHeader /> */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <BrandLogo className="mx-auto h-12 w-auto" />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;