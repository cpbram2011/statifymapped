import { Radar } from 'react-chartjs-2'


const SingleTrack = ({datum}) => {
    if (!datum){
        return null
    }
    console.log('datummmm', datum)
    if(datum.type === 'episode'){
        
        return (
            <h1 className="episode">
                Sorry, this is not a song...
            </h1>
        )
    }
    if(datum.type === 'track'){
        if (datum === undefined || datum === null){
        return null
        }
    }
    const keyArr = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',];
    const modes = ['Maj', 'Min']
    // const albumArtUrl = datum.album.images[0].url
    const albumArtUrl = ''
    
    const trackData = [datum.popularity / 10, 
        datum.liveness * 10, 
        datum.energy * 10, 
        datum.valence * 10, 
        datum.danceability * 10, 
        datum.instrumentalness * 10]
        
    const data = {
        labels: ['Popularity', 'Liveness', 'Energy', 'Valence', 'Danceability', 'Instrumentalness'],
        datasets: [
            {
                label: '1 to 10',
                data: trackData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                
             
            },
        ],
    }

    const options = {
      scales: {
        r: {
          ticks: { beginAtZero: true, stepSize: 1 },
          pointLabels: { fontSize: 20, fontColor: 'white' },
          grid: {
            color: 'rgba(250, 250, 250, .6)',
            lineWidth: 2,
            borderColor: 'rgba(250, 250, 250, .6)',
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true
          },
          angleLines: { color: 'rgba(250, 250, 250, .6)' }
        }
      }
    };
    
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <div className="dynoTrack-container">
            <div className="album-info">
                
                <div className="album-art-div" onClick={() => openInNewTab(datum.external_urls.spotify)}>
                    <img src={albumArtUrl} alt="album" className="dyno-albumart"/>
                    <p className="album-name-sm"><b>{datum.album.name}</b> 
                    <br/>
                    by {datum.artists[0].name}
                    </p>
                   
                </div>
                
                <div className="album-data-div">
                    <h2>"{datum.name}"</h2>
                    <p>
                        Tempo: {Math.floor(datum.tempo)} BPM
                        <br/>
                        Key: {keyArr[datum.key]} {modes[datum.mode]} 
                        <br/>
                        Beats Per Bar: {datum.time_signature}
                    </p>
                    
                    
                </div>

            </div>
            <div >
                <div className="radar">

                <Radar data={data} options={options} />
                </div>

            </div>
        </div>
    )

}

export default SingleTrack;