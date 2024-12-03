import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import formIcon from '../images/form.png';
import tableIcon from '../images/tables.png';
import table1Icon from '../images/tables1.png';
import logoMobile from '../images/mobilelogo.png';

const Sidebar = ({ isMobile, isOpen, closeSidebar, setHeaderTitle }) => {
  const [activeMenu, setActiveMenu] = useState('/forms'); // Track active menu item
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state for Forms
  const navigate = useNavigate();

  const navigateTo = (path, title) => {
    setActiveMenu(path); // Set active menu item
    navigate(path);
    if (isMobile) closeSidebar(); // Close sidebar in mobile view
    setHeaderTitle(title);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle Forms dropdown
  };

  return (
    <div className={`sidebar ${isMobile && isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <div className="user-avatar">AA</div>
        <div className="user-info">
          <div className="user-name">Arjun Ankur</div>
          <div className="user-role">Admin</div>
        </div>
      </div>
      <ul className="sidebar-menu">
        {/* Forms Field with Dropdown */}
        <li className='form'>
          <div
            className={`menu-item ${activeMenu === '/forms' ? 'active-menu-item' : ''}`}
            onClick={toggleDropdown}
          >
            <div className='forms'>
            <img src={formIcon} alt="Forms Icon" className="sidebar-icon" />
            Forms
            </div>
            {/* Dropdown Arrow */}
            <div className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>
              {dropdownOpen ? '▲' : '▼'}
            </div>
          </div>
          {dropdownOpen && (
            <ul className="dropdown-list">
              <li onClick={() => navigateTo('/forms/field1', 'Field 1')}>Field 1</li>
              <li onClick={() => navigateTo('/forms/field2', 'Field 2')}>Field 2</li>
              <li onClick={() => navigateTo('/forms/field3', 'Field 3')}>Field 3</li>
            </ul>
          )}
        </li>

        {/* Other Menu Items */}
        <li
          className={activeMenu === '/tables' ? 'active-menu-item' : ''}
          onClick={() => navigateTo('/tables', 'Tables')}
        >
          <img src={tableIcon} alt="Tables Icon" className="sidebar-icon" /> Tables
        </li>
        <li
          className={activeMenu === '/tables1' ? 'active-menu-item' : ''}
          onClick={() => navigateTo('/tables1', 'Tables1')}
        >
          <img src={table1Icon} alt="Tables1 Icon" className="sidebar-icon" /> Tables1
        </li>
      </ul>
      <div className="sidebar-footer">
        <img src={logoMobile} alt="Yes Securities" />
      </div>
    </div>
  );
};

export default Sidebar;
