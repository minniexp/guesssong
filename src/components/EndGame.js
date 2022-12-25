import React from 'react'

export default function EndGame(props) {
    let scoreInput = props.score
    return (
        <div className="EndGame" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>Game Over</h3>
            <h3>Your Score is : {scoreInput}</h3>
            <button className='btn' onClick={props.resetGame}>Play Again</button>
        </div>
    )
}