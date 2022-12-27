import React, {useState, useEffect } from 'react'
import Settings from './components/Settings'
import PlayGame from './components/PlayGame'
import LoadingIndicator from './components/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios'

import './styles/App.css';





export default function NewApp() {
    // VARIABLES
    // API related variables
    const [dataArray, setDataArray] = useState(0)
    const [axiosComplete, setAxiosComplete] = useState(false)
        //make sure array has max 49

    // Settings related variables
    const [rounds, setRounds] = useState(5)
    const [musicPlayTime, setMusicPlayTime] = useState(2000)
    const [genres, setGenres] = useState("Top USA Chart")

    // Game related variables
        //counts number of rounds played
    const [counter, setCounter] = useState(0)
    const [score, setScore] = useState(0)
    const [totalArrayCount, setTotalArrayCount] = useState(0)



    // API CALL
    useEffect(()=>{
        let playlistID 
        if (genres === "Top USA Chart") {
            playlistID = 1313621735
        } else if (genres === "K-Pop") {
            playlistID = 4096400722
        } else if (genres === "Christian"){
            playlistID = 1684756293
        }
        console.log("env loading")

        const options = {
          method: 'GET',
          url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistID}`,
          headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
            'X-RapidAPI-Host': `${process.env.REACT_APP_API_HOST}`
          }
        }        
        console.log(process.env.REACT_APP_API_KEY)

        console.log(process.env.REACT_APP_API_KEY)
        console.log("not working env")

        trackPromise(
          axios.request(options).then(function (response) {
            console.log("data received")
            let titleArray = response.data.tracks.data.map((item)=>item.title)
            let noDuplicatedTitleArray = [...new Set(titleArray)]
            let i = 0
            setDataArray(response.data.tracks.data.map((item, key)=>{
                if (item.title === noDuplicatedTitleArray[i]) {
                    console.log("getting data")
                    i = i+ 1;
                    setTotalArrayCount(i)
                    return (
                        {
                            id: item.id, 
                            audio: item.preview, 
                            title: item.title,
                            artist: item.artist.name, 
                            image: item.album.cover
                        }
                    )
                }
            }))
            setAxiosComplete(true)
          }).catch((error) => {
            console.error(error)
          })
        )
        },[genres])
    
    // FUNCTIONS
    // Settings related functions
    const handleRounds = (rounds) => {
        setRounds(rounds)
    }
    const handleMusicPlayTime = (musicPlayTime) => {
        setMusicPlayTime(musicPlayTime)
    }
    const handleGenres = (genre) => {
        setGenres(genre)
    }

    // Game related functions
    const handleCounter = (counter) =>{
        setCounter(counter)
    }
    const handleScore = (score) => {
        setScore(score)
    }


    return(
        <div className="App">
            <main className="glass-container">
                <div className="settings-container">
                    <Settings 
                        rounds={rounds}
                        handleRounds={handleRounds}
                        musicPlayTime={musicPlayTime}
                        handleMusicPlayTime={handleMusicPlayTime}
                        handleGenres={handleGenres}

                    />
                    
                </div>
                <div className="game-container">
                    <LoadingIndicator/>
                    <div className="status-container">
                            {counter<rounds ? 
                            <>
                            <div className="left-game-status">
                                <p>Round: {counter+1}</p>
                                <p>Music Time: {`${musicPlayTime/1000}s`}</p>
                            </div>
                            <div className="right-game-status">
                                <p>Score: {score}</p>
                            </div>
                            </>: ""}
                        </div>
                        <div className="content-container">
                        {axiosComplete ? 
                            <>
                                <PlayGame
                                    counter={counter} 
                                    rounds={rounds}
                                    dataArray={dataArray}
                                    musicPlayTime={musicPlayTime}
                                    handleCounter={handleCounter}
                                    axiosComplete={axiosComplete}
                                    score={score}
                                    handleScore={handleScore}
                                    totalArrayCount={totalArrayCount}
                                />
                            </>

                            :
                            ""
                        }
                        </div>
                </div>
            </main>
            <div className="circle1"></div>
            <div className="circle2"></div>     
        </div>
    )
}

// audio={dataArray[totalSongsInArray].audio}/>
// <img src={dataArray[totalSongsInArray].image} alt="album-cover" />
// <p>{dataArray[totalSongsInArray].title}</p>
// <p>{dataArray[totalSongsInArray].artist}</p>