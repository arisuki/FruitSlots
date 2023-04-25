/*----- constants -----*/
const fruits={
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
        odds: 1000
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
        odds: 15
    },

    singlecherry: {
        name: "single cherry",
        image: "url('imgs/cherry.png')",
        odds: 3,
    },
}

const arrayWheel= [
"cherry", "cherry", "cherry", "cherry", "cherry", 
"apple", "apple", "apple", "apple", 
"melon", "melon", "melon", 
"orange", "orange",
"banana", 
"peach"]


/*----- state variables -----*/

let playerMoney
let playerBet
let winningRound = false;
let currentReels= ["", "", ""]
let reel1
let reel2
let reel3

  /*----- cached elements  -----*/
const resultMessage=document.getElementById("msg")
const betDown=document.getElementById("left")
const betUp=document.getElementById("right")
const betScreen=document.getElementById("centre")
const playButton=document.getElementById("bet")
const moneyScreen=document.getElementById("currentMoney")
const fruit1=document.getElementById("fruit1")
const fruit2=document.getElementById("fruit2")
const fruit3=document.getElementById("fruit3")



  /*----- event listeners -----*/
playButton.addEventListener('click', spinTheWheel)
betUp.addEventListener('click', betIncreases)
betDown.addEventListener('click', betDecreases)

  /*----- functions -----*/

init()
function init(){
    console.log("initating board")
    playerMoney=200
    playerBet=10
    winningRound=false;
    currentReels=["cherry", "cherry", "cherry"]
    renderGame()
}

//spins 3 different times, checks winner, calls render 
function spinTheWheel(){
    if (playerMoney > 0){
        console.log("wheel is spinning")
        currentReels=[spinning(), spinning(), spinning()]
        checkWinner()
    } 
    
    // reel1=currentReels[0]
    // reel2=currentReels[1]
    // reel3=currentReels[2]
    
    renderGame()
}

//spins 3x in spinTheWheel
function spinning(){
const randomNum= Math.floor(Math.random()*arrayWheel.length)
return arrayWheel[randomNum]
}

//decreasing the bet
function betDecreases(){
    if (playerBet > 10){
        playerBet -= 10
        renderGame()
        console.log("bet went down by $10")
        console.log("Bet is now ", playerBet)
    }
}

//increasing the bet
function betIncreases(){
    if (playerBet < playerMoney){
        playerBet += 10
        renderGame()
        console.log("bet went up by $10")
        console.log("Bet is now ", playerBet)
    }
}

//renders game after each spin or each money raise
function renderGame(){
    betScreen.innerHTML=`$ ${playerBet}`
    moneyScreen.innerHTML=`$ ${playerMoney}`
    // fruit1.style.backgroundImage = fruits.peach.image
    // fruit2.style.backgroundImage = fruits.peach.image
    // fruit3.style.backgroundImage = fruits.peach.image

    fruit1.style.backgroundImage = fruits[currentReels[0]].image
    fruit2.style.backgroundImage = fruits[currentReels[1]].image
    fruit3.style.backgroundImage = fruits[currentReels[2]].image
    console.log(currentReels)
}

//checks for a winner & pays out, or if loser, subtracts out
function checkWinner(){
    if (currentReels[0]==currentReels[1] && currentReels[1]==currentReels[2]){
        playerMoney=playerMoney+(playerBet*(fruits[currentReels[0]].odds))
        winningRound=true;
    }
    else{
        playerMoney-=playerBet
        winningRound=false;
// adjusts bet so you don't go into negatives
        if (playerBet>playerMoney){
            playerBet=playerMoney
        }
    }
    console.log("Is there a winner?: ", winningRound)
    }

function messageUpdate(){
    return
}