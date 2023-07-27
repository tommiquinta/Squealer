import React from 'react';
import Squeal from './Squeal';
import Tweetbox from './Tweetbox';
import './/CSS/TimeLine.css';

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
      {/* Per aggiungere un tweet */}
      <div className='Tweetbox'>
        <Tweetbox></Tweetbox>

      </div>

      {/* Il vero Feed */}
      <div className="post-container">
        <Squeal
          username="Yoshi"
          text="Sono un post carinissimo"
          avatar={"https://download.seaicons.com/icons/ph03nyx/super-mario/256/Yoshis-Egg-icon.png"}
          img={"https://i.pinimg.com/originals/5a/3e/b0/5a3eb00df5875bd66cd2e9bc9abfd083.jpg"}
        />
        <Squeal
          username="Dry Bones"
          text="Sono un post carinissimo"
          // avatar={"https://download.seaicons.com/icons/ph03nyx/super-mario/256/Yoshis-Egg-icon.png"}
          avatar={"https://static.wikia.nocookie.net/fantendo/images/f/f5/DrySkull.png"}
          // img={"https://static.wikia.nocookie.net/mario/images/6/64/Super_Dry_Bones_Party_artwork.png"}
          img={"https://i0.wp.com/v1cdn.destructoid.com/169894_01-620x.jpg?resize=620%2C350&ssl=1"}
        // avatar={"https://static.wikia.nocookie.net/fantendo/images/f/f5/DrySkull.png/revision/latest?cb=20100305171902"}
        />
      </div>
    </div>
  );
}




export default TimeLine;