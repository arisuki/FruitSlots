/*----- constants -----*/
const fruits = {
  cherry: {
    name: "cherry",
    image: "url('imgs/cherry.png')",
    odds: 50,
  },
  apple: {
    name: "apple",
    image: "url('imgs/apple.png')",
    odds: 75,
  },
  melon: {
    name: "melon",
    image: "url('imgs/melon.png')",
    odds: 500,
  },
  orange: {
    name: "orange",
    image: "url('imgs/orange.png')",
    odds: 1000,
  },
  banana: {
    name: "banana",
    image: "url('imgs/banana.png')",
    odds: 4000,
  },
  peach: {
    name: "peach",
    image: "url('imgs/peach.png')",
    odds: 5000,
  },
  doublecherry: {
    name: "double cherry",
    image: "url('imgs/cherry.png')",
    odds: 5,
  },

  singlecherry: {
    name: "single cherry",
    image: "url('imgs/cherry.png')",
    odds: 2,
  },
};

const arrayWheel = [
  "cherry",
  "cherry",
  "cherry",
  "cherry",
  "cherry",
  "apple",
  "apple",
  "apple",
  "apple",
  "melon",
  "melon",
  "melon",
  "orange",
  "orange",
  "banana",
  "peach",
];

const soundBGM = new Audio("sounds/bgm.mp3");
const soundWin = new Audio("sounds/win.wav");
const soundLose = new Audio("sounds/lose.wav");
const soundSpin = new Audio("sounds/spin.wav");
let isPlaying = false;
/*----- state variables -----*/

let playerMoney;
let playerBet;
let winningRound = false;
let currentReels = ["", "", ""];
let reel1;
let reel2;
let reel3;

/*----- cached elements  -----*/
const resultMessage = document.getElementById("msg");
const betDown = document.getElementById("left");
const betUp = document.getElementById("right");
const betScreen = document.getElementById("centre");
const playButton = document.getElementById("handle");
const moneyScreen = document.getElementById("currentMoney");
const musicButton = document.getElementById("musicButton");
const fruit1 = document.getElementById("fruit1");
const fruit2 = document.getElementById("fruit2");
const fruit3 = document.getElementById("fruit3");
const f1 = document.getElementById("f1");
const f2 = document.getElementById("f2");
const f3 = document.getElementById("f3");

/*----- event listeners -----*/
playButton.addEventListener("mousedown", changeHandle);
playButton.addEventListener("mouseup", spinTheWheel);
betUp.addEventListener("click", betIncreases);
betDown.addEventListener("click", betDecreases);
musicButton.addEventListener("click", musicPlayer);

/*----- functions -----*/

init();
function init() {
  playerMoney = 200;
  playerBet = 10;
  winningRound = false;
  currentReels = ["cherry", "cherry", "cherry"];
  renderGame();
}

function changeHandle() {
  handle.src = "imgs/handledown.gif";
}

//spins 3 different times, checks winner, animates, calls render
function spinTheWheel() {
  handle.src = "imgs/handleup.gif";

  //disables clicking
  playButton.removeEventListener("mouseup", spinTheWheel);
  playButton.removeEventListener("mousedown", changeHandle);

  //can only play if you have money
  if (playerMoney > 0) {
    currentReels = [spinning(), spinning(), spinning()];
    checkWinner();
    animateSpin();
    renderGame();

    //brings back clicking
    setTimeout(() => {
      playButton.addEventListener("mousedown", changeHandle);
      playButton.addEventListener("mouseup", spinTheWheel);
    }, 3000);
  }
}

//spins 3x in spinTheWheel
function spinning() {
  const randomNum = Math.floor(Math.random() * arrayWheel.length);
  return arrayWheel[randomNum];
}

//decreasing the bet
function betDecreases() {
  if (playerBet > 10) {
    playerBet -= 10;
    renderGame();
  }
}

//increasing the bet
function betIncreases() {
  if (playerBet < playerMoney) {
    playerBet += 10;
    renderGame();
  }
}

//renders game after each spin or each money raise
function renderGame() {
  betScreen.innerHTML = `$ ${playerBet}`;
  moneyScreen.innerHTML = `$ ${playerMoney}`;
  fruit1.style.backgroundImage = fruits[currentReels[0]].image;
  fruit2.style.backgroundImage = fruits[currentReels[1]].image;
  fruit3.style.backgroundImage = fruits[currentReels[2]].image;
}

//checks for a winner & pays out, or if loser, subtracts out
function checkWinner() {
  let winAmount;
  playerMoney -= playerBet;
  //current reels all match
  if (
    currentReels[0] == currentReels[1] &&
    currentReels[1] == currentReels[2]
  ) {
    winAmount = playerBet + playerBet * fruits[currentReels[0]].odds;
    winningRound = true;
  }
  // check for 1 or 2 cherries
  else if (currentReels[0] == "cherry" && currentReels[1] == "cherry") {
    winAmount = playerBet + playerBet * fruits.doublecherry.odds;
    winningRound = true;
  } else if (currentReels[0] == "cherry") {
    winAmount = playerBet + playerBet * fruits.singlecherry.odds;
    winningRound = true;
  }
  // lose
  else {
    setTimeout(() => {
      resultMessage.innerText = `You lose $ ${playerBet}`;
      soundLose.play();
      // adjusts bet so you don't go into negatives
      if (playerBet > playerMoney) {
        playerBet = playerMoney;
      }
    }, 3000);
    winningRound = false;

    //prints winning message
  }
  if (winningRound === true) {
    setTimeout(() => {
      resultMessage.innerText = `You win $ ${winAmount}`;
      playerMoney += winAmount;
      soundWin.play();
      renderGame();
    }, 3000);
  }
}

function animateSpin() {
  f1.src = "imgs/spinning.gif";
  f2.src = "imgs/spinning.gif";
  f3.src = "imgs/spinning.gif";
  soundSpin.play();
  resultMessage.innerText = `-s p i n n i n g-`;

  setTimeout(() => {
    f1.src = "imgs/blank.gif";
  }, 1000);
  setTimeout(() => {
    f2.src = "imgs/blank.gif";
  }, 2000);
  setTimeout(() => {
    f3.src = "imgs/blank.gif";
  }, 3000);
}

//plays BGM if it is not already playing, pauses otherwise
function musicPlayer() {
  if (isPlaying === false) {
    soundBGM.play();
    soundBGM.loop = true;
    isPlaying = true;
  } else {
    soundBGM.pause();
    isPlaying = false;
  }
}
