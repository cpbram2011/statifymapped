import React from 'react';
import treble from './../assets/treble.png'
import splashIcon1 from './../assets/splashicon1.png'
import splashIcon2 from './../assets/splashicon2.png'
import splashIcon3 from './../assets/splashicon3.png'

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


      </div>
      <div className='splash-section-2'>
        
        <div className='splash-section-2-column'>
          <img className='splash-icon' src={splashIcon1} />

          <h2>Analyze Musical Trends</h2>
          <h3>Identify the most common key, tempo, and other musical qualities across your playlists.</h3>
        </div>

        <div className='splash-section-2-column'>
        <img className='splash-icon' src={splashIcon2} />

          <h2>Understand Your Preferences</h2>
          <h3>Gain insights into your music taste and explore the patterns that define your unique musical identity.</h3>
        </div>

        <div className='splash-section-2-column'>
          <img className='splash-icon' src={splashIcon3} />

          <h2>Share and Connect</h2>
          <h3>Share your insights with friends, compare musical tastes, and discover new playlists together</h3>
        </div>


      </div>
      <div className='splash-section-3'>

        <div className='splash-section-3-column'> 
          <h4>Contact</h4>
          <h5 className='link' onClick={() => window.open("https://github.com/cpbram2011", '_blank').focus()}>Github</h5>
          <h5 className='link' onClick={() => window.open("https://www.linkedin.com/in/chris-bram/", '_blank').focus()}>LinkedIn</h5>
          <h5 className='link' onClick={() => window.open("https://cpbram2011.github.io/", '_blank').focus()}>Portfolio</h5>
        </div>

        <div className='splash-section-3-column'> 
          <h4>About</h4>
          <h5 style={{width: '500px', lineHeight: '25px'}} > 
            Statify is a web app that uses Spotify API to connect to your 
            Spotify account and display graphs with data pulled from your
            listening history, saved tracks, and playlists.
          </h5>
        </div>

      </div>
    </div>
  )
}

export default Splash