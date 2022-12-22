import React, {useState, useRef, useEffect} from 'react'
import {shazamTracksEditedData as data} from "./data/ShazamTracksEdited"
import music from "./music/alarm_clock.ogg"
import './App.css';

function App() {
  const [playClick, setPlayClick] = useState(false)
  const audioElem =useRef()
  const [count, setCount] = useState(0)
  const [viewTitleBtn, setViewTitleBtn] = useState(false)
  // let playPromise = 
  // let pausePromise = audioElem.current.pause()


  function handlePlay() {
    audioElem.current.play()
      .then(()=>{
        console.log("playing")
        setPlayClick(prev=>!prev)
      })
      .catch(()=>console.log("playback error"))
  }
  

  function handlePause() {
    audioElem.current.pause()
      .then(()=>console.log("pausing"))
      .catch(()=>console.log("pausing error"))
  }

  useEffect (()=>{
    if(playClick) {
      setTimeout(()=>{
        audioElem.current.pause()
          .then(()=>console.log("pausing"))
          .catch(()=>console.log("pausing error"))
      },5000)
    }
  },[playClick])
  // function fiveSecondsPlay() {
  //   audioElem.current.play()
  //   pauseSong()
  //   .then(()=>{
  //     console.log("playing")
  //     setTimeOut(()=>{
  //       console.log("should pause now")
  //     },2000)
  //   })
  //   .catch(()=>console.log("playback error"))
  // }

  // function pauseSong() {
    
  // }
  
  let Output = data.tracks.map((item)=> (
    <>
      {/* <audio src={item.hub.actions.uri} ref={`audioElem${item.key}`}/> */}
      <p>test</p>
      <p>{item.actions[1].uri}</p>
      <p>{item.key}</p> 
      {/* <p>{`audioElem${item.key}`}</p> */}
      {/* <button onClick={handlePlay}>Play</button>
      <button  onClick={handlePause}>Pause</button> */}
    </>
  ))

  let answerOutput = (
    <>
      <img src={data.tracks[count].images.coverart}/>
      <p>{data.tracks[count].title}</p>
      <p>{data.tracks[count].subtitle}</p>

    </>
  )

  function nextSong() {
    if (count === 19) {
      setCount(0)
    } else {
      setCount(prev=>prev+1)
    }
    setPlayClick(false)
    setViewTitleBtn(false)
  }
    // <button onClick={handlePlay}>Play</button>
    // <button  onClick={handlePause}>Pause</button>
  


  // function handlePlayTwo() {
  //   console.log("clicked play")
  // }
  return (
    <div className="App">
      <h1>Audio Test</h1>
      {count}
      <br/>
      {playClick ? "true" : "false"}
      <br/>
      <audio src={data.tracks[count].actions[1].uri} ref={audioElem}/>
      <button onClick={handlePlay}>Play</button>
      <button  onClick={handlePause}>Pause</button>
      <button onClick={nextSong}>Next Song</button>
      <button onClick={()=>setViewTitleBtn(prev=>!prev)}>View Title</button>
      {viewTitleBtn ? answerOutput : ""}
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
  );
}

export default App;
