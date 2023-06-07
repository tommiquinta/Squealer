import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import './App.css';


function App() {
  return (
    <div className="app">

      
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />


      {/* Widgets */}
      <Widget />

    </div>
  );
}

export default App;
