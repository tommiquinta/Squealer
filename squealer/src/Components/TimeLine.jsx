import React from 'react';
import Squeal from './Squeal';
import Tweetbox from './Tweetbox';
import './/CSS/TimeLine.css';
import Header from './Header';

function TimeLine() {

  return (
    
    <div>
      <Header/>
      {/* Per aggiungere un tweet */}
      <div className='Tweetbox'>
        <Tweetbox/>

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