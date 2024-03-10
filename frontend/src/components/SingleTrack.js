import { Radar } from 'react-chartjs-2'


const SingleTrack = ({datum}) => {
    if (!datum){
        return null
    }
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
    const albumArtUrl = datum.album.images[0].url
    
    const trackData = [
        datum.popularity / 10, 
        datum.energy * 10, 
        datum.danceability * 10, 
        datum.valence * 10, 
        datum.liveness * 10, 
        datum.instrumentalness * 10
    ]
        
    const data = {
        labels: [
            'Popularity',  
            'Energy', 
            'Danceability', 
            'Valence', 
            'Liveness',
            'Instrumentalness', 
        ],
        datasets: [
            {
                label: '1 to 10',
                data: trackData,
                backgroundColor: 'rgba(30, 215, 96, 0.5)',
                borderColor: 'rgba(30, 315, 96, 1)',
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
                color: 'rgba(125, 125, 125, .5)',
                lineWidth: 2,
                borderColor: 'rgba(125, 125, 125, .6)',
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true
            },
            angleLines: { color: 'rgba(250, 250, 250, .6)' }
        },
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
    maintainAspectRatio: false
    };
    
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <>
            <div className="track-details">
                <img src={albumArtUrl} alt="album" className="track-details-img"/>
                <div className='track-details-text-container'>
                    <h2 className='track-details-title' onClick={() => openInNewTab(datum.external_urls.spotify)}>{datum.name}</h2>
                    <span className='track-details-album'> {datum.album.name} </span>
                    <span className='track-details-date'> • {datum.album.release_date.slice(0, 4)} </span>
                    <p className='track-details-artist'> {datum.artists[0].name} </p>
                    <p className='track-details-props'> Tempo: {Math.floor(datum.tempo)} BPM </p>
                    <p className='track-details-props'> Key: {keyArr[datum.key]} {modes[datum.mode]} </p>
                    <p className='track-details-props'>Beats Per Bar: {datum.time_signature}</p>
                </div>
                
            </div>
            <div className='radar-container'>
                <Radar data={data} options={options} />
            </div>

        </>
    )

}

export default SingleTrack;