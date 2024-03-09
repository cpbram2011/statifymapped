import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTokens } from './reducers/session_reducer';
import './App.css';
import Splash from './components/Splash'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Axios from './util/axios'
import Loading from './components/Loading';


function App() {
  const dispatch = useDispatch()
  const {isAuthenticated, refresh_token, loading} = useSelector(state => state.session)


  useEffect(() => {
    const tokens = getHashParams()
    if (tokens.access_token) {
      dispatch(setTokens(tokens))
    }
  }, [])

  const getHashParams = () => {
    const hashParams = {}
    const reg = /([^&;=]+)=?([^&;]*)/g
    const hash = window.location.hash.substring(2);
    let e = reg.exec(hash)
    while ( e ) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = reg.exec(hash)
    }
    return hashParams;

  }

  const getRefreshTokens = () => {
    Axios.get('http://localhost:8000/refresh_token', {
      params: {
        refresh_token: refresh_token
      }
    }).then(res => {
      window.location.href=`/#/access_token=${res.data.access_token}&refresh_token=${res.data.refresh_token}`
    })
  }
  

  return (
    <div className="App">
      <Navbar />

        { loading ? <Loading /> :
        <>
          { !isAuthenticated ?
            <Splash />
            :
            <>
              <Home />
            </>
          }
        
        </>
        }

      

     
    </div>
  );
}

export default App;
