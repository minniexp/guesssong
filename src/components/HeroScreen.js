import React, {useState, useRef} from 'react'
import heroImage from "../hero/image.jpg"
import heroVideo from "../hero/video.mp4"
import "../styles/HeroSection.css"

const HeroSection = () => {
    const [videoIsPlaying, setVideoIsPlaying] = useState(true)
    const videoRef = useRef()

    const handleVideoPause = () => {
        videoRef.current.pause()
        setVideoIsPlaying(false)
    }

    const handleVideoPlay = () => {
        videoRef.current.play()
        setVideoIsPlaying(true)
    }


    return (
        <div className="hero-section">
            {/* <img src={heroImage} /> */}
            <video ref={videoRef} src={heroVideo} autoPlay loop muted className="hero-video"/>
        </div>
    )
}

export default HeroSection