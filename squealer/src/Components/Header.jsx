import React from 'react';
import Squeal from './Squeal';
import Tweetbox from './Tweetbox';
import './/CSS/TimeLine.css';

function Header() {

  function select(idBtn) {
    //elimina effetto precedente
    const otherBtn = document.getElementsByClassName("selected");
    if (otherBtn.length > 0) {
      var blueBar = otherBtn[0].querySelector('.blueBar');
      blueBar.style.display = 'none';
      otherBtn[0].classList.remove("selected");
    }
    //imposta il nuovo effetto
    var button = document.getElementById(idBtn);
    button.classList.add('selected');
    blueBar = button.querySelector('.blueBar');
    blueBar.style.display = 'block';
  }


return(
    <div id="header">
      <p id="focus-page">Home</p>
      <div className="headerTL">
        <div class="btns">
          <button id="forYouBtn" onClick={() => select('forYouBtn')} class="headerBtns selected">For you
            <div class="blueBar" style={{ display: 'block' }}></div>
          </button>
          <button id="followingBtn" onClick={() => select('followingBtn')} class="headerBtns">Following
            <div class="blueBar"></div>
          </button>
        </div>
      </div>
    </div>
);
}

export default Header;