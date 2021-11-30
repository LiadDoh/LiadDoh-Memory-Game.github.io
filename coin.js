class Coin {

    constructor() {
        this.coinImg = document.querySelector('.coin');
        this.flipBtn = document.querySelector('#flip-button');
        this.txt = document.querySelector('.txt');
    }

    flipCoin(game, cards) { // flip the coin and check if it is heads or tails
        let i = Math.floor(Math.random() * 2); // 0 or 1
        this.coinImg.style.animation = 'none'; // remove animation

        if (i) { // if i is 1
            setTimeout(() => { // wait for the animation to finish
                this.coinImg.style.animation = "spin-heads 3s forwards";
            }, 100);

        } else { // if i is 0
            setTimeout(() => { // wait for the animation to finish
                this.coinImg.style.animation = "spin-tails 3s forwards";
            }, 100);
        }
        //make image and button disappear
        setTimeout(() => { // wait for the animation to finish
            if (i) { // if i is 1
                this.txt.innerHTML = document.getElementById("player1").innerHTML + "'s turn"; // change text to player 1
                this.txt.style.color = "cyan"; // change color to cyan
            } else { // if i is 0
                this.txt.innerHTML = document.getElementById("player2").innerHTML + "'s turn"; // change the text to player2
                this.txt.style.color = "yellow"; // change color to yellow
            }
            this.coinImg.style.opacity = 0; // make image disappear
            this.flipBtn.disabled = true; // disable button
            game.startGame(i); // start the game
            cards.forEach(card => card.addEventListener('click', () => { // add event listener to each card
                game.flipCard(card);
            }));

            document.body.style.backgroundImage = "url('images/game_background.jpg')"; // change background image

        }, 3000);
    }
}