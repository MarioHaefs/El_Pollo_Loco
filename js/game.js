let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenMode = false;
let hideSettings = true;


/**
 * draws the whole World into the Canvas --> starts the Game
 */
function init() {
    hideStartscreen();
    showVolumeBtn();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}


/**
 * hide startscreen
 */
function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}


/**
 * show Volume Button
 */
function showVolumeBtn() {
    document.getElementById('volume').classList.remove('d-none');
}


function showSettings() {
    let settings = document.getElementById('settings');

    if (hideSettings) {
        settings.classList.remove('d-none');
        hideSettings = false;
    } else if (!hideSettings) {
        settings.classList.add('d-none');
        hideSettings = true;
    } 
}


/**
 * enter/exit Fullscreen Mode
 */
function fullscreen() {
    let fullscreen = document.getElementById('content');
    if (!fullscreenMode) {
        fullscreen.requestFullscreen();
        fullscreenMode = true;
    } else {
        document.exitFullscreen();
        fullscreenMode = false;
    }
}


/**
 * set the fullscreenMode Var to false if Fullscreen exits with ESC Button
 */
function exitFullscreenHandler() {
    if (!document.fullscreenElement) {
        fullscreenMode = false;
    }
}

document.addEventListener('fullscreenchange', exitFullscreenHandler);


/**
 * mute the game audio
 */
function volumeMute() {
    world.audio = false;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound-off.png';
    volume.setAttribute('onclick', 'volumeUp()');
}

/**
 * turn the audio on
 */
function volumeUp() {
    world.audio = true;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
    volume.setAttribute('onclick', 'volumeMute()');
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
