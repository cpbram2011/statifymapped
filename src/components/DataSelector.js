import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected } from '../reducers/spotify_reducer';

//TODO: switch to local state
const DataSelector = () => {
  const dispatch = useDispatch()
  const [ target, setTarget] = useState('top')
  const [ timeRange, setTimeRange ] = useState('short_term')

  const { playlists } = useSelector(state => state.spotify)

  const handleChange = e => {
    dispatch(setSelected({target: e.target.value}))
    setTarget(e.target.value)
  }
  
  return (
    <div className='data-selector'>
      <p>Based on your</p>
      <select onChange={e => dispatch(setSelected({ target: e.target.value}))}>
        <option value="top">Top Tracks</option>
        <option value="recent">Most Recent Tracks</option>
        <option value="liked">Liked Tracks</option>
        <option value="playlist" disabled>— Playlists —</option>
          {playlists.map( (listItem, idx) => (
            <option key={`playlist-${idx}`} value={listItem.id}>{listItem.name}</option>
          ))}
      </select>

      {target === 'top' && 
          <>
            <p>from the past </p>
            <select onChange={e => dispatch(setSelected({target: 'top', time_range: e.target.value}))}>
              <option value="short_term">4 weeks</option>
              <option value="medium_term">6 months</option>
              <option value="long_term">All time</option>
            </select>
          </>
      }

    </div>
  )
}

export default DataSelector;
