import React from "react";
import './App.css';

import Sidebar from './/Components/Sidebar.jsx';
import TimeLine from './/Components/TimeLine.jsx';
import Widgets from './/Components/Widgets.jsx';


// sto usando questa palette qui per ora: https://coolors.co/0d1b2a-1b263b-415a77-778da9-e0e1dd
//sto seguendo questo tutorial qui: https://www.youtube.com/watch?v=rJjaqSTzOxI 


function App() {
  return (

    <div className="App">
      <main class="main-tl">

        <section class="left-menu">
          {/* Sidebar */}
          <Sidebar />
        </section>

        <hr class="vl" />
        <section class="timeline">
          {/* TL */}
          <TimeLine />
        </section>

        <hr class="vl" />
        <section>
          {/* Widgets */}
          <Widgets />
        </section>
      </main>

    </div>
  );
}

export default App;