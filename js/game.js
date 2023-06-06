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
 * restart Game after finished it once
 */
function restartGame() {
    hideEndscreen();
    hideVolumeBtn();
    showStartscreen();
    changeVolumeImg();
    stopAudio();
}


/**
 * stop win or lose sound if restart Game
 */
function stopAudio() {
    world.win_sound.pause();
    world.lost_sound.pause();
}


/**
 * hide Startscreen
 */
function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}


/**
 * show Startscreen
 */
function showStartscreen() {
    document.getElementById('startscreen').classList.remove('d-none');
}


/**
 * hide Endscreen
 */
function hideEndscreen() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('lost-game').classList.add('d-none');
}


/**
 * hide Controls (used if you lose or win game and u have settings still displayed)
 */
function hideControls() {
    document.getElementById('settings').classList.add('d-none');
}


/**
 * show Volume Button
 */
function showVolumeBtn() {
    document.getElementById('volume').classList.remove('d-none');
}


/**
 * hide Volume Button
 */
function hideVolumeBtn() {
    document.getElementById('volume').classList.add('d-none');
}


/**
 * display and hide Game Settings
 */
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
 * change img of volume if game ends with audio turned off
 */
function changeVolumeImg() {
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
}