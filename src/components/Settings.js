import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../styles/Settings.css";

export default function MusicPlayer(props) {
  let startClickInput = props.startClick;
  let axiosCompleteInput = props.axiosComplete;

  const [settingsClick, setSettingsClick] = useState(false);

  const [timeStyle, setTimeStyle] = useState({
    1: "",
    2: "select",
    3: "",
    5: "",
    10: "",
  });
  const [roundsstyle, setRoundsStyle] = useState({
    5: "select",
    10: "",
    15: "",
    20: "",
  });
  const [genreStyle, setGenreStyle] = useState({
    Chart: "select",
    KPopTop: "",
    KPop2010: "",
    KPop2000: "",
    Christian: "",
  });

  function handleGenreClick(e) {
    setSettingsClick((prev) => !prev);
    let clickedGenre = e.target.innerText;
    if (clickedGenre === "Top USA Chart") {
      setGenreStyle({
        Chart: "select",
        KPopTop: "",
        KPop2010: "",
        KPop2000: "",
        Christian: "",
      });
      props.handleGenres("Top USA Chart");
      if (axiosCompleteInput) {
        props.handleAxiosComplete(false);
      }
    } else if (clickedGenre === "Top K-Pop") {
      setGenreStyle({
        Chart: "",
        KPopTop: "select",
        KPop2010: "",
        KPop2000: "",
        Christian: "",
      });
      props.handleGenres("K-Pop");
      if (axiosCompleteInput) {
        props.handleAxiosComplete(false);
      }
    } else if (clickedGenre === "2010s K-Pop") {
      setGenreStyle({
        Chart: "",
        KPopTop: "",
        KPop2010: "select",
        KPop2000: "",
        Christian: "",
      });
      props.handleGenres("2010s K-Pop");
      if (axiosCompleteInput) {
        props.handleAxiosComplete(false);
      }
    } else if (clickedGenre === "2000s K-Pop") {
      setGenreStyle({
        Chart: "",
        KPopTop: "",
        KPop2010: "",
        KPop2000: "select",
        Christian: "",
      });
      props.handleGenres("2000s K-Pop");
      if (axiosCompleteInput) {
        props.handleAxiosComplete(false);
      }
    } else if (clickedGenre === "Christian") {
      setGenreStyle({
        Chart: "",
        KPopTop: "",
        KPop2010: "",
        KPop2000: "",
        Christian: "select",
      });
      props.handleGenres("Christian");
      if (axiosCompleteInput) {
        props.handleAxiosComplete(false);
      }
    } else {
      setGenreStyle({
        Chart: "",
        KPopTop: "",
        KPop2010: "",
        KPop2000: "",
        Christian: "",
      });
    }
  }

  function handleTimeClick(e) {
    setSettingsClick((prev) => !prev);
    let clickedTime = e.target.innerText;
    if (clickedTime === "1s") {
      setTimeStyle({ 1: "select", 2: "", 3: "", 5: "", 10: "" });
      props.handleMusicPlayTime(1000);
    } else if (clickedTime === "2s") {
      setTimeStyle({ 1: "", 2: "select", 3: "", 5: "", 10: "" });
      props.handleMusicPlayTime(2000);
    } else if (clickedTime === "3s") {
      setTimeStyle({ 1: "", 2: "", 3: "select", 5: "", 10: "" });
      props.handleMusicPlayTime(3000);
    } else if (clickedTime === "5s") {
      setTimeStyle({ 1: "", 2: "", 3: "", 5: "select", 10: "" });
      props.handleMusicPlayTime(5000);
    } else if (clickedTime === "10s") {
      setTimeStyle({ 1: "", 2: "", 3: "", 5: "", 10: "select" });
      props.handleMusicPlayTime(10000);
    } else {
      setTimeStyle({ 1: "", 2: "", 3: "", 5: "", 10: "" });
    }
  }

  function handleRoundsClick(e) {
    setSettingsClick((prev) => !prev);
    let clickedRounds = e.target.innerText;
    if (clickedRounds === "5") {
      setRoundsStyle({ 5: "select", 10: "", 15: "", 20: "" });
      props.handleRounds(5);
    } else if (clickedRounds === "10") {
      setRoundsStyle({ 5: "", 10: "select", 15: "", 20: "" });
      props.handleRounds(10);
    } else if (clickedRounds === "15") {
      setRoundsStyle({ 5: "", 10: "", 15: "select", 20: "" });
      props.handleRounds(15);
    } else if (clickedRounds === "20") {
      setRoundsStyle({ 5: "", 10: "", 15: "", 20: "select" });
      props.handleRounds(20);
    } else {
      setTimeStyle({ 1: "", 2: "", 3: "", 5: "", 10: "" });
    }
  }

  return (
    <div className="settings" onClick={() => setSettingsClick((prev) => !prev)}>
      <IoSettingsOutline
        size={30}
        className="settings-icon"
        style={{
          color: "black",
          zIndex: "5",
          display: "flex",
          padding: "10px",
        }}
      />
      <ul className={settingsClick ? "settings-list active" : "settings-list"}>
        {settingsClick ? (
          <div>
            <IoSettingsOutline
              size={30}
              className="test-icon"
              style={{
                display: "flex",
                color: "black",
                zIndex: "5",
                padding: "20px",
              }}
            />

            <li className="setting-title top">
              <p>Music Play Time</p>
              <div className="setting-list-row-container">
                <li
                  className="setting-option"
                  id={timeStyle[1]}
                  onClick={handleTimeClick}
                >
                  {" "}
                  1s{" "}
                </li>
                <li
                  className="setting-option"
                  id={timeStyle[2]}
                  onClick={handleTimeClick}
                >
                  {" "}
                  2s{" "}
                </li>
                <li
                  className="setting-option"
                  id={timeStyle[3]}
                  onClick={handleTimeClick}
                >
                  {" "}
                  3s{" "}
                </li>
                <li
                  className="setting-option"
                  id={timeStyle[5]}
                  onClick={handleTimeClick}
                >
                  {" "}
                  5s{" "}
                </li>
                <li
                  className="setting-option"
                  id={timeStyle[10]}
                  onClick={handleTimeClick}
                >
                  {" "}
                  10s{" "}
                </li>
              </div>
            </li>
            <li className="setting-title">
              <p>Rounds</p>
              <div className="setting-list-row-container">
                <li
                  className="setting-option"
                  id={roundsstyle[5]}
                  onClick={handleRoundsClick}
                >
                  {" "}
                  5{" "}
                </li>
                <li
                  className="setting-option"
                  id={roundsstyle[10]}
                  onClick={handleRoundsClick}
                >
                  {" "}
                  10{" "}
                </li>
                <li
                  className="setting-option"
                  id={roundsstyle[15]}
                  onClick={handleRoundsClick}
                >
                  {" "}
                  15{" "}
                </li>
                <li
                  className="setting-option"
                  id={roundsstyle[20]}
                  onClick={handleRoundsClick}
                >
                  {" "}
                  20{" "}
                </li>
              </div>
            </li>
            <li className="setting-title">
              <p>Genre</p>
              <div className="setting-list-row-container">
                <li
                  className={
                    startClickInput
                      ? "setting-option-disabled"
                      : "setting-option"
                  }
                  id={genreStyle.Chart}
                  onClick={handleGenreClick}
                >
                  Top USA Chart
                </li>
                <li
                  className={
                    startClickInput
                      ? "setting-option-disabled"
                      : "setting-option"
                  }
                  id={genreStyle.KPopTop}
                  onClick={handleGenreClick}
                >
                  Top K-Pop
                </li>
                <li
                  className={
                    startClickInput
                      ? "setting-option-disabled"
                      : "setting-option"
                  }
                  id={genreStyle.KPop2010}
                  onClick={handleGenreClick}
                >
                  2010s K-Pop
                </li>
                <li
                  className={
                    startClickInput
                      ? "setting-option-disabled"
                      : "setting-option"
                  }
                  id={genreStyle.KPop2000}
                  onClick={handleGenreClick}
                >
                  2000s K-Pop
                </li>
                <li
                  className={
                    startClickInput
                      ? "setting-option-disabled"
                      : "setting-option"
                  }
                  id={genreStyle.Christian}
                  onClick={handleGenreClick}
                >
                  Christian
                </li>
              </div>
            </li>
          </div>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
