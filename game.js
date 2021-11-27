class AudioController {
    constructor() {
        this.bgMusic = new Audio('Audio/creepy.mp3');
        this.flipSound = new Audio('Audio/flip.wav');
        this.matchSound = new Audio('Audio/match.wav');
        this.victorySound = new Audio('Audio/victory.wav');
        this.bgMusic.volume = 0.3;
        this.bgMusic.loop = true;
    }

    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    flip() {
        this.flipSound.play();
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
}

class Game {

    constructor(cards) {
        this.player1Score = 0;
        this.player2Score = 0;
        this.player1Wins = 0;
        this.player2Wins = 0;
        this.cardsArray = cards;
        this.audioController = new AudioController();
        this.firstPlayer = 0;
        this.coin = new Coin();
    }

    startGame(firstPlayer) {
        if (firstPlayer)
            this.firstPlayer = 1;
        this.player1Score = 0;
        this.player2Score = 0;
        document.getElementById("score1").innerHTML = "Score:" + this.player1Score;
        document.getElementById("score2").innerHTML = "Score:" + this.player2Score;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        this.coin.flipBtn.style.display = "none";
        document.getElementById("header").style.background = "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(1,2,8,1) 100%)";

        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards();
            this.busy = false;
        }, 500);
        this.hideCards();
        document.getElementById("first_player").style.border = "5px solid darkgreen";
        document.getElementById("second_player").style.border = "5px solid darkgreen";

    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('visible2');
            card.classList.remove('matched');
            card.style.border = "none";
        });
    }
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            if (Math.floor(Math.random() * 2) === 0)
                card.classList.add('visible');
            else
                card.classList.add('visible2');

            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        setTimeout(ev => {
            this.audioController.match();
            if (this.firstPlayer) {
                card1.style.border = "5px solid cyan";
                card2.style.border = "5px solid cyan";
                this.player1Score++;
                document.getElementById("score1").innerHTML = "Score:" + this.player1Score;
                if (this.matchedCards.length === this.cardsArray.length) {
                    this.audioController.victory();
                    this.winner();
                }
            } else {
                card1.style.border = "5px solid yellow";
                card2.style.border = "5px solid yellow";
                this.player2Score++;
                document.getElementById("score2").innerHTML = "Score:" + this.player2Score;
                if (this.matchedCards.length === this.cardsArray.length) {
                    this.audioController.victory();
                    this.winner();
                }
            }
        }, 400);

    }

    winner() {
        if (this.player1Score > this.player2Score) {
            this.coin.txt.innerHTML = document.getElementById("player1").innerHTML + " Won! to start a new game flip the coin again";
            this.coin.txt.style.color = "cyan";
            document.getElementById("first_player").style.border = "15px solid indigo";
            this.player1Wins++;
            document.getElementById("gamesWon1").innerHTML = "Games Won:" + this.player1Wins;
        } else if (this.player2Score > this.player1Score) {
            this.coin.txt.innerHTML = document.getElementById("player2").innerHTML + " Won! to start a new game flip the coin again";
            document.getElementById("second_player").style.border = "15px solid indigo";
            this.coin.txt.style.color = "yellow";
            this.player2Wins++;
            document.getElementById("gamesWon2").innerHTML = "Games Won:" + this.player2Wins;
        } else {
            this.coin.txt.innerHTML = "It's a tie! to start a new game flip the coin again";
            this.coin.txt.style.color = "blue";
        }
        this.coin.flipBtn.style.display = "block";
        this.coin.flipBtn.disabled = false;
        this.coin.coinImg.style.opacity = 1;
    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            card1.classList.remove('visible2');
            card2.classList.remove('visible2');
            this.busy = false;
            this.firstPlayer = !this.firstPlayer;
            if (this.firstPlayer) {
                this.coin.txt.innerHTML = document.getElementById("player1").innerHTML + "'s turn";
                this.coin.txt.style.color = "cyan";
            } else {
                this.coin.txt.innerHTML = document.getElementById("player2").innerHTML + "'s turn";
                this.coin.txt.style.color = "yellow";
            }
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[1].src;
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }


}

function getDetails() {
    document.getElementById("player1").innerHTML = gameData.player1.name;
    document.getElementById("player2").innerHTML = gameData.player2.name;
    document.getElementById("score1").innerHTML = "Score:" + gameData.player1.score;
    document.getElementById("score2").innerHTML = "Score:" + gameData.player2.score;
    document.getElementById("gamesWon1").innerHTML = "Games Won:" + gameData.player1.gamesWon;
    document.getElementById("gamesWon2").innerHTML = "Games Won:" + gameData.player2.gamesWon;
}

// Load Details
var url_string = window.location.href;
var url = new URL(url_string);
var player1 = url.searchParams.get("player1");
var player2 = url.searchParams.get("player2");
var boardsize = url.searchParams.get("game_board_size");
console.log(boardsize);
const gameData = {
    player1: {
        name: player1,
        score: 0,
        gamesWon: 0
    },
    player2: {
        name: player2,
        score: 0,
        gamesWon: 0
    },
    game_board_size: boardsize

}
gameData.player1.name = player1;
gameData.player2.name = player2;

window.onload = getDetails();