import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div style={{ width: '80px', padding: '20px', borderRight: '1px solid #dee2e6',height:'910px', }}>
      <h2>Sidebar</h2>
      <p onClick={() => navigateTo('/forms')} style={{ display: 'block', margin: '10px 0' }}>Forms</p>
      <p onClick={() => navigateTo('/tables')} style={{ display: 'block', margin: '10px 0' }}>Tables</p>
      <p onClick={() => navigateTo('/tables1')} style={{ display: 'block', margin: '10px 0' }}>Tables1</p>
    </div>
  );
};

export default Sidebar;
