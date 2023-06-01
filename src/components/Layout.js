import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Header from './Header';
import { AuthContext } from './Utils/AuthContext';

const Layout = () => {
  const [component, setComponent] = React.useState(<Home />);
  const { state, updateState } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      updateState({ loggedIn: true, user: 'User' });
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar setComponent={setComponent} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onAboutClick={null} onContactClick={null} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={component} />
              
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
