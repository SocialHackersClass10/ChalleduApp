import React from 'react';
import './App.css';
import Welcome from "./components/welcome";
import Navbar from "./components/navbar";

function App() {
  return (
    <div id="root">
    <Navbar/> 
    <Welcome/>
    </div>
  );
}

export default App;
