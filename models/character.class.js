class Character extends MovableObject {
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    height = 280;
    width = 125;
    y = 155;
    speed = 6;
    lastMoveTime;
    offset = {
        top: 150,
        left: 30,
        bottom: 20,
        right: 40
    };
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');



    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravityPlayer();
        this.animate();
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * animate all of players interactions in the game && play interaction sounds 
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);

        setInterval(() => this.animateCharacter(), 100);
    }


    /**
     * player movement on control key press
     */
    moveCharacter() {
        this.walking_sound.pause();

        if (this.canMoveRight()) {
            this.playerMoveRight();
        }

        if (this.canMoveLeft()) {
            this.playerMoveLeft();
        }

        if (this.canJump()) {
            this.playerJump();
        }

        this.world.camera_x = -this.x + 100;
    }


    /**
     * can player move right?
     * @returns conditions so that the player can move right
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }


    /**
     * player moves right && play walking sound
     */
    playerMoveRight() {
        this.moveRight();
        this.setLastMoveTime()
        this.otherDirection = false;
        if (this.world.audio) {
            this.walking_sound.play();
        }
    }


    /**
     * can player move left?
     * @returns conditions so that the player can move left
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }


    /**
     * player moves left && play walking sound
     */
    playerMoveLeft() {
        this.moveLeft();
        this.setLastMoveTime()
        this.otherDirection = true;
        if (this.world.audio) {
            this.walking_sound.play();
        }
    }


    /**
     * can player jump?
     * @returns conditions so that the player can jump
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }


    /**
     * player jump && play jumping sound
     */
    playerJump() {
        this.jump();
        this.setLastMoveTime()
        if (this.world.audio) {
            this.jump_sound.volume = 0.3;
            this.jump_sound.play();
        }
    }


    /**
     * animate all interactions of player
     */
    animateCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.checkIdleTime()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * this function checks if the last move time > 5s
     * @returns true or false
     */
    checkIdleTime() {
        let idleTime = new Date().getTime() - this.lastMoveTime;
        idleTime = idleTime / 1000;
        return idleTime > 5;
    }


    /**
     * this function set the last move time
     */
    setLastMoveTime() {
        this.lastMoveTime = new Date().getTime();
    }
}
