import React from 'react';

const ScreenshotsSection = () => {
  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            See FusionX in Action
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Explore our intuitive interface and powerful features
          </p>
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-gray-400 text-sm">FusionX Dashboard</div>
          </div>
          
          <div className="bg-gray-800 p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Sidebar */}
              <div className="col-span-3 bg-gray-900 rounded-lg p-4 h-96">
                <div className="w-full h-8 bg-blue-600 rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="w-full h-6 bg-gray-700 rounded-md"></div>
                  <div className="w-full h-6 bg-gray-700 rounded-md"></div>
                  <div className="w-full h-6 bg-gray-700 rounded-md"></div>
                  <div className="w-full h-6 bg-gray-700 rounded-md"></div>
                </div>
                <div className="mt-8 space-y-2">
                  <div className="w-full h-6 bg-gray-700 rounded-md"></div>
                  <div className="w-full h-6 bg-gray-700 rounded-md"></div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="col-span-9 space-y-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-1/3 h-8 bg-gray-700 rounded-md"></div>
                    <div className="w-1/4 h-8 bg-blue-600 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="w-full h-24 bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-2/3 h-4 bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-full h-4 bg-gray-700 rounded-md"></div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="w-full h-24 bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-2/3 h-4 bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-full h-4 bg-gray-700 rounded-md"></div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="w-full h-24 bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-2/3 h-4 bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-full h-4 bg-gray-700 rounded-md"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="w-1/4 h-6 bg-gray-700 rounded-md mb-4"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-700 rounded-md"></div>
                    <div className="w-full h-4 bg-gray-700 rounded-md"></div>
                    <div className="w-3/4 h-4 bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400">Experience the full power of FusionX with a live demo</p>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotsSection;