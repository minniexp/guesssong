import React, {useState, useRef, useEffect} from 'react'
import { IoCaretForwardCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import {randomUnique} from "../tools/HelperFunctions"
import AnswerScreen from './AnswerScreen';
import "../styles/App.css"

export default function PlayGame(props) {
    let counterInput = props.counter
    let roundsInput = props.rounds
    let dataArrayInput = props.dataArray
    let totalArrayCountInput = props.totalArrayCount
    let scoreInput = props.score
    let musicPlayTimeInput = props.musicPlayTime
    let finishPlayInput = props.finishPlay

    const audioElem =useRef()

    const [queryArray, setQueryArray] = useState([])
    const [answerChoicesArray, setAnswerChoicesArray] = useState([])
    const [timer, setTimer] = useState(musicPlayTimeInput)

    // CLICK FUNCTIONS
        // Music Play Button Clicked (TRUE : is Playing)
    const [playClick, setPlayClick] = useState(false)
        // Gamse Start Button Clicked (TRUE : Game Started)
    const [startClick, setStartClick] = useState(false)
        // "Choose correct Song" Button Clicked (TRUE: Answer Screen Showing)
    const [choicesClick, setChoicesClick] = useState(false)
        // Multiple Choice Answer clicked (TRUE: one of the multiple choice answer choices was clicked)
    const [answerClick, setAnswerClick] = useState(false)

    const [viewTitleBtn, setViewTitleBtn] = useState(false)
    const [testClick, setTestClick] = useState(false)

    const [correctStyle, setCorrectStyle] = useState(
        {0: "", 1: "", 2: "", 3: ""}
      )



    const startingGame = () => {
        setStartClick(prev=>!prev)
        setQueryArray(randomUnique(totalArrayCountInput, roundsInput))
    }
    
    useEffect(()=>{
        if(playClick) {
            props.handleFinishPlay(false)
            audioElem.current.play()
            .then(()=>{
              console.log("playing")
            })
            .catch((e)=>console.log(`playback error: ${e}`))
        }
    },[playClick])

    function handlePause() {
        audioElem.current.pause()
        .then(()=>{
        console.log("pausing")    

        })
        .catch((e)=>console.log(`pausing error: ${e}`))
    }
    // ORIGINAL FUNCTION    
    // function handlePlayMore() {
    //     setTimer(timer+1000) 
    //     handlePlay()
    //   }

    function handlePlayMore() {
        if (timer < 15000) {
            setTimer(timer+1000) 
            setPlayClick(prev=>!prev)
        }

    }
    
    const nextSong = () => {
        props.handleCounter(prev=>prev+1)
        setChoicesClick(prev=>!prev)
        setAnswerClick(false)
        setCorrectStyle({0: "", 1: "", 2: "", 3: ""})
        setPlayClick(false)
        setTimer(musicPlayTimeInput)
        props.handleFinishPlay(false)
        // props.togglePlayClick()
        setViewTitleBtn(prev=>!prev)
        setAnswerChoicesArray([])
    }

    const handleAnswerChoicesArray = (array) => {
        setAnswerChoicesArray(array)
    }

    const handleAnswerClick = (boolean) =>{
        setAnswerClick(true)

    }

    const handleCorrectStyle = (style) => {
        setCorrectStyle(style)
    }

    const resetGame = () => {

        setPlayClick(false)
        setStartClick(false)
        props.handleCounter(0)
        props.handleScore(0)
    }
    

    useEffect (()=>{
        if(playClick) {
          setTimeout(()=>{
            audioElem.current.pause()
            console.log("pausing")
            props.handleFinishPlay(true)
   
          },timer)
        }
      },[playClick])


    const playGameOutput = () => {
        let contentOutput
        console.log("playGame Output working")
        if (startClick) {
            if (playClick) {
                if (choicesClick) {
                    contentOutput =
                    <>
                        <AnswerScreen
                            dataArray={dataArrayInput}
                            arrayIndex={queryArray[counterInput]}
                            answerChoicesArray={answerChoicesArray}
                            handleAnswerChoicesArray={handleAnswerChoicesArray}
                            totalArrayCount={totalArrayCountInput}
                            answerClick={answerClick}
                            handleAnswerClick={handleAnswerClick}
                            handleCorrectStyle={handleCorrectStyle}
                            handleScore={props.handleScore}
                        />
                        <button onClick={nextSong} className="btn" id="next-song-btn">NEXT SONG</button>
                    </>
                    
                    return contentOutput
                } else {
                    contentOutput =
                    <>
                        <button className="btn-active" onClick={handlePause}>
                            <IoPauseCircleOutline size={200} style={{color: '#756951'}}/> 
                            <audio src={dataArrayInput[queryArray[counterInput]].audio} ref={audioElem} />
                        </button>
                        <div className="util-btn-container">
                            <button onClick={()=>setPlayClick(prev=>!prev)} className="btn-small">LISTEN AGAIN</button>
                            <button onClick={handlePlayMore} className="btn-small">{`LISTEN FOR ${(timer+1000)/1000}s`}</button>
                        </div>
                        {finishPlayInput ?
                            <button 
                                onClick={()=>setChoicesClick(prev=>!prev)}
                                style = {{display: 'flex', float: 'right'}}
                                className="btn">Choose Correct Song</button>
                            :
                            ""
                        }

                    </>
                    return contentOutput
                }
            } else if (counterInput>roundsInput-1) {
                contentOutput =
                <>
                    <h3>Game Over</h3>
                    <p>score: {scoreInput} </p>
                    <button className="btn-larger" onClick={resetGame} >Restart Game</button>
                </>
                return contentOutput

            } else  {
                contentOutput =
                <>
                    <button className="btn-active" onClick={()=>setPlayClick(prev=>!prev)}>
                        <IoCaretForwardCircleOutline size={200} style={{color: '#756951'}} />
                    </button>
                </>
                return contentOutput
            }

        } else {
            // testingOutput = `<button className="btn-larger" onClick={startingGame}>Start Game</button>`
            contentOutput = 
            <>
                <button className="btn-larger" onClick={startingGame}>Start Game</button>
            </>
            return contentOutput
        }
    }

    // function testData() {
    //     let testDataOuput = 

    //     return testDataOuput
    // }

    return (
        <div className="play-game">
            {playGameOutput()}
        </div>
    )
}
