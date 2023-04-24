/*----- constants -----*/
const fruits={
    f1: {
        name: "cherry",
        image: "../imgs/cherry.png",
    },
    f2: {
        name: "apple",
        image: "../imgs/apple.png",
    },
    f3: {
        name: "melon",
        image: "../imgs/melon.png",
    },
    f4: {
        name: "orange",
        image: "../imgs/orange.png",
    },
    f5: {
        name: "banana",
        image: "../imgs/banana.png",
    },
    f6: {
        name: "peach",
        image: "../imgs/peach.png",
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

let playerMoney = 200
let playerBet = 10
let winningRound = false;
let currentReels= ["banana", "peach", "melon"]

  /*----- cached elements  -----*/
const resultMessage=document.getElementById("msg")
const betDown=document.getElementById("left")
const betUp=document.getElementById("right")
const betScreen=document.getElementById("centre")
const playButton=document.getElementById("bet")

  /*----- event listeners -----*/
playButton.addEventListener('click', spinTheWheel)
betUp.addEventListener('click', betIncreases)
betDown.addEventListener('click', betDecreases)

  /*----- functions -----*/

function spinTheWheel(){
    console.log("wheel is spinning")
}

function betDecreases(){
    if (playerBet > 10){
        playerBet -= 10
        betScreen.innerHTML=`$ ${playerBet}`
        console.log("bet went down by $10")
        console.log("Bet is now ", playerBet)
    }
}

function betIncreases(){
    if (playerBet < playerMoney){
        playerBet += 10
        betScreen.innerHTML=`$ ${playerBet}`
        console.log("bet went up by $10")
        console.log("Bet is now ", playerBet)
    }
}
