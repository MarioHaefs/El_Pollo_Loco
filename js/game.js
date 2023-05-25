let canvas;
let world;
let keyboard = new Keyboard();
game_sound = new Audio('audio/game.mp3');

/**
 * draws the whole World into the Canvas --> starts the Game
 */
function init() {
    hideStartscreen();
    playIngameBackgroundMusic();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}


/**
 * plays the main ingame Theme
 */
function playIngameBackgroundMusic() {
    this.game_sound.volume = 0.03;
    this.game_sound.play();
}


/**
 * hide startscreen
 */
function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}


/**
 * bind keyboard buttons to variables --> controls to play the Game
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});
