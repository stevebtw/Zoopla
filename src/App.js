import React from 'react';
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import './App.css';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <Header />
      <PropertyList />
    </div>
  );
}

export default App;
