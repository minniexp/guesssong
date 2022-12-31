# SONG GAME (GUESS SONG)

#### Video Demo URL: <URL>

## Description:

The goal of the game is to listen to the song for a set amount of time and correctly guess the song's title and artist.

### HOW TO PLAY

1. Click on Gear button to choose the settings

- Music Play Time - default duration of how long the music will play for
- Rounds - the number of plays in one game
- Genre - music type the game will use (cannot be changed in the middle of the game)

2. Click Start Game

- Must click on play button to listen to music
- Listen Again Button - Listen to the song for the same aount of time
- Listen More Xs - Listen to the song for X amount of seconds (auto-increment by 1s)
- Choose Correct Song - Once ready to choose an answer, click on this button

3. Choose Correct Answer

- Correct answer is shown in blue. Incorrect answer is shown in red.
- Click on Next Song after choosing an answer (Next Song can be pressed to also skip to the next song)

### Technology

This App uses React v18.0

Song query is pulled from Deezer using Rapid API.

### Possible Improvements:

- Use personal playlist (Ex. Spotify)
- Different Answer Methods (Ex. Type the correct song)
- Leaderboard (Game shows the top 10 players)

### Setup:

To run this project, install it locally using npm:

```
$ cd ../songgame
$ npm install
$ npm start
```

### Acknowledgments:

- https://react-icons.github.io/react-icons/icons?name=fa
- https://github.com/Lemoncode/react-promise-tracker/tree/master/src
