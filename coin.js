class Coin {

    constructor() {
        this.coinImg = document.querySelector('.coin');
        this.flipBtn = document.querySelector('#flip-button');
        this.txt = document.querySelector('.txt');
    }

    flipCoin(game,cards) {
        let i = Math.floor(Math.random() * 2);
        this.coinImg.style.animation = 'none';

        if (i) {
            setTimeout(() => {
                this.coinImg.style.animation = "spin-heads 3s forwards";
            }, 100);

        } else {
            setTimeout(() => {
                this.coinImg.style.animation = "spin-tails 3s forwards";
            }, 100);
        }
        //make image and button disappear
        setTimeout(() => {
            if (i)
                this.txt.innerHTML = document.getElementById("player1").innerHTML + " turn";
            else
                this.txt.innerHTML = document.getElementById("player2").innerHTML + " turn";
            this.coinImg.style.opacity = 0;
            this.flipBtn.disabled = true;
            
            cards.forEach(card => card.addEventListener('click', () => {
                game.flipCard(card);
            }));
            game.startGame(i);
        }, 3000);
    }
}


function ready() {
    let coin = new Coin();
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Game(cards);
    coin.flipBtn.addEventListener("click", () => {
        coin.flipCoin(game,cards);
    }, 3000);
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}