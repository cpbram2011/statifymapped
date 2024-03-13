import React, { useState, useEffect } from 'react';
import { fetchPlaylists, setSelected } from '../reducers/spotify_reducer';
import { useDispatch } from 'react-redux';
import DataSelector from './DataSelector';
import Graph from './Graph';
import DynoGraph from './DynoGraph';
import Tracks from './Tracks';
import { Footer } from './Splash';

const Home = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchPlaylists())
    dispatch(setSelected({target: 'recent'}))
  }, [])


  
  return (
    <div className='home'>
      <DataSelector />
      <Graph />
      <DynoGraph />
      <Tracks />
      <Footer />
    </div>
  )
}


export default Home;

