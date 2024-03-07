import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Bar } from 'react-chartjs-2';
import dynoDescriptions from './dynoText';


const DynoGraph = () => {
  const [dyno, setDyno] = useState('popularity')
  const { tracks, features } = useSelector(state => state.spotify)
  
  const oneFive = n => {  //16
    n -= (n % 5)  //15
    return (n / 5); //3
  }
  const zeroFive = n => {  //.169
    n = Math.floor(n * 100)   //16
    n -= (n % 5)  //15
    return (n / 5);
}
  const acousticness = new Array(20).fill(0);
  const danceability = new Array(20).fill(0);
  const energy = new Array(20).fill(0);
  const instrumentalness = new Array(20).fill(0);
  const liveness = new Array(20).fill(0);
  const speechiness = new Array(20).fill(0);
  const valence = new Array(20).fill(0);


  const labels = []
  for (let i = 0; i < 100; i += 5){
    labels.push(i / 100)
  }

  const avg = arr => {
    let ans =  0;
    let c = 0
    arr.forEach((x,i) => {
        ans += labels[i] * x;
        c += x
    });
    ans /= c;
    return Math.floor(ans * 100) / 100
  }

  const popularity = new Array(20).fill(0);
    features.forEach(datum => {
      if (!datum) return
      acousticness[zeroFive(datum.acousticness)]++;
      danceability[zeroFive(datum.danceability)]++;
      energy[zeroFive(datum.energy)]++;
      instrumentalness[zeroFive(datum.instrumentalness)]++;
      liveness[zeroFive(datum.liveness)]++;
      speechiness[zeroFive(datum.speechiness)]++;
      valence[zeroFive(datum.valence)]++;
    })

  if (tracks[0])
    tracks.forEach(item => {
      popularity[oneFive(item.popularity)]++;
    });
  const dynoData = {
    popularity,
    acousticness,
    danceability,
    energy,
    instrumentalness,
    energy,
    liveness,
    speechiness,
    valence
  }

  useEffect(() => {
    const selector = document.getElementById('selectDyno')
    selector.childNodes.forEach(button => {
      if (button.value === dyno) button.className = button.value + ' selected'
      else button.className = button.value    
    });
  });


  const currentData = {
      labels,
      datasets: [{
          data: dynoData[dyno],
          backgroundColor: '#ED45A7',
      }]
  };

  const dynoOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 10
        },
        gridLines: {
          color: "#969696"
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false   
    }
  };

  return (
    <div className='dynoParent'>
      <div id='selectDyno'>
        <button value='acousticness' onClick={() => setDyno('acousticness')}>Acousticness</button>
        <button value='danceability' onClick={() => setDyno('danceability')}>Danceability</button>
        <button value='energy' onClick={() => setDyno('energy')}>Energy</button>
        <button value='instrumentalness' onClick={() => setDyno('instrumentalness')}>Instrumentalness</button>
        <button value='liveness' onClick={() => setDyno('liveness')}>Liveness</button>
        <button value='speechiness' onClick={() => setDyno('speechiness')}>Speechiness</button>
        <button value='valence' onClick={() => setDyno('valence')}>Valence</button>
        <button value='popularity' onClick={() => setDyno('popularity')}>Popularity</button>
      </div>
      <div className="centerDyno">
        <div className='dynoGraph'>
          <Bar 
            data={currentData}
            options={dynoOptions}
            // height={400}
            // width={700}
          />
        </div>
        <div className='dynoText'>
          <p id="average">Average {dyno}: {avg(dynoData[dyno])}</p>
          <p className='descriptions'> {dynoDescriptions(dyno)}</p>
        </div>
      </div>
    </div>
  )
}

export default DynoGraph