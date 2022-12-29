import React, {useState, useEffect } from 'react'
import Settings from './components/Settings'
import PlayGame from './components/PlayGame'
import LoadingIndicator from './components/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios'
import HeroSection from './components/HeroScreen';
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

    // Settings & Game related variables
    const [startClick, setStartClick] = useState()


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
        const options = {
          method: 'GET',
          url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistID}`,
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
          }
        }
        trackPromise(
          axios.request(options).then(function (response) {
            let titleArray = response.data.tracks.data.map((item)=>item.title)
            let noDuplicatedTitleArray = [...new Set(titleArray)]
            let i = 0
            setDataArray(response.data.tracks.data.map((item, key)=>{
                if (item.title === noDuplicatedTitleArray[i]) {
                    i = i+ 1;
                    setTotalArrayCount(i)
                    return (
                        {
                            key: key,
                            id: item.id, 
                            audio: item.preview, 
                            title: item.title,
                            artist: item.artist.name, 
                            image: item.album.cover
                        }
                    )
                }
            }))
            setTimeout(()=>{setAxiosComplete(true)},700)
            console.log(`axioscomplete is ${axiosComplete? "true": "false"}`)

          }).catch((error) => {
            console.error(error)
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
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
    // Settings and Games related functions
    const handleStartClick = (boolean) => {
        setStartClick(boolean)
    }

    // Game related functions
    const handleCounter = (counter) =>{
        setCounter(counter)
    }
    const handleScore = (score) => {
        setScore(score)
    }
    const handleAxiosComplete = (boolean) =>{
        setAxiosComplete(boolean)
    }

    return(
        <div className="App">
            <HeroSection/>
            <main className="glass-container">
                <div className="settings-container">
                    <Settings 
                        rounds={rounds}
                        handleRounds={handleRounds}
                        musicPlayTime={musicPlayTime}
                        handleMusicPlayTime={handleMusicPlayTime}
                        handleGenres={handleGenres}
                        startClick={startClick}
                        axiosComplete={axiosComplete}
                        handleAxiosComplete={handleAxiosComplete}

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
                                    score={score}
                                    handleScore={handleScore}
                                    totalArrayCount={totalArrayCount}
                                    startClick={startClick}
                                    handleStartClick={handleStartClick}
                                />
                            </>

                            :
                            ""
                            }
                        </div>
                </div>
            </main>
            
            {/* <div className="circle1"></div>
            <div className="circle2"></div>      */}
        </div>
    )
}

