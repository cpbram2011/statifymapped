import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected } from '../reducers/spotify_reducer';

const DataSelector = () => {
  const dispatch = useDispatch()
  const [ target, setTarget] = useState('')
  const [ timeRange, setTimeRange ] = useState('short_term')
  const { playlists, validUser } = useSelector(state => state.spotify)

  const handleChange = e => {
    if (e.time_range) dispatch(setSelected({target: e.target, time_range: e.time_range})) 
    else dispatch(setSelected({target: e.target}))
    setTarget(e.target)
    setTimeRange(state => e.time_range || state)
  }

  useEffect(() => {
    if (!validUser) {
      handleChange({target: '37i9dQZF1DXcBWIGoYBM5M'})
    }
  }, [validUser])
  
  return (
    <>
    <div className='data-selector'>
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
            <option style={{height: '100px'}} value='37i9dQZF1DXcBWIGoYBM5M'> Today's Top Hits</option>
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
    </>
  )
}

export default DataSelector;
