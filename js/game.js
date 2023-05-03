let canvas;
let ctx;
let world = new World();


function init() {
    canvas = document.getElementById('canvas');
    cts = canvas.getContext('2d');

    console.log('My Character is', world.character);
}