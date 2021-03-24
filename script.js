// Global Constants
const cluePauseTime = 333; // how long to pause in between clues
const nextClueWaitTime = 1000; // how long to wait before starting playback of the clue sequence

// Global Variables
// gameplay variables
var numButtons = 9; // total number of buttons
var numRounds = 4; // desired number of rounds to win
var lives = 5;
var maxLives = 5;
var buttonsWithImg = [1, 2, 3, 5]; // tracks which buttons have images attached
var difficulty = 1; // 1 is easy, 2 is medium, 3 is hard
// timer variables
var maxTime = 15;
var currTime = 15;
var timer;
var delayTimer;
// main game progression variables
var pattern = [1, 2, 3, 4, 4, 3, 2, 1];
var progress = 0;
var gamePlaying = false;
var guessCounter = 0; // tracks player guesses
var clueHoldTime = 1000; // how long to hold each clue's light/sound
var playingPattern = false;
var progressionSpeed = 0.15;
// sound variables
var tonePlaying = false;
var volume = 0.25; // must be between 0.0 and 1.0

// function to start the game and initialize/reset variables
function startGame() {
  // initialize game variables
  progress = 0;
  gamePlaying = true;
  guessCounter = 0;
  currTime = maxTime;
  // reset round display
  document.getElementById("roundNumber").innerHTML = progress + 1;

  // reset time left
  document.getElementById("timeLeft").innerHTML = maxTime;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  // reset lives
  lives = maxLives;
  document.getElementById("lives").innerHTML = lives;

  // generate pattern
  generateSequence(numButtons, numRounds);

  playClueSequence();
}

// function to end the game and set appropriate variables
function stopGame() {
  // set game variables
  gamePlaying = false;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  // stop timer
  clearTimeout(delayTimer); // prevents queued timer from counting down if stopped early
  clearInterval(timer);
}

// Sound Synthesis Functions
const freqMap = {
  1: 262,
  2: 294.8,
  3: 327.5,
  4: 349.3,
  5: 393,
  6: 436.7,
  7: 491,
  8: 524,
  9: 589.5
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

// functions to start/stop lighting up buttons
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
  if (buttonsWithImg.includes(btn)) {
    showImage(btn);
  }
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
  if (buttonsWithImg.includes(btn)) {
    hideImage(btn);
  }
}

// function to play a single clue
function playSingleClue(btn, clueTime) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueTime);
    setTimeout(clearButton, clueTime, btn);
  }
}

// plays clues successively
function playClueSequence() {
  guessCounter = 0;
  playingPattern = true;

  let delay = nextClueWaitTime; // set delay to initial wait time
  var adjustedTime = clueHoldTime * Math.pow(0.85, progress); // speed up rounds
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i], adjustedTime); // set a timeout to play that clue
    delay += adjustedTime;
    delay += cluePauseTime;
  }

  // start timer
  delayTimer = setTimeout(startTimer, delay, countdown, 1000);
  // set playingPattern to false after delay
  setTimeout(setPlayingPatternF, delay);
}
function setPlayingPatternF() {
  playingPattern = false;
}

// functions to deal with win/loss conditions
function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}
function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

// deal with logic for checking each guess
function guess(btn) {
  if (playingPattern) {
    // if pattern playing, don't allow player interaction
    return;
  }
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  // game logic
  if (btn != pattern[guessCounter]) {
    // guess was wrong
    // update and display number of lives left
    lives--;
    document.getElementById("lives").innerHTML = lives;

    // if out of lives, game over!
    if (lives <= 0) {
      setTimeout(loseGame, 1); // set a timeout to allow number of lives to update before ending game
    }
  } else {
    // guess was correct
    // if turn not over
    if (guessCounter != progress) {
      // move onto next guess
      guessCounter++;
    }
    // if turn is over
    else {
      // stop timer
      if (timer) {
        clearInterval(timer);
      }
      // reset time
      currTime = maxTime;
      document.getElementById("timeLeft").innerHTML = currTime;

      if (progress != pattern.length - 1) {
        // if this is not the last turn
        progress++;
        document.getElementById("roundNumber").innerHTML = progress + 1;
        playClueSequence();
      } else {
        // if this is the last turn
        winGame();
      }
    }
  }
}

// function to produce random numbers for sequence
function generateSequence(numButton, seqLen) {
  // reset pattern to empty
  pattern = [];
  for (let i = 0; i < seqLen; ++i) {
    // generate random number and update pattern based on number of buttons
    var patternVal = Math.floor(Math.random() * numButton) + 1;
    pattern.push(patternVal);
  }
}

// function to display/hide image when button is clicked
function showImage(img) {
  document.getElementById("button" + img + "Img").classList.add("showImage");
}
function hideImage(img) {
  document.getElementById("button" + img + "Img").classList.remove("showImage");
}

// function linking onmousedown/onmouseup events
function mouseDown(button) {
  if (!playingPattern) {
    // if pattern playing, don't allow player interaction
    startTone(button);
    if (buttonsWithImg.includes(button)) {
      showImage(button);
    }
  }
}
function mouseUp(button) {
  // if pattern playing, don't allow player interaction
  if (!playingPattern) {
    stopTone();
    if (buttonsWithImg.includes(button)) {
      hideImage(button);
    }
  }
}

// function to set countdown timer for each round
function countdown() {
  // decrement timer
  currTime -= 1;
  document.getElementById("timeLeft").innerHTML = currTime;
  // if time is up, end game and stop countdown (included in loseGame->stopGame)
  if (currTime <= 0) {
    setTimeout(loseGame, 1);
  }
}

function startTimer(count, delay = 1000) {
  timer = setInterval(count, delay);
}

function changeDifficulty() {
  // if not currently playing
  if (!gamePlaying) {
    // set difficulties
    if (difficulty == 1) {
      difficulty = 2;
      document.getElementById("difficultySetting").innerHTML = "Medium";
      // adjust game variables
      lives = 3;
      maxLives = 3;
      document.getElementById("lives").innerHTML = lives;
      maxTime = 10;
      currTime = 10;
      document.getElementById("timeLeft").innerHTML = maxTime;
      numRounds = 8;
    } else if (difficulty == 2) {
      difficulty = 3;
      document.getElementById("difficultySetting").innerHTML = "Hard";
      // adjust game variables
      lives = 1;
      maxLives = 1;
      document.getElementById("lives").innerHTML = lives;
      maxTime = 5;
      currTime = 5;
      document.getElementById("timeLeft").innerHTML = maxTime;
      numRounds = 16;
    } else if (difficulty == 3) {
      difficulty = 4;
      document.getElementById("difficultySetting").innerHTML = "Impossible";
      // adjust game variables
      lives = 1;
      maxLives = 1;
      document.getElementById("lives").innerHTML = lives;
      maxTime = 3;
      currTime = 3;
      document.getElementById("timeLeft").innerHTML = maxTime;
      numRounds = 1000;
    } else if (difficulty == 4) {
      difficulty = 1;
      document.getElementById("difficultySetting").innerHTML = "Easy";
      // adjust game variables
      lives = 5;
      maxLives = 5;
      document.getElementById("lives").innerHTML = lives;
      maxTime = 15;
      currTime = 15;
      document.getElementById("timeLeft").innerHTML = maxTime;
      numRounds = 4;
    }
  }
}
