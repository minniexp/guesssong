import React, {useRef, useState, useEffect} from 'react'
import { IoCaretForwardCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import {shazamTracksEditedData as data} from "../data/ShazamTracksEdited"

import '../styles/App.css';


export default function AnswerList(props) {
    let queryArrayInput = props.queryArray
    
    
  const audioElem =useRef()

  const [counter, setCounter] = useState(0)
  const [viewTitleBtn, setViewTitleBtn] = useState(false)
  const [playClick, setPlayClick] = useState(false)
  const [finishPlay, setFinishPlay] = useState(false)

  const [queryIndex, setQueryIndex] = useState()

  useEffect (()=>{
    if(playClick) {
      setTimeout(()=>{
        audioElem.current.pause()
          .then(()=>{
            console.log("pausing")
            setFinishPlay(prev=>!prev)
          })
          .catch((e)=>console.log(`pausing error: ${e}`))
      },2000)
    }
  },[playClick])


  // setTimeOut is placed for the setQueryIndex function to finish before starting song. The setTimeout time might need to be altered if there is error with "play"
  function handlePlay() {
    setQueryIndex(queryArrayInput[counter])
    setPlayClick(prev=>!prev)
    setTimeout(()=>{
      audioElem.current.play()
      .then(()=>{
        console.log("playing")
      })
      .catch((e)=>console.log(`playback error: ${e}`))
    },700)
  }
  
  function resetGame () {
    setCounter(0)
    setPlayClick(false)
    setViewTitleBtn(false)
  }

  function handlePause() {
    audioElem.current.pause()
      .then(()=>console.log("pausing"))
      .catch((e)=>console.log(`pausing error: ${e}`))
  }



  const nextSong = () => {
    setCounter(prev=>prev+1)
    setPlayClick(false)
    setViewTitleBtn(false)
    setQueryIndex(queryArrayInput[counter])
    console.log("next song")
  }

function createAnswerChoiceArray() {
    let choicesArray = props.randomUnique(20, 3)
    choicesArray.push(queryIndex)
    let nums = new Set();
    while (nums.size < 4) {
        nums.add(Math.floor(Math.random() * (20 - 1 + 1) + 1));
    }
    return [...choicesArray[nums]]
    
}

// NEED TO FIX HANDLE ANSWER

function handleAnswer() {
    setViewTitleBtn(prev=>!prev)
    answerOutput()    
}

const answerOutput = ()=> {
    let choicesArray = createAnswerChoiceArray()
    if(choicesArray){
        choicesArray.map(item => (
            <div className="answer-card">
                <p>{data.tracks[item].title}</p>
                <p>{data.tracks[item].subtitle}</p>
            </div>
        ))
    } else {
        <p>"Nothing in array"</p>
    }

}
  
    return (
        <div className="Answer-List-Container">
            { viewTitleBtn ? 
                <div className="answer-container">
                    <div className="answer-cards-container">
                    {answerOutput}
                    <div className="answer-card">
                        <p>Answer 2</p>
                    </div>
                    <div className="answer-card">
                        <p>Answer 3</p>
                    </div>
                    <div className="answer-card">
                        <p>Answer 4</p>
                    </div>
                    <div className="answer-input">
                        <p>Answer Input</p>
                    </div>
                    </div>
                    <div className="nextsong-container">
                        <buton onClick={nextSong}className="btn" id="next-song-btn">Next Song</buton>
                    </div>
                </div> 
                :
                <div className="listening-container">
                    <div className="play-pause-icon">
                    {/* {playClick ? <IoPauseCircleOutline size={250} style={{color: '#426696', display: 'flex', justifyContent: 'center',  alignItems: 'center'}}/> : <IoCaretForwardCircleOutline size={250} style={{color: '#426696', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />} */}
                    {playClick ? 
                    <>
                        <button className="btn-active" onClick={handlePause}>
                            <IoPauseCircleOutline size={250} />
                            <audio src={data.tracks[queryIndex].actions[1].uri} ref={audioElem}/>
                        </button>


                    </> 
                        : 
                    <>
                        <button disabled={finishPlay} className="btn-active" onClick={handlePlay}>
                            <IoCaretForwardCircleOutline size={250} />
                        </button>
                    </> 
                    }
                    <br/>
                    {counter}
                    <br/>
                    {queryArrayInput[counter]}
                    <br/>

                    {queryArrayInput.join(" ")}
                    <br/>

                    {queryIndex ? "0" : "not availabe" }
                    <br/>

                    {playClick ? "true" : "false"}
                    <br/>

                    </div>
                    <button onClick={handleAnswer} className="btn">View Answer</button>
                </div>
            }
        </div> 
    )



    
}