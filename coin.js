class Coin {

    constructor() {
        this.coinImg = document.querySelector('.coin');
        this.flipBtn = document.querySelector('#flip-button');
        this.txt = document.querySelector('.txt');
    }

    flipCoin(game, cards) {
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
            if (i) {
                this.txt.innerHTML = document.getElementById("player1").innerHTML + "'s turn";
                this.txt.style.color = "cyan";
            } else {
                this.txt.innerHTML = document.getElementById("player2").innerHTML + "'s turn";
                this.txt.style.color = "yellow";
            }
            this.coinImg.style.opacity = 0;
            this.flipBtn.disabled = true;
            game.startGame(i);
            cards.forEach(card => card.addEventListener('click', () => {
                game.flipCard(card);
            }));

            document.body.style.backgroundImage = "url('images/game_background.jpg')";

        }, 3000);
    }
}

