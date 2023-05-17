class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectableBottle = 0;
    collectableCoin = 0;


    /**
     * checks if objects collides with each other
     * @param {Movable Object} mo 
     * @returns - collision detection
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    /**
     * if Player collides or get hit --> his health reduces && saves time for isHurt()
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * if Player collides with Bottle he fill the bar
     */
    collectBottle() {
        this.collectableBottle += 10;
        if (this.collectableBottle > 100) {
            this.collectableBottle = 100;
        }
    }


    /**
     * if Player collides with Coin he fill the bar
     */
    collectCoin() {
        this.collectableCoin += 10;
        if (this.collectableCoin > 100) {
            this.collectableCoin = 100;
        }
    }


    /**
     * if Player get hurt play hurt Animation 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }


    /**
     * checks if Character is dead
     */
    isDead() {
        return this.energy == 0;
    }


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


    /**
     * 
     * @returns position of Pepe 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects should always fall
            return true;
        } else {
            return this.y < 155;
        }
    }


    /**
     * load several img of Pepe and Enemies in a interval loop --> this makes it look like an Animation
     * @param {array of images for smooth animation} images 
     */
    playAnimation(images) {
        let loop = this.currentImage % images.length; // % = Moduli, damit er nicht auf die Zahlen 6,7,8,etc. geht und somit abschmiert, sondern sich wiederholt wie ein Loop.
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
        this.speedY = 28;
    }

}