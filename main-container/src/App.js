import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

const Forms = React.lazy(() => import('forms/Form'));
const Tables = React.lazy(() => import('tables/Table'));
const Table1 = React.lazy(() => import('tables1/Table1'));

const App = () => {
  const [view, setView] = useState('forms');

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '20px', flex: 1 }}>
          <h1>Main Application</h1>
          <div style={{ marginTop: '20px' }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/forms" element={<Forms />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/tables1" element={<Table1 />} />
                <Route path="/" element={<div>Welcome! Please select an option from the sidebar.</div>} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
