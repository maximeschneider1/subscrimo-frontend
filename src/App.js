import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/Utils/AuthContext';

import './App.css';

import Hello from './components/Hello';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route path="/hello" element={<Hello />} />
            <Route path="/" element={<Layout />} />
            
          </Routes>
        </AuthContextProvider>
      </div>
    </Router>
  );
};

export default App;
