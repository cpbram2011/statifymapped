import React, { useState } from 'react';
import treble from './../assets/treble.png'
import splashIcon1 from './../assets/splashicon1.png'
import splashIcon2 from './../assets/splashicon2.png'
import splashIcon3 from './../assets/splashicon3.png'
import SpotifyLogo from '../assets/spotifylogo.js'
import { MdCopyAll } from "react-icons/md";

export const Footer = () => (
  <div className='splash-section-3'>
    <div className='splash-section-3-column'> 
      <h4>About</h4>
      <h5> 
        Statify Mapped is a web app that uses Spotify API to connect to your 
        Spotify account and display graphs with data pulled from your
        listening history, saved tracks, and playlists.
      </h5>
      <div className='faq'>
        <h3>F.A.Q.</h3> 
        <h5 className='bold' >Is it secure?</h5>
        <h5>Statify Mapped adheres to all the latest standards in web security. And as logging in to Statify Mapped is handled by Spotify, it's as secure as logging in to Spotify itself.</h5>
        <h5 className='bold' >How is my data used?</h5>
        <h5>To use Statify Mapped, you'll need to allow the app to have access to some of your account information. Your data is only used to calculate an average with which users can compare their own scores.</h5>        
        <h5 className='bold' >I have some other issue (or concern, compliment, suggestion, etc.)</h5>
        <h5><a className='email' href='mailto:cpbram2011@gmail.com'>Feel free to reach out via email!</a></h5>
      </div>
      

      <div className='spotify-credit-container'>
        <h5>
          All data is provided by 
        </h5>
        <SpotifyLogo />
      </div>
    </div>

    <div className='splash-section-3-column'> 
      <h4>Contact</h4>
      <h5 className='link' onClick={() => window.open("https://github.com/cpbram2011/statifymapped", '_blank').focus()}>Github</h5>
      <h5 className='link' onClick={() => window.open("https://www.linkedin.com/in/chris-bram/", '_blank').focus()}>LinkedIn</h5>
      <h5 className='link' onClick={() => window.open("https://cpbram2011.github.io/", '_blank').focus()}>Portfolio</h5>
    </div>

  </div>
)

const Splash = () => {
  const [modal, setModal] = useState(false)
  const redirect_uri = 
    (process.env.NODE_ENV === 'production') ?
      // 'https://statifymapped-b581e01ec5ad.herokuapp.com/login'
      'https://www.statifymapped.com/login'
    :
      'http://localhost:8000/login'
    ;


  return (
    <div className='splash'>
      <div className='splash-section-1'>
        <div className='splash-section-1-text'>
          <h1>Unlock Insights into Your Music Taste</h1>
          <h2>Dive into the data behind your musical taste, gaining valuable insights that illuminate your listening habits</h2>
          <br/>
          <br/>
          <p onClick={() => setModal(true) } className='login-link'> Login to Spotify </p>
        </div>

      <div className='splash-img-container'>
        <img className='splash-img-1' src={treble} />
      </div>
      {modal && 
        <div className='splash-modal'>
          <h4>Statify Mapped is currently in Limited Quota Mode</h4>
          <h5>This platform is being reviewed for compliance with Spotify's Developer Policy.
            While this review is pending, new users will only be granted access tokens if they are manually added to the API's whitelist.
          </h5>
          <div style={{marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5>Send an email to <a className='email' href='mailto:cpbram2011@gmail.com'>cpbram2011@gmail.com</a> to request access</h5>
            <h4>or</h4>
            <h5>use the following credentials to explore the app right away:</h5>
          
          <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
            <h5>email: </h5>
            <h5 className='bold'> demo-user@mail.com <MdCopyAll style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText('demo-user@mail.com')}/></h5>
          </div>
          <div style={{display: 'flex', gap: '5px',  alignItems: 'center'}}>
            <h5>password: </h5>
            <h5 className='bold'> sfjlwruo2479 <MdCopyAll style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText('sfjlwruo2479')}/></h5>
          </div>
          <p onClick={() => window.location.href=redirect_uri } className='login-link'> I understand, take me to the login page</p>
          </div>
        </div>
      }


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
      <Footer />
    </div>
  )
}

export default Splash