import React, {useState, useRef, useEffect } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import AnswerList from "./components/AnswerList"
import EndGame from "./components/EndGame"
import StartGame from "./components/StartGame"
import TermsOfUse from './pages/TermsOfUse';
// import music from "./music/alarm_clock.ogg"
import './styles/App.css';

function App() {
  const [startClick, setStartClick] = useState(false)
  const [queryArray, setQueryArray] = useState([])
  const [answerClick, setAnswerClick] = useState(false)
  const [correctStyle, setCorrectStyle] = useState(
    {0: "", 1: "", 2: "", 3: ""}
  )

  const [counter, setCounter] = useState(0)
  const [playClick, setPlayClick] = useState(false)
  const [viewTitleBtn, setViewTitleBtn] = useState(false)

  const [score, setScore] = useState(0)

  // let playPromise = 
  // let pausePromise = audioElem.current.pause()
  const totalTracks = 20
  const totalRounds = 5


  // game settings
    //player

    //music play time
  const [timer, setTimer] = useState(2000)
  const [originalTimer, SetOriginalTimer] = useState(2000)

    //ansewr method
  // const [answerMethod, setAnswerMethod] = useState(
  //   {multipleChoice: true, userInput: false}
  // )

    // rounds
  const [rounds, setRounds] = useState(5)

    // genres
  const [chosenGenre, setChosenGenre] = useState("Top Music Chart")


  const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1)));
    }
    return [...nums]
  }

  const choosingGenre = (chosenGenre) => {
    setChosenGenre(chosenGenre)
  }

  // let queryArray = randomUnique(totalTracks, totalRounds)


  // useEffect (()=>{
  //   queryArray = randomUnique(totalTracks, totalRounds)
  // },[])

  // 5 rounds







  const startingGame = () => {
    setQueryArray(randomUnique(totalTracks, totalRounds))
    setStartClick(prev=>!prev)
      // .then(()=>{
      //   setQueryIndex(queryArray[counter])

      // })
    // setTimeout(()=>{
    //   setQueryIndex(queryArray[0])
    // },1000)
    
  }

const answerClickToggle = () => {
  setAnswerClick(prev=>!prev)
}

  const optionClicked = (key, isCorrect) => {
    console.log("answer clicking")
    if (isCorrect) {
      setScore(prev=> prev + 1);
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
    answerClickToggle()
}

const clearCorrectStyle = () => {
  setCorrectStyle(
    {0: "", 1: "", 2: "", 3: ""}
  )
}

const incrementCounter = () => {
  setCounter(prev=>prev+1)
}

const resetGame = () => {

  setPlayClick(false)
  setViewTitleBtn(false)
  setStartClick(true)
  setCounter(0)
  setScore(0)
}

const togglePlayClick = () => {
  setPlayClick(prev=>!prev)
}

const toggleViewTitleBtn = () => {
  setViewTitleBtn(prev=>!prev)
}

const settingTimer = (time) => {
  setTimer(time)
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
      <div className="tesing">
        
      </div>
      <main className="glass-container">
        <div className="settings-container">
          <IoSettingsOutline size={20} style={{color: 'black', justifyContent: 'flex-start'}}/>
          <div className="setting-list">
              <h3 className="setting">Player(s)</h3>
              <h3 className="setting">Music Time</h3>
              <h3 className="setting">Rounds</h3>
              <h3 className="setting">Genre</h3>
              <div className="random-box">
                <p>DELETE LATER</p>
              </div>     
          </div>

        </div>
        <div className="game-container">
          <div className="status-container">
            {counter<totalRounds ? 
            <>
              <div className="left-game-status">
                <p>Round: 1</p>
                <p>Music Time: 2s</p>
              </div>
              <div className="right-game-status">
                <p>Score: {score}</p>
              </div>
            </>: ""}
          </div>
          <div className="content-container">
            {counter>=totalRounds ? 
              <EndGame
                score={score}
                resetGame={resetGame}
              /> : startClick ? 
              <AnswerList
                queryArray={queryArray}
                randomUnique={randomUnique}
                optionClicked={optionClicked}
                answerClick={answerClick}
                answerClickToggle={answerClickToggle}
                correctStyle={correctStyle}
                clearCorrectStyle={clearCorrectStyle}
                counter={counter}
                playClick={playClick}
                incrementCounter={incrementCounter}
                togglePlayClick={togglePlayClick}
                viewTitleBtn={viewTitleBtn}
                toggleViewTitleBtn={toggleViewTitleBtn}
                timer={timer}
                settingTimer={settingTimer}
                originalTimer={originalTimer}
              /> : 
              <StartGame
                startingGame={startingGame}
                choosingGenre={choosingGenre}
                chosenGenre={chosenGenre}
              />

            }

          </div>
          
        </div>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>     
      <footer>
        <TermsOfUse/>
      </footer>
    </div>
  )
}



export default App
