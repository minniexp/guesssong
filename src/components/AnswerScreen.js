import React from "react";
import "../styles/AnswerScreen.css"

export default function AnswerScreen (props) {
    let dataArrayInput = props.dataArray
    let correctStyleInput = props.correctStyle
    let answerChoicesArrayInput = props.answerChoicesArray
    
    return (
        <div className="answer-screen">
            {answerChoicesArrayInput ? 
            <>
                {answerChoicesArrayInput.map(item => (
                    <button 
                        className="answer-card-conatiner"
                        id={correctStyleInput[item.key]}
                        onClick={()=>props.optionClicked(item.key, item.isCorrect)}
                    >
                        <img src={dataArrayInput[item.arrayIndex].image} style={{width: '100px'}}alt="song album cover"/>
                        <div className="song-info">
                            <p className="song-title">{dataArrayInput[item.arrayIndex].title}</p>
                            <p className="song-artist">{dataArrayInput[item.arrayIndex].artist}</p>
                        </div>
                    </button>


                ))}
            </>
            :
            "0"
        }

        </div>


    )
}

{/* <button 
className="answer-card" 
>
<img src={dataArrayInput[item.arrayIndex].image} alt="song album cover"/>


</button> */}