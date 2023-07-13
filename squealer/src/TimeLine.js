import React from 'react';

function TimeLine() {

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


  return (
    <div>
      <div class="header">
        <p id="focus-page">Home</p>
        <div class="btns">
          <button id="forYouBtn" onClick={() => select('forYouBtn')} class="headerBtns selected">For you
            <div class="blueBar" style={{ display: 'block' }}></div>
          </button>
          <button id="followingBtn" onClick={() => select('followingBtn')} class="headerBtns">Following
            <div class="blueBar"></div>
          </button>
        </div>
        <hr />
      </div>
      <div class="tweet">

      </div>
    </div>
  );
}




export default TimeLine;