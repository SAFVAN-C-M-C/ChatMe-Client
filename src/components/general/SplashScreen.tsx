import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <img src="/logo/ChatMe--full-color.png" alt="App Logo" className="aspect-auto h-[50px] mb-4" />
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full  loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;