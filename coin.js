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
            game.startGame(i);
            cards.forEach(card => card.addEventListener('click', () => {
                game.flipCard(card);
            }));
            
        }, 3000);
    }
}

function createBoard(cards) 
{
    let gameContainer = document.getElementById("yese").getElementsByClassName('game-container')[0];

    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < 2; j++) {
            const cardDiv = document.createElement('div');
            const backDiv = document.createElement('div');
            const frontDiv = document.createElement('div');
            const frontCard = document.createElement('img');
            const backCard = document.createElement('img');
            backCard.classList.add("default");
            backCard.src = 'Images/default.png';
            backCard.classList.add("card-value");
            frontCard.src = 'Images/' + i + '.jpg';
            frontCard.classList.add("card-value");
            cardDiv.classList.add("card");
            backDiv.classList.add("card-back");
            backDiv.classList.add("card-face");
            backDiv.appendChild(backCard);
            frontDiv.classList.add("card-front");
            frontDiv.classList.add("card-face");
            frontDiv.appendChild(frontCard);
            cardDiv.appendChild(backDiv);
            cardDiv.appendChild(frontDiv);
            gameContainer.appendChild(cardDiv);
            console.log(frontCard.src);

            // // create the card class
            // const card = document.createElement('div');
            // card.classList.add('card'); // Assign className to new element
            // card.classList.add(`tile_${i}`); // set identifier for card

            // // the clickSelector
            // card.setAttribute('onclick', `flipTile(this, ${cards[i]})`);

            // // append card to Li, and then that to the board
            // cardLi.appendChild(card);
            // board.appendChild(cardLi);

        }
    }
}

function ready() {
    let coin = new Coin();
    cardsArray = [0,1,2,3,4,5,6,7];
    createBoard(cardsArray);
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