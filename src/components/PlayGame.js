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
    let axiosCompleteInput = props.axiosComplete

    const audioElem =useRef()

    const [finishPlay, setFinishPlay] = useState(false)
    const [queryArray, setQueryArray] = useState([])
    const [queryIndex, setQueryIndex] = useState([])
    const [answerChoicesArray, setAnswerChoicesArray] = useState([])
    const [timer, setTimer] = useState(musicPlayTimeInput)


    const [playClick, setPlayClick] = useState(false)
    const [startClick, setStartClick] = useState(false)
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
    
    // setTimeOut is placed for the setQueryIndex function to finish before starting song. The setTimeout time might need to be altered if there is error with "play"
    function handlePlay() {
        setQueryIndex(queryArray[counterInput])
        setFinishPlay(false)
        setPlayClick(prev=>!prev)
        setTimeout(()=>{
          audioElem.current.play()
          .then(()=>{
            console.log("playing")
          })
          .catch((e)=>console.log(`playback error: ${e}`))
        },1000)
      }

    function handlePause() {
        audioElem.current.pause()
        .then(()=>{
        console.log("pausing")    

        })
        .catch((e)=>console.log(`pausing error: ${e}`))
    }
    
    function handlePlayMore() {
        setTimer(timer+1000) 
        handlePlay()
      }
    
    const nextSong = () => {
        props.handleCounter(prev=>prev+1)
        setAnswerClick(prev=>!prev)
        setCorrectStyle({0: "", 1: "", 2: "", 3: ""})
        setPlayClick(false)
        setTimer(musicPlayTimeInput)
        setFinishPlay(false)
        // props.togglePlayClick()
        setViewTitleBtn(prev=>!prev)
        setQueryIndex(queryArray[counterInput])
        setAnswerChoicesArray([])
        console.log("next song complete")
    }

    function handleAnswer() {
        setAnswerClick(prev=>!prev)
        let indexArrayWithoutQueryIndex = []
        let nums = new Set()
        while (nums.size < 3) {
            let randomNumber = Math.floor(Math.random()*(totalArrayCountInput-1+1))
            if (randomNumber !== queryArray[counterInput]) {
                nums.add(randomNumber)
            }
        } indexArrayWithoutQueryIndex = [...nums]
        let indexArray = [queryArray[counterInput], ...indexArrayWithoutQueryIndex]
        console.log(`index array ${indexArray}`)
        console.log(`queryArray[counterInput] array ${queryArray[counterInput]}`)
        let orderArray = randomUnique(4, 4)
        orderArray.map((item, key)=> {
            console.log(`kety is ${key}`)
            if (indexArray[item] === queryIndex) {
                setAnswerChoicesArray(prev=>[...prev, {key: key, arrayIndex:indexArray[item], isCorrect: true, style: "correct"}])
    
            } else {
                setAnswerChoicesArray(prev=>[...prev, {key: key, arrayIndex: indexArray[item], isCorrect: false, style: "incorrect"} ])
            }
        })
    }

    const handleAnswerChoicesArray = (array) => {
        setAnswerChoicesArray(array)
    }

    const optionClicked = (key, isCorrect) => {
        console.log("optionClicked funciton clicking")
        if (isCorrect) {
          props.handleScore(prev=> prev + 1);
          setCorrectStyle(prevData => {
            return {
                ...prevData,
                [key]: "correct"
            }
        })
        } else {
          setCorrectStyle(prevData => {
            return {
                ...prevData,
                [key]: "incorrect"
            }
        })
          console.log("incorrect")
        }
        // setAnswerClick(prev=>!prev)
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
            setFinishPlay(true)
   
          },timer)
        }
      },[playClick])


    const playGameOutput = () => {
        let contentOutput
        console.log("playGame Output working")
        if (startClick) {
            if (playClick) {
                if (answerClick) {
                    contentOutput =
                    <>
                        <AnswerScreen
                            dataArray={dataArrayInput}
                            correctStyle={correctStyle}
                            arrayIndex={queryArray[counterInput]}
                            answerChoicesArray={answerChoicesArray}
                            optionClicked={optionClicked}
                            handleAnswerChoicesArray={handleAnswerChoicesArray}
                        />
                        <button onClick={nextSong} className="btn" id="next-song-btn">NEXT SONG</button>
                    </>
                    
                    return contentOutput
                } else {
                    contentOutput =
                    <>
                        <button className="btn-active" onClick={handlePause}>
                            <IoPauseCircleOutline size={250} /> 
                            <audio src={dataArrayInput[queryArray[counterInput]].audio} ref={audioElem} />
                        </button>
                        <div className="util-btn-container">
                            <button onClick={handlePlay} className="btn-small">LISTEN AGAIN</button>
                            <button onClick={handlePlayMore} className="btn-small">{`LISTEN FOR ${(timer+1000)/1000}s`}</button>
                        </div>
                        {finishPlay ?
                            <button 
                                onClick={handleAnswer}
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
                    <button disabled={finishPlay} className="btn-active" onClick={handlePlay}>
                        <IoCaretForwardCircleOutline size={250} />
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
