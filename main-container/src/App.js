import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './App.css';


const Forms = React.lazy(() => import('forms/Form'));
const Tables = React.lazy(() => import('tables/Table'));
const Table1 = React.lazy(() => import('tables1/Table1'));

const App = () => {
  const [headerTitle, setHeaderTitle] = useState('Default Title');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
      if (window.innerWidth > 768) {
        setSidebarOpen(false); // Auto-close sidebar for desktop
      } else {
        setSidebarOpen(false); // Close sidebar for mobile view
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const closeSidebarOnClickOutside = (e) => {
    // Close sidebar if user clicks outside and the sidebar is open
    if (isSidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.header-menu')) {
      setSidebarOpen(false);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    // Attach click event listener
    document.addEventListener('click', closeSidebarOnClickOutside);

    // Clean up event listener
    return () => document.removeEventListener('click', closeSidebarOnClickOutside);
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className="app-container">
        <Header toggleSidebar={toggleSidebar} headerTitle={headerTitle} />

        {/* Overlay for transparent effect */}
        <div
          className={`overlay ${isSidebarOpen ? 'overlay-visible' : ''}`}
          onClick={closeSidebar}
        ></div>

        <div className="content-container">
          <Sidebar
            isMobile={isMobile}
            isOpen={isSidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
            setHeaderTitle={setHeaderTitle}
          />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<div>Welcome! Please select an option from the sidebar.</div>} />
              <Route path="/forms" element={<Forms/>} />
              <Route path="/tables" element={<Tables/>} />
              <Route path="/tables1" element={<Table1/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
