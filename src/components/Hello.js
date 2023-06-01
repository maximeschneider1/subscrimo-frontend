import React from 'react';
import Header from './Header';

const handleLoginClick = () => {
  window.open('http://localhost:3001/auth/google', '_blank');
};

function Hello(props) {
  return (
    <div className="min-h-screen">
      <Header onAboutClick={null} onContactClick={null} />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold mb-4">Sort All Subs. Now</h1>
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Connect
        </button>
      </div>

    </div>
  );
}

export default Hello;
