import React from 'react';
import './Header.css';
import logoIcon from '../images/logo.png';
import hamburgerIcon from '../images/hamburger.png'

const Header = ({ toggleSidebar , headerTitle }) => {
  return (
    <div className="header">
      <img
        className="header-logo"
        src={logoIcon}
        alt="Logo Icon"
        style={{ marginRight: '8px' }}
      />
      <img
        className="header-menu"
        src={hamburgerIcon}
        alt="Hamburger Icon"
        onClick={toggleSidebar}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === 'Enter' && toggleSidebar()}
      />
       <p className="header-title">{headerTitle}</p>
    </div>
  );
};

export default Header;
