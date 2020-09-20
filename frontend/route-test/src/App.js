import React from 'react';
import Routes from './Components/Routes';
import Navbar from './Components/Navbar';
import './Styles/App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><strong>{'\u2203'}</strong>NGAUGE</h1>
        <Navbar />
      </header>
      <div className="headblock headblock3" />
      <div className="headblock headblock2" />
      <div className="headblock headblock1" />
      <Routes />
    </div>
  )
}

export default App;