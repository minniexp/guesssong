import React, {useEffect, useState} from "react";

import Error from './Error'
import "../styles/AnswerScreen.css"

export default function AnswerScreen (props) {
    let dataArrayInput = props.dataArray
    let correctStyleInput = props.correctStyle
    let answerChoicesArrayInput = props.answerChoicesArray
    // const [ready, setReady] = useState(false)
    // useEffect(()=>{
    //         setTimeout(()=>setReady(prev=>!prev), 700)
        
    // },[])
    const [click, setClick] = useState(false)
    const [ready, setReady] = useState(false)

    const [output, setOutput] = useState()

    
    useEffect(()=>{
        setTimeout(()=>setReady(prev=>!prev),700)
    },[])

    
    return (
        <div className="answer-screen" >
        {ready ? 
        <>
            {answerChoicesArrayInput.map(item => (
                <button 
                    className="answer-card-conatiner"
                    id={correctStyleInput[item.key]}
                    onClick={()=>props.optionClicked(item.key, item.isCorrect)}
                >
                    <img src={dataArrayInput[item.arrayIndex].image} style={{width: '90px'}}alt="song album cover"/>
                    <div className="song-info">
                        <p className="song-title">{dataArrayInput[item.arrayIndex].title}</p>
                        <p className="song-artist">{dataArrayInput[item.arrayIndex].artist}</p>
                    </div>
                </button>


            ))}
        </>
        :
        <>
            <Error/>
        </>

}

            {/* {trackPromise(answerChoicesArrayInput.map(item => (
                    <button 
                        className="answer-card-conatiner"
                        id={correctStyleInput[item.key]}
                        onClick={()=>props.optionClicked(item.key, item.isCorrect)}
                    >
                        <img src={dataArrayInput[item.arrayIndex].image} style={{width: '90px'}}alt="song album cover"/>
                        <div className="song-info">
                            <p className="song-title">{dataArrayInput[item.arrayIndex].title}</p>
                            <p className="song-artist">{dataArrayInput[item.arrayIndex].artist}</p>
                        </div>
                    </button>


                )))} */}


        </div>


    )
}

