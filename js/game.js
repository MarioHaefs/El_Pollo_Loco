let canvas;
let ctx;
let character = new Image();


function init() {
    canvas = document.getElementById('canvas');
    cts = canvas.getContext('2d');

    character.src = '../assets/img/2_character_pepe/2_walk/W-21.png';

    ctx.drawImage(character, 20, 20, 50, 150);
}