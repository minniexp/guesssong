import React, {useState, useRef, useEffect } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import AnswerList from "./components/answerList"
// import music from "./music/alarm_clock.ogg"
import './styles/App.css';

function App() {
  const [startClick, setStartClick] = useState(false)
  const [queryArray, setQueryArray] = useState([])
  // let playPromise = 
  // let pausePromise = audioElem.current.pause()
  const totalTracks = 20
  const totalRounds = 5

  const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
    }
    return [...nums]
  }

  // let queryArray = randomUnique(totalTracks, totalRounds)


  // useEffect (()=>{
  //   queryArray = randomUnique(totalTracks, totalRounds)
  // },[])

  // 5 rounds







  const startGame = () => {
    setQueryArray(randomUnique(totalTracks, totalRounds))
    setStartClick(prev=>!prev)
      // .then(()=>{
      //   setQueryIndex(queryArray[counter])

      // })
    // setTimeout(()=>{
    //   setQueryIndex(queryArray[0])
    // },1000)
    
  }

  // const gameoverOuput = (
  //   <>
  //     <h1>Game Over</h1>
  //   </>
  // )






    // <button onClick={handlePlay}>Play</button>
    // <button  onClick={handlePause}>Pause</button>
  

  // function handlePlayTwo() {
  //   console.log("clicked play")
  // }
  return (
    <div className="App">
      <main className="glass-container">
        <div className="settings-container">
          <IoSettingsOutline size={20} style={{color: 'black', justifyContent: 'flex-start'}}/>
          <div className="setting-list">
              <h3 className="setting">Player(s)</h3>
              <h3 className="setting">Answer Method</h3>
              <h3 className="setting">Music Time</h3>
              <h3 className="setting">Rounds</h3>
              <h3 className="setting">Music Volume</h3>
              <h3 className="setting">Genre</h3>
              <div className="random-box">
                <p>DELETE LATER</p>
              </div>     
          </div>

        </div>
        <div className="game-container">
          <div className="status-container">
            <div className="left-game-status">
              <p>Round: 1</p>
              <p>Music Time: 2s</p>
            </div>
            <div className="right-game-status">
              <p>Score: 0</p>
            </div>
          </div>
          <div className="content-container">
            {startClick ? 
              <AnswerList
                queryArray={queryArray}
                randomUnique={randomUnique}
              /> : 
              <button className="btn-larger" onClick={startGame}>Start Game</button>

            }

          </div>
          
        </div>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>

       
            {/* {
              Output
            } */}
          {/* <p>one <audio src={music} ref={audioElem}/></p>
          <button onClick={handlePlay}>Play</button>
          <button  onClick={handlePause}>Pause</button>
          <p>two <audio src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/7c/29/d3/7c29d334-a112-8f50-02de-f90cef0ae2cd/mzaf_17115533119839493723.plus.aac.ep.m4a" ref={audioElemTwo}/></p>
          <button onClick={handlePlayTwo}>Play</button>
          <button  onClick={handlePauseTwo}>Pause</button> */}


        
      
    </div>
  )

  
}

export default App


/* NOTES 

 <h1>Audio Test</h1>
          {counter === totalRounds ? gameoverOuput : ""}
          {counter}
          <br/>
          {queryArray.join(" ")}
          <br/>
          {queryIndex ? `queryIndex is ${queryIndex}` : "queryIndex not availaable"}
          <br/>
          {`queryCounter is ${queryArray[counter]}`}
          <br/>
          {playClick ? "true" : "false"}
          <br/>
          <button onClick={statGame}>Start Game</button>
          <button onClick={resetGame}>Reset Game</button>
          <audio src={data.tracks[queryIndex ? queryIndex : 0].actions[1].uri} ref={audioElem}/>
          <button onClick={handlePlay}>Play</button>
          <button  onClick={handlePause}>Pause</button>
          <button onClick={nextSong}>Next Song</button>
          <button onClick={()=>setViewTitleBtn(prev=>!prev)}>View Title</button>
          {viewTitleBtn ? answerOutput : ""}



*/