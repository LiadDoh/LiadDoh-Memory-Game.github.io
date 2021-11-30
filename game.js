class Game {

    constructor(cards) { // constructor
        this.player1Score = 0;
        this.player2Score = 0;
        this.player1Wins = 0;
        this.player2Wins = 0;
        this.cardsArray = cards;
        this.audioController = new AudioController();
        this.firstPlayer = 0;
        this.matchedCards = [];
        this.coin = new Coin();
    }

    startGame(firstPlayer) { // start game
        if (firstPlayer) // if first player
            this.firstPlayer = 1;
        this.player1Score = 0;
        this.player2Score = 0;
        document.getElementById("score1").innerHTML = "Score:" + this.player1Score; // set score
        document.getElementById("score2").innerHTML = "Score:" + this.player2Score; // set score
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        this.coin.flipBtn.style.display = "none";
        document.getElementById("header").style.background = "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(1,2,8,1) 100%)"; // change header color

        setTimeout(() => { // shuffle cards
            this.audioController.startMusic();
            this.shuffleCards();
            this.busy = false;
        }, 500);
        this.hideCards();
        document.getElementById("first_player").style.border = "5px solid darkgreen"; // change border color
        document.getElementById("second_player").style.border = "5px solid darkgreen"; // change border color

    }

    hideCards() { // hide cards
        this.cardsArray.forEach(card => { // loop through cards
            card.classList.remove('visible');
            card.classList.remove('visible2');
            card.classList.remove('visible3');
            card.classList.remove('matched');
            card.style.border = "none";
        });
    }
    flipCard(card) { // flip card
        if (this.canFlipCard(card)) { // if can flip card
            this.audioController.flip(); // play flip sound
            let rand = Math.floor(Math.random() * 3); // get random number from 0 to 2 as to set the card flip animation
            if (rand === 0)
                card.classList.add('visible');
            else if (rand === 1)
                card.classList.add('visible2');
            else
                card.classList.add('visible3');

            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                if (this.getCardType(card) == "12.jpg") {
                    this.cardMatch(card, card)
                    this.cardToCheck = null;
                    return;
                }
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) { // check for card match
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) { // if card type is equal
            this.cardMatch(card, this.cardToCheck);
        } else { // if card type is not equal
            this.cardMisMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) { // card match
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.getCardType(card1) == "2.jpg") // if card type is Dina
            this.audioController.evil();
        setTimeout(ev => {
            this.audioController.match();
            if (this.firstPlayer) {
                card1.style.border = "5px solid cyan"; // change border color
                card2.style.border = "5px solid cyan"; // change border color
                this.player1Score++; // add player score
                document.getElementById("score1").innerHTML = "Score:" + this.player1Score; // set score
                if (this.matchedCards.length >= this.cardsArray.length) { // if all cards matched
                    this.audioController.victory(); // play victory sound
                    this.winner(); // show winner
                }
            } else {
                card1.style.border = "5px solid yellow"; // change border color
                card2.style.border = "5px solid yellow"; // change border color
                this.player2Score++; // add player score
                document.getElementById("score2").innerHTML = "Score:" + this.player2Score; // set score
                if (this.matchedCards.length >= this.cardsArray.length) { // if all cards matched
                    this.audioController.victory(); // play victory sound
                    this.winner(); // show winner
                }
            }
        }, 400);

    }

    winner() {
        if (this.player1Score > this.player2Score) { // if player 1 wins
            this.coin.txt.innerHTML = document.getElementById("player1").innerHTML + " Won! to start a new game flip the coin again";
            this.coin.txt.style.color = "cyan";
            document.getElementById("first_player").style.border = "15px solid indigo";
            this.player1Wins++;
            document.getElementById("gamesWon1").innerHTML = "Games Won:" + this.player1Wins;
        } else if (this.player2Score > this.player1Score) { // if player 2 wins
            this.coin.txt.innerHTML = document.getElementById("player2").innerHTML + " Won! to start a new game flip the coin again";
            document.getElementById("second_player").style.border = "15px solid indigo";
            this.coin.txt.style.color = "yellow";
            this.player2Wins++;
            document.getElementById("gamesWon2").innerHTML = "Games Won:" + this.player2Wins;
        } else { // if draw
            this.coin.txt.innerHTML = "It's a tie! to start a new game flip the coin again";
            this.coin.txt.style.color = "blue";
        }
        this.coin.flipBtn.style.display = "block"; // show flip button
        this.coin.flipBtn.disabled = false; // enable flip button
        this.coin.coinImg.style.opacity = 1; // show coin
    }

    cardMisMatch(card1, card2) { // card mismatch
        this.busy = true;
        setTimeout(() => { // hide cards
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            card1.classList.remove('visible2');
            card2.classList.remove('visible2');
            card1.classList.remove('visible3');
            card2.classList.remove('visible3');
            this.busy = false;
            this.firstPlayer = !this.firstPlayer;
            if (this.firstPlayer) { // if first player
                this.coin.txt.innerHTML = document.getElementById("player1").innerHTML + "'s turn";
                this.coin.txt.style.color = "cyan";
            } else { // if second player
                this.coin.txt.innerHTML = document.getElementById("player2").innerHTML + "'s turn";
                this.coin.txt.style.color = "yellow";
            }
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[1].src.split('/')[4]; // get card type
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) { // loop from end to start
            let randIndex = Math.floor(Math.random() * (i + 1)); // get random number from 0 to i
            this.cardsArray[randIndex].style.order = i; // set card order
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) { // check if can flip card
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck; // if card is not busy, card is not matched and card is not the card to check
    }
}