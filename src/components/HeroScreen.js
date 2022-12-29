import React, {useRef} from 'react'
import heroVideo from "../hero/video.mp4"
import "../styles/HeroSection.css"

const HeroSection = () => {
    const videoRef = useRef()


    return (
        <div className="hero-section">
            <video ref={videoRef} src={heroVideo} autoPlay loop muted className="hero-video"/>
        </div>
    )
}

export default HeroSection