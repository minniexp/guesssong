import React, {useRef, useState, useEffect} from 'react'
import { IoCaretForwardCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import {shazamTracksEditedData as data} from "../data/ShazamTracksEdited"

import '../styles/App.css';


export default function AnswerList(props) {
    let counterInput = props.counter
    let queryArrayInput = props.queryArray
    let playClickInput = props.playClick
    let viewTitleBtnInput = props.viewTitleBtn
    let answerMethodInput = props.answerMethod
    let timerInput = props.timer
    let originalTimerInput = props.originalTimer
       
    
  const audioElem =useRef()


  const [finishPlay, setFinishPlay] = useState(false)
  const [queryIndex, setQueryIndex] = useState([])
  const [choicesArray, setChoicesArray] = useState([])




useEffect (()=>{
    if(playClickInput) {
      setTimeout(()=>{
        audioElem.current.pause()
        console.log("pausing")
        setFinishPlay(true)
        props.togglePlayClick()

      },timerInput)
    }
  },[playClickInput])


  // setTimeOut is placed for the setQueryIndex function to finish before starting song. The setTimeout time might need to be altered if there is error with "play"
  function handlePlay() {
    setQueryIndex(queryArrayInput[counterInput])
    setFinishPlay(false)
    props.togglePlayClick()
    setTimeout(()=>{
      audioElem.current.play()
      .then(()=>{
        console.log("playing")
      })
      .catch((e)=>console.log(`playback error: ${e}`))
    },700)
  }

  function handlePlayMore() {
    if(timerInput === 1000) {
        props.settingTimer(2000)
    }
    else if (timerInput === 2000) {
        props.settingTimer(5000)
    }
    else if (timerInput === 5000) {
        props.settingTimer(7500)
    }
    else if (timerInput === 7500) {
        props.settingTimer(10000)
    } 
    handlePlay()
  }
  

  function handlePause() {
    audioElem.current.pause()
      .then(()=>{
        console.log("pausing")    

      })
      .catch((e)=>console.log(`pausing error: ${e}`))
  }

  const nextSong = () => {
    props.incrementCounter()
    props.answerClickToggle()
    props.clearCorrectStyle()
    props.settingTimer(originalTimerInput)
    setFinishPlay(false)
    // props.togglePlayClick()
    props.toggleViewTitleBtn()
    setQueryIndex(queryArrayInput[counterInput])
    setChoicesArray([])
    console.log("next song complete")
  }

// NEED TO FIX HANDLE ANSWER

function handleAnswer() {
    props.toggleViewTitleBtn()
    let indexArrayWithoutQueryIndex = []
    let nums = new Set()
    while (nums.size < 3) {
        let randomNumber = Math.floor(Math.random()*(20-1+1))
        if (randomNumber !== queryIndex) {
            nums.add(randomNumber)
        }
    } indexArrayWithoutQueryIndex = [...nums]

    let indexArray = [queryIndex, ...indexArrayWithoutQueryIndex]
    let orderArray = props.randomUnique(4, 4)
    orderArray.map((item, key)=> {
        console.log(`kety is ${key}`)
        if (indexArray[item] === queryIndex) {
            setChoicesArray(prev=>[...prev, {key: key, arrayIndex:indexArray[item], isCorrect: true, style: "correct"}])

        } else {
            setChoicesArray(prev=>[...prev, {key: key, arrayIndex: indexArray[item], isCorrect: false, style: "incorrect"} ])
        }
    })
}

    return (
        <div className="Answer-List-Container">
            { viewTitleBtnInput ? 
                <div className="answer-container">
                    <div className="answer-cards-container">
                    {choicesArray ? 
                    <>
                        {choicesArray.map(item => (
                                <button 
                                    className="answer-card" 
                                    id={props.answerClick ? props.correctStyle[item.key] : ""}
                                    onClick={()=>props.optionClicked(item.key, item.isCorrect)}
                                >
                                    <p>{item.key}</p>

                                    <p>{item.isCorrect ? "ture" : "false"}</p>

                                    <p>{data.tracks[item.arrayIndex].title}</p>
                                    <br/>
                                    <p>{data.tracks[item.arrayIndex].subtitle}</p>
                                </button>

                        ))}
                    </>
                    :
                    "0"
                    }
                    {answerMethodInput ? "userInput true" : "userinput false"}
                    </div>
                    <div className="nextsong-container">
                        <button onClick={nextSong} className="btn" id="next-song-btn">NEXT SONG</button>
                    </div>
                </div> 
                :
                <div className="listening-container">
                    <div className="play-pause-icon">
                    {playClickInput ? 
                    <>
                        <button className="btn-active" onClick={handlePause}>
                            <IoPauseCircleOutline size={250} />
                            <audio src={queryIndex ? data.tracks[queryIndex].actions[1].uri : data.tracks[0].actions[1].uri } ref={audioElem}/>

                            {/* use for testing purposes only*/}
                            {/* <audio src="https://p.scdn.co/mp3-preview/c10f3092f58db994c0c30661966f1ef03656b693?cid=d8a5ed958d274c2e8ee717e6a4b0971d" ref={audioElem}/> */}
                        </button>


                    </> 
                        : 
                    <>
                        <button disabled={finishPlay} className="btn-active" onClick={handlePlay}>
                            <IoCaretForwardCircleOutline size={250} />
                        </button>
                        {
                        finishPlay ? 
                        <>
                            <br/>
                            <button onClick={handlePlay} className="btn">LISTEN AGAIN</button>
                            <button onClick={handlePlayMore} className="btn">LISTEN MORE</button>
                        </> : ""}

                    </> 
                    }
                    <br/>
                    </div>
                    <button onClick={handleAnswer} className="btn">Choose Correct Song</button>
                </div>
            }
        </div> 
    )

}