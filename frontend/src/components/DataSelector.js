import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected } from '../reducers/spotify_reducer';

const DataSelector = () => {
  const dispatch = useDispatch()
  const [ target, setTarget] = useState('')
  const [ timeRange, setTimeRange ] = useState('short_term')
  const { playlists, validUser } = useSelector(state => state.spotify)
  const [ aboutBetaModdal, setAboutBetaModal ] = useState(false)

  const handleChange = e => {
    if (e.time_range) dispatch(setSelected({target: e.target, time_range: e.time_range})) 
    else dispatch(setSelected({target: e.target}))
    setTarget(e.target)
    setTimeRange(state => e.time_range || state)
  }

  useEffect(() => {
    if (!validUser) {
      handleChange({target: '37i9dQZEVXbLiRSasKsNU9'})
    }
  }, [validUser])
  
  return (
    <>
    <div className='data-selector'>
    <p> Based on </p>
      <select className='select' onChange={e => handleChange({ target: e.target.value})}>
        { validUser ? 
          <>
            <option style={{height: '100px'}} value="recent"> Most Recent Tracks </option>
            <option value="liked">Liked Tracks</option>
            <option value="top">Top Tracks</option>
            <option value="playlist" disabled>— Playlists —</option>
            {playlists.map( (listItem, idx) => (
              <option key={`playlist-${idx}`} value={listItem.id}>{listItem.name}</option>
            ))}
          </>
          : 
          <>
            <option value='37i9dQZEVXbLiRSasKsNU9'> Viral 50 - Global</option>
            <option value='6UeSakyzhiEt4NB3UAd6NQ'> Billboard Hot 100</option>
            <option value='37i9dQZF1DX0kbJZpiYdZl'> Hot Hits USA</option>
          </>
        }
      </select>
      {/* cbtodo: ask if this is lame */}
      {/* { !['top', 'recent', 'liked'].includes(target) && <p> playlist </p> } */}

      {target === 'top' && 
          <>
            <p >from the past </p>
            <select defaultValue={timeRange} className='select' onChange={e => handleChange({target: 'top', time_range: e.target.value})}>
              <option value="short_term">4 weeks</option>
              <option value="medium_term">6 months</option>
              <option value="long_term">All time</option>
            </select>
          </>
      }
    </div>
      { !validUser && 
        <p className='invalid-user-p'>
          Statify Mapped's full feature set is currently only available to accounts flagged as beta testers.     
          <span onClick={() => setAboutBetaModal(true)}>What's this mean?</span>
        </p>
      }
      { aboutBetaModdal &&
      <div className='modal-container' onClick={(e) => setAboutBetaModal(false)}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          <div className='x' onClick={() => setAboutBetaModal(false)} >X</div>
            <h4>Statify Mapped is currently in Limited Quota Mode</h4>
            <h5>This platform is being reviewed for compliance with Spotify's Developer Policy.
              While this review is pending, users that are not specifically whitelisted will only be able to pull data from a handful of publicly available collections.
            </h5>
            <h5>
              Whitelisted accounts can access the full range music collections, including:
            </h5>
            <h5> - Liked Tracks</h5>
            <h5> - Recently Played </h5>
            <h5> - Top Tracks, filtered by time range </h5>
            <h5> - All saved playlists, private and collaborative</h5>
            <div style={{marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h5>To request full access, send an email to <a className='email' href='mailto:cpbram2011@gmail.com'>cpbram2011@gmail.com</a></h5>
            </div>
        </div>

      </div>
      }
    </>
  )
}

export default DataSelector;
