class AudioController {
    constructor() {
        this.bgMusic = new Audio('Audio/creepy.mp3');
        this.flipSound = new Audio('Audio/flip.wav');
        this.matchSound = new Audio('Audio/match.wav');
        this.victorySound = new Audio('Audio/victory.wav');
        this.evilSound = new Audio('Audio/evil-laugh.mp3');
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

    evil() {
        this.stopMusic();
        this.evilSound.play();
        setTimeout(() => {
            this.evilSound.pause();
            this.bgMusic.play();
        }, 2000);

    }
}