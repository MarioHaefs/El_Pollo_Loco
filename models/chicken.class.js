class Chicken extends MovableObject {
    y = 330;
    height = 100;
    width = 100;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_CHICKEN_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravityChicken();
        this.x = 550 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 1;

        this.animate();
    }


    /**
     * animate movement & dead of chickens 
     */
    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy <= 0) {
                this.loadImage(this.IMAGE_CHICKEN_DEAD);
                this.speed = 0;
            } else {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 200)
    }


    /**
     * rush attack of normal chickens
     */
    rushAttack() {
        this.speed = 3;
        if (!this.isAboveGroundChicken()) {
            this.lowJump();
        }
    }

}