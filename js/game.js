let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenMode = false;
let hideSettings = true;


/**
 * draws the whole world into the canvas --> starts the game
 */
function init() {
    hideStartscreen();
    showVolumeBtn();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    setAudio();
}


/**
 * restart game after finished it once
 */
function restartGame() {
    hideEndscreen();
    hideVolumeBtn();
    showStartscreen();
    changeVolumeImg();
    stopAudio();
}


/**
 * stop win or lose sound if restart game
 */
function stopAudio() {
    world.win_sound.pause();
    world.lost_sound.pause();
}


/**
 * hide startscreen
 */
function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}


/**
 * show startscreen
 */
function showStartscreen() {
    document.getElementById('startscreen').classList.remove('d-none');
}


/**
 * hide endscreen
 */
function hideEndscreen() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('lost-game').classList.add('d-none');
}


/**
 * hide controls (used if you lose or win game and u have settings still displayed)
 */
function hideControls() {
    document.getElementById('settings').classList.add('d-none');
}


/**
 * hide Settings
 */
function hideSettingsOnX() {
    let settings = document.getElementById('settings');
    settings.classList.add('d-none');
}


/**
 * show volume button
 */
function showVolumeBtn() {
    document.getElementById('volume').classList.remove('d-none');
}


/**
 * hide volume button
 */
function hideVolumeBtn() {
    document.getElementById('volume').classList.add('d-none');
}


/**
 * display and hide game settings
 */
function showSettings() {
    let settings = document.getElementById('settings');
    settings.classList.remove('d-none');
}


/**
 * enter/exit fullscreen mode
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
 * set the fullscreenMode var to false if fullscreen exits with esc button
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
    localStorage.setItem('audio', false);
}

/**
 * turn the audio on
 */
function volumeUp() {
    world.audio = true;
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
    volume.setAttribute('onclick', 'volumeMute()');
    localStorage.setItem('audio', true);
}


/**
 * change img of volume if game ends with audio turned off
 */
function changeVolumeImg() {
    let volume = document.getElementById('volume');
    volume.src = 'assets/img/sound.png';
}


/**
 * checks if audio mute in localstorage
 */
function setAudio() {
    let storage = localStorage.getItem('audio');
    if (storage) {
        if (storage == 'false') {
            volumeMute();
        }
    } else {
        world.audio = true
    }
}