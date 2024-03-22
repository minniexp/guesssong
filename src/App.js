import React, { useState, useEffect } from "react";
import Settings from "./components/Settings";
import PlayGame from "./components/PlayGame";
import LoadingIndicator from "./components/LoadingIndicator";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import HeroSection from "./components/HeroScreen";
import "./styles/App.css";

export default function NewApp() {
  // VARIABLES
  // API related variables
  const [dataArray, setDataArray] = useState([]);
  const [axiosComplete, setAxiosComplete] = useState(true);
  //make sure array has max 49

  // Settings related variables
  const [rounds, setRounds] = useState(5);
  const [musicPlayTime, setMusicPlayTime] = useState(2000);
  const [genres, setGenres] = useState("Top USA Chart");

  // Settings & Game related variables
  const [startClick, setStartClick] = useState();

  // Game related variables
  //counts number of rounds played
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [totalArrayCount, setTotalArrayCount] = useState(0);

  // API CALL
  useEffect(() => {
    const genreKey = genres.replace(/\s+/g, ''); // Key for localStorage
    const currentDataKey = `currentData-${genreKey}`; // Key for current game data in localStorage

    // Function to fetch playlist data
    const fetchPlaylistData = async (playlistID) => {
      const options = {
        method: "GET",
        url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistID}`,
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        const uniqueTracks = new Set();
        let responseData = response.data.tracks.data
          .filter(track => {
            const trackSignature = `${track.title}-${track.artist.name}`; // Combine title and artist to create a unique signature
            if (track.preview.length > 0 && !uniqueTracks.has(trackSignature)) {
              uniqueTracks.add(trackSignature); // Add signature to the Set to track uniqueness
              return true; // Keep this track
            }
            return false; // Exclude this track
          })
          .map((track, index) => ({
            key: index,
            id: track.id,
            audio: track.preview,
            title: track.title,
            artist: track.artist.name,
            image: track.album.cover
          }));

        // Store fetched data in localStorage
        localStorage.setItem(genreKey, JSON.stringify(responseData));
        localStorage.setItem(currentDataKey, JSON.stringify(responseData));
        
        setDataArray(responseData);
        setTotalArrayCount(responseData.length);
        setAxiosComplete(true);
      } catch (error) {
        console.error("Error fetching playlist data: ", error);
        setAxiosComplete(true); // Ensure loader is hidden even on error
      }
    };

    let playlistID;
    switch (genres) {
      case "Top USA Chart":
        playlistID = 1313621735;
        break;
      case "Top K-Pop":
        playlistID = 4096400722;
        break;
      case "Christian":
        playlistID = 1684756293;
        break;
      case "2010s K-Pop":
        playlistID = 9001527742;
        break;
      case "2000s K-Pop":
        playlistID = 9001299402;
        break;
      default:
        playlistID = null;
    }

    // Attempt to retrieve existing data from localStorage
    const storedData = localStorage.getItem(genreKey);
    if (!storedData) {
      // If no stored data, fetch from API and save
      trackPromise(fetchPlaylistData(playlistID));
    } else {
      // Use stored data
      const originalData = JSON.parse(storedData);
      const currentData = localStorage.getItem(currentDataKey) ? JSON.parse(localStorage.getItem(currentDataKey)) : originalData;
      
      if (currentData.length < rounds) {
        // If not enough data for the rounds, reset currentData with originalData
        localStorage.setItem(currentDataKey, JSON.stringify(originalData));
        setDataArray(originalData);
      } else {
        // Use currentData if sufficient for the rounds
        setDataArray(currentData);
      }
      setTotalArrayCount(dataArray.length);
    }
  }, [genres]);

  // FUNCTIONS
  // Settings related functions
  const handleRounds = (rounds) => {
    setRounds(rounds);
  };
  const handleMusicPlayTime = (musicPlayTime) => {
    setMusicPlayTime(musicPlayTime);
  };
  const handleGenres = (genre) => {
    setGenres(genre);
  };
  // Settings and Games related functions
  const handleStartClick = (boolean) => {
    setStartClick(boolean);
  };

  // Game related functions
  const handleCounter = (counter) => {
    setCounter(counter);
  };
  const handleScore = (score) => {
    setScore(score);
  };
  const handleAxiosComplete = (boolean) => {
    setAxiosComplete(boolean);
  };

  return (
    <div className="App">
      <HeroSection />
      <main className="glass-container">
        <div className="settings-container">
          <Settings
            rounds={rounds}
            handleRounds={handleRounds}
            musicPlayTime={musicPlayTime}
            handleMusicPlayTime={handleMusicPlayTime}
            handleGenres={handleGenres}
            startClick={startClick}
            axiosComplete={axiosComplete}
            handleAxiosComplete={handleAxiosComplete}
          />
        </div>
        <div className="game-container">
          <LoadingIndicator />
          <div className="status-container">
            {counter < rounds ? (
              <>
                <div className="left-game-status">
                  <p>Round: {counter + 1}</p>
                  <p>Music Time: {`${musicPlayTime / 1000}s`}</p>
                </div>
                <div className="right-game-status">
                  <p>Score: {score}</p>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="content-container">
            {axiosComplete ? (
              <>
                <PlayGame
                  counter={counter}
                  rounds={rounds}
                  dataArray={dataArray}
                  musicPlayTime={musicPlayTime}
                  handleCounter={handleCounter}
                  score={score}
                  handleScore={handleScore}
                  totalArrayCount={totalArrayCount}
                  startClick={startClick}
                  handleStartClick={handleStartClick}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>

      {/* <div className="circle1"></div>
            <div className="circle2"></div>      */}
    </div>
  );
}