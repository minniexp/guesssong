import React, { useState} from 'react'
// import {KPopWannaOne} from '/etc/secrets/KPopWannaOne'
import '../styles/StartGame.css'

export default function StartGame(props) {
    const [genreStyle, setGenreStyle] = useState(
        {Chart: "", KPop: "", Christian: ""}
      )
      const [genreClick, setGenreClick] = useState(false)


    function handleGenreClick(e) {
        setGenreClick(prev=>!prev)
        let clickedGenre=e.target.innerText

        //genreClick is not switching until return is clicked
        if (!genreClick) {
            if (clickedGenre === "Top Music Chart") {
                setGenreStyle({Chart: "select", KPop: "not-select", Christian: "not-select"})
                props.choosingGenre("Top Music Chart")
            } else if (clickedGenre === "K-Pop"){
                setGenreStyle({Chart: "not-select", KPop: "select", Christian: "not-select"})
                props.choosingGenre("K-Pop")
            } else if (clickedGenre === "Christian"){
                setGenreStyle({Chart: "not-select", KPop: "not-select", Christian: "select"})
                props.choosingGenre("Christian")

            } else {
                setGenreStyle({Chart: "", KPop: "", Christian: ""})
            }
        } else {
            setGenreStyle({Chart: "", KPop: "", Christian: ""})
        }
    

        
    }  

    return (
        <div className="EndGame" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <p>Choose Music Genre</p>
            {props.chosenGenre}
            <button className='btn-genre' id={genreStyle.Chart} onClick={handleGenreClick}> Top Music Chart </button>
            <button className='btn-genre' id={genreStyle.KPop} onClick={handleGenreClick}> K-Pop </button>
            <button className='btn-genre' id={genreStyle.Christian} onClick={handleGenreClick}> Christian </button>

            <button className="btn-larger" onClick={props.startingGame}>Start Game</button>
            {/* <h2>{KPopWannaOne.data[0].title}</h2> */}
        </div>
    )
}