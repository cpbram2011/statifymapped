import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SingleTrack from './SingleTrack'


const Tracks = () => {
  const [ targetTrack, setTargetTrack ] = useState(0)
  const [ sort, setSort ] = useState('date added')
  const { tracks, features } = useSelector(state => state.spotify)


  useEffect(() => {
    if (targetTrack === 0 && features.length) {
      setTargetTrack({...tracks[0], ...features[0]})
    }
  }, [tracks, features, sort])

  let order = []  //[[0, 34], [1, 12], [2,8],...]
  if (sort === 'date added') {
    tracks.forEach((_,i) => order.push([i, tracks.length - i -1]))
  } else if (sort === 'popularity') {
    tracks.forEach((x,i) => { order.push([i, x.popularity]) })
  } else {
    features.forEach((x, i) =>{
      if (!x ) {
        console.log('huh', tracks[i], features[i], i)
        return
      }
       order.push([i, x[sort]])
      }
    )
  }
  order = order.sort((x,y) => y[1] - x[1]) //???

  const trackEles = []
  order.forEach((x, i)=> {
    const ele = tracks[x[0]];
    let minutes = Math.floor((ele.duration_ms / 1000) / 60).toString()
    let seconds = Math.floor((ele.duration_ms / 1000) % 60)
    seconds = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString()
    const style = x[0] === 0 ? "selected-track" : ""
    trackEles.push(
      <li id={i} key={i} className={style}
        onClick={() => {
          console.log(ele, features[x[0]])
          
          setTargetTrack({...ele, ...features[x[0]]})
        }}
      >
      <div className="track-row">
        <div className="track-row-left">
          <img className="album-art" src={ele.album.images[0].url} alt="album art"></img>
          <div className="song-info">
            <p className='song-title'>"{ele.name}"</p>
            <p className="song-artist">{ele.artists[0].name}</p>
          </div>
        </div>
        <div className="track-row-right">
          <p className="song-duration"> {minutes}:{seconds}</p>
        </div>
        
      </div>
    </li>)
  })

  if (tracks.length < 1 || features.length < 1 || tracks.length !== features.length) return <>wut</>
  return (
    <div className="flex-container tracks-container">
      
      <div className="=flex-item track-list-container">
        <h1>Track List</h1>
        <div className='sortby'>

        <p>Sort By: </p> 
        <select className='select' onChange={e => setSort(e.target.value)}>
          <option value="date added">Date Added</option>
          <option value="popularity">Popularity</option>
          <option value="liveness">Liveness</option>
          <option value="energy">Energy</option>
          <option value="valence">Valence</option>
          <option value="danceability">Danceability</option>
        </select>
        </div>
        <ul className="track-list">
          {trackEles}
        </ul>
      </div>
      <div className="flex-item-long track-details-container"> 
        <SingleTrack datum={targetTrack} />
      </div>
  </div>
  )
}

export default Tracks