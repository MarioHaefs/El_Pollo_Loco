class MovableObject {
    x = 120;
    y = 310;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;


    /**
     * if Character is in the air apply Gravity and let him fall
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 155;
    }


    /**
     * load static Image into the World
     * @param {path to the image} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * load Array of Images into the World --> more images for animation
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * load several img of Pepe and Enemies in a interval loop --> this makes it look like an Animation
     * @param {array of images for smooth animation} images 
     */
    playAnimation(images) {
        let loop = this.currentImage % this.IMAGES_WALKING.length; // % = Moduli, damit er nicht auf die Zahlen 6,7,8,etc. geht und somit abschmiert, sondern sich wiederholt wie ein Loop.
        let path = images[loop];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * move Movable Object left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * move Movable Object right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * let Character jump
     */
    jump() {
        this.speedY = 30;
    }

}