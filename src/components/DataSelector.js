import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected } from '../reducers/spotify_reducer';

const DataSelector = () => {
  const dispatch = useDispatch()
  const [ target, setTarget] = useState('top')
  const [ timeRange, setTimeRange ] = useState('short_term')

  const { playlists } = useSelector(state => state.spotify)

  const handleChange = e => {
    if (e.time_range) dispatch(setSelected({target: e.target, time_range: e.time_range})) 
    else dispatch(setSelected({target: e.target}))
    setTarget(e.target)
    setTimeRange(state => e.time_range || state)
  }
  
  return (
    <div className='data-selector'>
      <p >Based on your</p>
      <select className='select' onChange={e => handleChange({ target: e.target.value})}>
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
            <p >from the past </p>
            <select className='select' onChange={e => handleChange({target: 'top', time_range: e.target.value})}>
              <option selected={timeRange === 'short_term'} value="short_term">4 weeks</option>
              <option selected={timeRange === 'medium_term'} value="medium_term">6 months</option>
              <option selected={timeRange === 'long_term'} value="long_term">All time</option>
            </select>
          </>
      }

    </div>
  )
}

export default DataSelector;
