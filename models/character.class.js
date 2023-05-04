class Character extends MovableObject {

    height = 280;
    width = 165;
    y = 155;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ]
    currentImage = 0; //Ist die Stelle im Array, welches Bild geladen wird. Start bei 0 und geht bis 5, weil 6 Bilder im Array sind!



    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }


    animate() {
        setInterval(() => {
            let loop = this.currentImage % this.IMAGES_WALKING.length; // % = Moduli, damit er nicht auf die Zahlen 6,7,8,etc. geht und somit abschmiert, sondern sich wiederholt wie ein Loop.
            let path = this.IMAGES_WALKING[loop];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }


    jump() {

    }
}