import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/session_reducer';
import blankPfp from './../assets/blank-pfp.webp'
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('light-mode');
  };
  

  return (
    <div className='navbar'>
      <header>Spotify <span className='mapped'>mapped</span></header>

      {session.isAuthenticated &&
        <div className='navbar-drop-btn' onClick={() => setDropdown(state => !state)} >
          <img src={blankPfp} className='pfp' />
          {session.username}
          <IoMdArrowDropdown />
        </div>
      }
      { dropdown && 
        <div className='dropdown' >
          <div className="dropdown-item" onClick={() => setModalOpen(true)}>About</div>
          <div className='dropdown-item' onClick={toggleTheme}>
            {!isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div className="dropdown-item" onClick={() => { dispatch(logout()); setDropdown(false); window.location.href='/' }}>Logout</div>
        </div>
      }

      { modalOpen && 
      <div className='modal-container' onClick={() => setModalOpen(false)}>
        <div className='modal' onClick={ e => e.stopPropagation()}>
        <div className='x' onClick={() => setModalOpen(false)}>X</div>
          <h1>About Statify</h1>
          <h3>Overview</h3>
          <p>Statify is a web app that uses Spotify API to connect to your Spotify account and display graphs with data pulled from your listening history, saved tracks, and playlists.</p>
          <h1>F.A.Q.</h1> 
            <h3>Is it secure?</h3>
            <p>Statify adheres to all the latest standards in web security. And as logging in to Statify is handled by Spotify, it's as secure as logging in to Spotify itself.</p>
        
            <h3>How is my data used?</h3>
            <p>To use Statify, you'll need to allow the app to have access to some of your account information. Your data is only used to calculate an average with which users can compare their own scores.</p>        
         
            <h3>I have some other issue (or concern, compliment, maybe a suggestion)</h3>
            <a href='mailto:cpbram2011@gmail.com'>Feel free to reach out via email!</a>
              
        </div>
      </div>
      
      }
    </div>
  )
}

export default Navbar