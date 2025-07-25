import React from 'react';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Home/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;