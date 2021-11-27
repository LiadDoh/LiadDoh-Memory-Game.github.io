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

function createCard(gameContainer,i) {
    const cardDiv = document.createElement('div');
    const backDiv = document.createElement('div');
    const frontDiv = document.createElement('div');
    const frontCard = document.createElement('img');
    const backCard = document.createElement('img');
    backCard.classList.add("default");
    backCard.src = 'Images/default.png';
    backCard.classList.add("card-value");
    frontCard.src = 'Images/' + i + '.jpg';
    frontCard.classList.add('card-value');
    cardDiv.classList.add('card');
    backDiv.classList.add("card-back");
    backDiv.classList.add("card-face");
    backDiv.appendChild(backCard);
    frontDiv.classList.add("card-front");
    frontDiv.classList.add("card-face");
    frontDiv.appendChild(frontCard);
    cardDiv.appendChild(backDiv);
    cardDiv.appendChild(frontDiv);
    gameContainer.appendChild(cardDiv);
}

function createBoard(cards,boardsize) {
    let gameContainer = document.getElementById("yese").getElementsByClassName('game-container')[0];

    for (let i = 0; i < cards.length; i++) {
        if (i == cards.length -1 && boardsize == 5) 
            createCard(gameContainer,i);
        else
            for (let j = 0; j < 2; j++) {
                createCard(gameContainer,i);
            }
    }
}

function ready(boardsize) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var boardsize = url.searchParams.get("game_board_size");
    let cardsArray = [];
    let coin = new Coin();
    let gameContainer = document.getElementById("yese").getElementsByClassName('game-container')[0];
    if (boardsize == 4){
        cardsArray = [0, 1, 2, 3, 4, 5, 6, 7];
        gameContainer.classList.add("game-container-4");
    }
    else if(boardsize == 5)
    {
        cardsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        gameContainer.classList.add("game-container-5");
    }
    createBoard(cardsArray,boardsize);
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Game(cards);
    coin.flipBtn.addEventListener("click", () => {
        coin.flipCoin(game, cards);
    }, 3000);
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready(boardsize));
} else {
    ready();
}