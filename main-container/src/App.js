import React, { Suspense, useState } from 'react';

const Forms = React.lazy(() => import('forms/Form'));
const Tables = React.lazy(() => import('tables/Table'));
const Table1 = React.lazy(() => import('tables1/Table1'));

const App = () => {
  const [view, setView] = useState('forms');

  const renderContent = () => {
    if (view === 'forms') {
      return <Forms />;
    }
    if (view === 'tables') {
      return <Tables />;
    }
    if (view === 'tables1') {
      return <Table1 />;
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
            marginRight: '10px',
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
        <button 
          onClick={() => setView('tables1')}
          style={{ 
            backgroundColor: view === 'tables1' ? 'black' : 'white',
            color: view === 'tables1' ? 'white' : 'black',
            padding: '8px 16px',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tables1
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
