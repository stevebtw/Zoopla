import React from 'react';
import Header from './components/Header';
import Properties from './utils/FetchData';
import './App.css';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <Header />
      <Properties />
    </div>
  );
}

export default App;
