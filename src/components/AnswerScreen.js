import React, {useEffect, useState} from "react";
import {randomUnique} from "../tools/HelperFunctions"

import "../styles/AnswerScreen.css"

export default function AnswerScreen (props) {
    let arrayIndexInput = props.arrayIndex
    let dataArrayInput = props.dataArray
    let answerChoicesArrayInput = props.answerChoicesArray
    let totalArrayCountInput = props.totalArrayCount
    let answerClickInput = props.answerClick

    const [isSelected, setIsSelected] = useState("")
    useEffect(()=>{
        let indexArrayWithoutQueryIndex = []
        let nums = new Set()
        while (nums.size < 3) {
            let randomNumber = Math.floor(Math.random()*(totalArrayCountInput-1+1))
            if (randomNumber !== arrayIndexInput) {
                nums.add(randomNumber)
            }
        } indexArrayWithoutQueryIndex = [...nums]
        let indexArray = [arrayIndexInput, ...indexArrayWithoutQueryIndex]
        let orderArray = randomUnique(4, 4)
        orderArray.map((item, key)=> {
            if (indexArray[item] === arrayIndexInput) {
                props.handleAnswerChoicesArray(prev=>[...prev, {key: key, arrayIndex:indexArray[item], isCorrect: true, style: "correct"}])
    
            } else {
                props.handleAnswerChoicesArray(prev=>[...prev, {key: key, arrayIndex: indexArray[item], isCorrect: false, style: "incorrect"} ])
            }
        })
    },[])

    function handleTestAnswer(key, isCorrect) {
        props.handleAnswerClick(prev=>!prev)
        setIsSelected(key)
        if (isCorrect) {
            props.handleScore(prev=>prev+1)
        }
    }
    

    return (
        <div className="answer-screen" >
            {answerChoicesArrayInput.map((item, key) => {
                const isAnswerSelected = key === isSelected
                return(
                    <button 
                    disabled={answerClickInput}
                    key={key}
                    value="tesitng"
                    className="answer-card-conatiner"
                    id={item.isCorrect && answerClickInput ? item.style : isAnswerSelected ? item.style : ""}
                    onClick={()=>handleTestAnswer(key, item.isCorrect)}
                    >
                        <img src={dataArrayInput[item.arrayIndex].image} className="answer-card-image" alt="song album cover"/>
                        <div className="song-info">
                            <p className="song-title">{dataArrayInput[item.arrayIndex].title}</p>
                            <p className="song-artist">{dataArrayInput[item.arrayIndex].artist}</p>
                        </div>
                    </button>
                )
            })}
        </div>


    )
}
