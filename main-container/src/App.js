import React, { Suspense, useState } from 'react';

const Forms = React.lazy(() => import('forms/Form'));
const Tables = React.lazy(() => import('tables/Table'));

const App = () => {
  const [view, setView] = useState('forms');

  const renderContent = () => {
    if (view === 'forms') {
      return <Forms />;
    }
    if (view === 'tables') {
      return <Tables />;
    }
    return null;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Main Application</h1>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setView('forms')}
          style={{ 
            marginRight: '10px',
            backgroundColor: view === 'forms' ? 'black' : 'white',
            color: view === 'forms' ? 'white' : 'black',
            padding: '8px 16px',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Forms
        </button>
        <button 
          onClick={() => setView('tables')}
          style={{ 
            backgroundColor: view === 'tables' ? 'black' : 'white',
            color: view === 'tables' ? 'white' : 'black',
            padding: '8px 16px',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tables
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {renderContent()}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
