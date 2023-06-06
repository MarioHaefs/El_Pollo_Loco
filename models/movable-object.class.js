class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectableBottle = 0;
    collectableCoin = 0;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };


    /**
     * checks if objects collides with each other
     * @param {Movable Object} mo 
     * @returns - collision detection
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * if player collides or get hit --> his health reduces && saves time for isHurt()
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
     * if player collides with bottle he fill bottlebar
     */
    collectBottle() {
        this.collectableBottle += 10;
        if (this.collectableBottle > 100) {
            this.collectableBottle = 100;
        }
    }


    /**
     * if player collides with coin he fill coinbar
     */
    collectCoin() {
        this.collectableCoin += 10;
        if (this.collectableCoin > 100) {
            this.collectableCoin = 100;
        }
    }


    /**
     * if player gets hurt last hit time 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }


    /**
     * checks if character is dead
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * if character is in the air apply gravity and let him fall
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
     * checks if a object or player is above ground
     * @returns position of Pepe 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects should always fall
            return this.y < 350;
        } else {
            return this.y < 155;
        }
    }


    /**
     * load several img of Pepe and enemies in a interval loop --> animated
     * @param {array of images for smooth animation} images 
     */
    playAnimation(images) {
        let loop = this.currentImage % images.length;
        let path = images[loop];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * move movable object left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * move movable object right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * let character jump
     */
    jump() {
        this.speedY = 28;
    }


    /**
     * lowJump() used by player if he kills enemies && small Chicken
     */
    lowJump() {
        this.speedY = 15;
    }


    /**
     * chicken fall on his right position
     */
    isAboveGroundChicken() {
        if (this instanceof SmallChicken) {
            return this.y < 360;
        } else if (this instanceof Chicken) {
            return this.y < 330;
        }
    }


    /**
     * if chicken are in the air apply gravity and let them fall
     */
    applyGravityChicken() {
        setInterval(() => {
            if (this.isAboveGroundChicken() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

}