import React from 'react';

const App = () => {
  return (
    <div className='main-content'>
      <h2>Forms Application</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
