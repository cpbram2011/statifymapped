import React from 'react';
import { useSelector } from 'react-redux';
import 'chart.js/auto';
import Loading from './Loading';
import { Doughnut, Bar } from 'react-chartjs-2';

const findIndexOfGreatest = (array) => {
  var greatest;
  var indexOfGreatest;
  for (var i = 0; i < array.length; i++) {
    if (!greatest || array[i] > greatest) {
      greatest = array[i];
      indexOfGreatest = [i];
    } else if (array[i] === greatest) {
      indexOfGreatest.push(i)
    }
  }
  return indexOfGreatest;
}

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')
canvas.width = 300;
canvas.height = 300;
const gradient = context.createLinearGradient(0, 0, 300, 0);
gradient.addColorStop(0, "rgb(0, 77, 255)");
gradient.addColorStop(0.5505050505050505, "rgb(114, 255, 86)");
gradient.addColorStop(1, "rgb(255, 20, 20)");
context.fillStyle = gradient;
context.fillRect(0, 0, 300, 300);



const Graph = () => {
  const { features, tracks, loading } = useSelector(state => state.spotify)
  const keys = [0,0,0,0,0,0,0,0,0,0,0,0];
  const keyArr = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B',];
  const modes = [0,0];
  const tempos = {};
  for (let i = 0; i < 241; i += 10) tempos[i] = 0;

  features.forEach((datum, idx) => {
    if (datum) {
      keys[datum.key] += 1;
      modes[datum.mode] += 1;
      let tempo = Math.floor(datum.tempo);
      tempo -= (tempo % 10)
      tempos[tempo] += 1
    }
  })

  const favKeyIndex = findIndexOfGreatest(keys);
  const favKey = favKeyIndex.map(x => keyArr[x]);

  let faveMode
  if (modes[0] === modes[1]){
      faveMode= 'Equal Parts Major and Minor'
  } else if (modes[0] < modes[1]) {
      faveMode= 'Most Common Mode: Minor'
  } else {
      faveMode= 'Most Common Mode: Major'
  }

  const favTempo = Object.keys(tempos).reduce((a, b)=>{ return tempos[a] > tempos[b] ? a : b });
  let speed;
  if (favTempo < 71)  speed = 'slow'
  else if (favTempo < 121)  speed = 'walking pace'
  else if (favTempo < 180) speed = 'fast'
  else speed = 'very fast'
  
  
  const keyData = {
    labels: keyArr,
    datasets: [{
      data: keys,
      backgroundColor: [ '#e6194B', '#f58231', 
        '#ffe119', '#bfef45', '#3cb44b', '#469990', '#42d4f4', 
        '#4363d8', '#000075', '#911eb4', '#f032e6', '#b20035', 
      ]
    }]
  };

  const keyOptions = { 
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  const modeData = {
    labels: ['Major', 'Minor'],
    datasets: [{
      data: modes,
      backgroundColor: [ '#e6194B', '#4363d8' ]
    }]
  };

  const modeOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 10,
        grid: {
          color: "#969696"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: true
  };
  

  const tempoData = {
    labels: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
    datasets: [{
      data: Object.values(tempos),
      backgroundColor: gradient
    }]
  };

  const tempoOptions = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          suggestedMax: 10
        },
        grid: {
          color: "#969696"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: true
  };
    
  return (
    <>
      {loading && <Loading />}
    <div className='flex-container'>
      <div className="flex-item">
        <p className="common-data">Most Common Key: {favKey.map((x, i) => i === favKey.length - 1 ? x : x + ' & ')}</p>
        
        <Doughnut
          data={keyData}
          options={keyOptions}
          height={400}
          width={420}
        />
        <div className='keysig'>
            ♯/♭
        </div>

      </div>
      <div className='flex-item'>
        <p className='common-data'>{faveMode}</p>
        <Bar
          height={400}
          width={420}
          data={modeData}
          options={modeOptions}
          />
      </div>
      <div className='flex-item'>
        <p className='common-data'>Average Tempo: {favTempo} bpm ({speed})</p>
        <Bar
          height={400}
          width={420}
          data={tempoData}
          options={tempoOptions}
        />
      </div>
    </div>
    </>
  )
}

export default Graph