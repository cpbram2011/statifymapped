import React, { useState, useEffect } from 'react';
import { fetchPlaylists, setSelected } from '../reducers/spotify_reducer';
import { useDispatch } from 'react-redux';
import DataSelector from './DataSelector';
import Graph from './Graph';
import DynoGraph from './DynoGraph';
import Tracks from './Tracks';

const Home = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchPlaylists())
    dispatch(setSelected({target: 'top'}))
  }, [])


  
  return (
    <div className='home'>
      <DataSelector />
      <Graph />
      <DynoGraph />
      <Tracks />
    </div>
  )
}


export default Home;

