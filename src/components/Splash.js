import React from 'react';
import treble from './../assets/treble.png'

const Splash = () => {

  return (
    <div className='splash'>
      <div className='splash-section-1'>

        <div className='splash-section-1-left'>
          <h1>Unlock Insights into Your Music Taste</h1>
          <h2>Dive into the data behind your musical taste, gaining valuable insights that illuminate your listening habits</h2>
          <br/>
          <br/>
          <a href='http://localhost:8000/login' className='login-link'> Login to Spotify </a>
        </div>

        <div className='splash-section-1-right'>
          <img className='splash-img-1' src={treble} />
        </div>

        {/* <div class="bar-animation">
          <div class="equalizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div> */}


      </div>
      <div className='splash-section-2'>
        
        <div className='splash-section-2-column'>
          <h2>Analyze Musical Trends</h2>
          <h3>Identify the most common key, tempo, and other musical qualities across your playlists.</h3>
        </div>

        <div className='splash-section-2-column'>
          <h2>Understand Your Preferences</h2>
          <h3>Gain insights into your music taste and explore the patterns that define your unique musical identity.</h3>
        </div>

        <div className='splash-section-2-column'>
          <h2>Share and Connect</h2>
          <h3>Share your insights with friends, compare musical tastes, and discover new playlists together</h3>
        </div>


      </div>
      <div className='splash-section-3'>
        <div className='splash-section-3-column'> 
          <h4>Blah</h4>
          <h5>blaablabh</h5>
          <h5>blaablabh</h5>
          <h5>blaablabh</h5>
        </div>
        <div className='splash-section-3-column'> 
          <h4>Blah</h4>
          <h5>blaablabh</h5>
          <h5>blaablabh</h5>
          <h5>blaablabh</h5>
        </div>
        <div className='splash-section-3-column'> 
          <h4>Blah</h4>
          <h5>blaablabh</h5>
          <h5>blaablabh</h5>
          <h5>blaablabh</h5>
        </div>
      </div>
    </div>
  )
}

export default Splash