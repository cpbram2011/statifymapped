import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/session_reducer';
import blankPfp from './../assets/blank-pfp.webp'
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('dropdown-item')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('light-mode');
  };
  

  return (
    <div className='navbar'>
      <header>Statify <span className='mapped' >Mapped</span> </header>

      { session.isAuthenticated &&
        <div className='navbar-drop-btn' onClick={() => setDropdownOpen(state => !state)} ref={dropdownRef} >
          <img src={blankPfp} className='pfp' />
          {session.username}
          <IoMdArrowDropdown />
        </div>
      }
      { dropdownOpen && 
        <div className='dropdown'>
          <div className="dropdown-item" onClick={() => {setModalOpen(true); setDropdownOpen(false)}}>About</div>
          <div className='dropdown-item' onClick={toggleTheme}>
            {!isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div className="dropdown-item" onClick={() => { dispatch(logout()); setDropdownOpen(false); window.location.href='/' }}>Logout</div>
        </div>
      }

      { modalOpen && 
      <div className='modal-container' onClick={() => setModalOpen(false)}>
        <div className='modal' onClick={ e => e.stopPropagation()}>
        <div className='x' onClick={() => setModalOpen(false)}>X</div>
          <h1>About Statify Mapped</h1>
          <h3>Overview</h3>
          <p>Statify Mapped is a web app that uses Spotify API to connect to your Spotify account and display graphs with data pulled from your listening history, saved tracks, and playlists.</p>
          <h1>F.A.Q.</h1> 
            <h3>Is it secure?</h3>
            <p>Statify Mapped adheres to all the latest standards in web security. And as logging in to Statify Mapped is handled by Spotify, it's as secure as logging in to Spotify itself.</p>

            <h3>How is my data used?</h3>
            <p>To use Statify Mapped, you'll need to allow the app to have access to some of your account information. Your data is only used to calculate an average with which users can compare their own scores.</p>        

            <h3>I have some other issue (or concern, compliment, suggestion, etc.)</h3>
            <a className='email' href='mailto:cpbram2011@gmail.com'>Feel free to reach out via email!</a>
            
        </div>
      </div>
      
      }
    </div>
  )
}

export default Navbar