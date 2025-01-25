import React, { useState, useEffect } from "react";
import Settings from "./components/Settings";
import PlayGame from "./components/PlayGame";
import LoadingIndicator from "./components/LoadingIndicator";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import HeroSection from "./components/HeroScreen";
import { randomUniqueQuestion } from "./tools/HelperFunctions";
import "./styles/App.css";

export default function NewApp() {
  // VARIABLES
  const [dataArray, setDataArray] = useState([]);
  const [axiosComplete, setAxiosComplete] = useState(true);

  // Settings related variables
  const [rounds, setRounds] = useState(5);
  const [musicPlayTime, setMusicPlayTime] = useState(2000);
  const [genres, setGenres] = useState("Top USA Chart");

  // Settings & Game related variables
  const [startClick, setStartClick] = useState();

  // Game related variables
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [totalArrayCount, setTotalArrayCount] = useState(0);
  const [queryQuestion, setQueryQuestion] = useState([]);

  // API CALL
  useEffect(() => {
    const fetchPlaylistData = async (playlistID) => {
      try {
        console.log("calling fetchplaylist");
        console.log(
          "process.env.REACT_APP_SERVER: ",
          process.env.REACT_APP_SERVER
        );

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/playlist/${playlistID}`
        );
        let responseData = response.data.tracks.data
          .filter((track) => track.preview.length > 0)
          .map((track, index) => ({
            key: index,
            id: track.id,
            audio: track.preview,
            title: track.title,
            artist: track.artist.name,
            image: track.album.cover,
          }));
        console.log("useEffect running");
        console.log("useEffect running");
        console.log("responseData: ", responseData);

        setDataArray(responseData);
        setTotalArrayCount("response", response);
        setTotalArrayCount("responseData", responseData);

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
        playlistID = 12244134951;
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

    if (playlistID) {
      trackPromise(fetchPlaylistData(playlistID));
    }
  }, [genres, rounds]);

  // FUNCTIONS
  const handleRounds = (rounds) => {
    setRounds(rounds);
  };
  const handleMusicPlayTime = (musicPlayTime) => {
    setMusicPlayTime(musicPlayTime);
  };
  const handleGenres = (genre) => {
    setGenres(genre);
  };
  const handleStartClick = (boolean) => {
    setStartClick(boolean);
  };
  const handleCounter = (counter) => {
    setCounter(counter);
  };
  const handleScore = (score) => {
    setScore(score);
  };
  const handleAxiosComplete = (boolean) => {
    setAxiosComplete(boolean);
  };

  const removePlayedSong = (songId) => {
    const updatedDataArray = dataArray.filter((song) => song.id !== songId);
    setDataArray(updatedDataArray);
    setTotalArrayCount(updatedDataArray.length);
  };

  const startingGame = () => {
    handleStartClick(true);
    setQueryQuestion(randomUniqueQuestion(totalArrayCount));
  };

  const handleQuryQusetion = (number) => {
    setQueryQuestion(number);
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
        <p>Query QUestion: {queryQuestion}</p>
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
            {dataArray.length > 0 && (
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
                  removePlayedSong={removePlayedSong}
                  queryQuestion={queryQuestion}
                  startingGame={startingGame}
                  handleQuryQusetion={handleQuryQusetion}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
