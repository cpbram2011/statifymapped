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

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('light-mode');
  };
  

  return (
    <div className='navbar'>
      <header>Spotify <span className='mapped'>mapped</span></header>

      {session.isAuthenticated &&
        <div className='navbar-drop-btn' onClick={() => setDropdown(state => !state)}>
          <img src={blankPfp} className='pfp' />
          {session.username}
          <IoMdArrowDropdown />
        </div>
      }
      { dropdown && 
        <div className='dropdown'>
          <div className="dropdown-item">lorem</div>
          <div className="dropdown-item">
            
          <button onClick={toggleTheme}>
            {!isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          </div>
          <div className="dropdown-item" onClick={() => { dispatch(logout()); setDropdown(false); window.location.href='/' }}>Logout</div>
        </div>
      }
    </div>
  )
}

export default Navbar