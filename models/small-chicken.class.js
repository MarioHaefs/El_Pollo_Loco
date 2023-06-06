class SmallChicken extends MovableObject {
    y = 372;
    height = 50;
    width = 80;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_SMALL_CHICKEN_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 550 + Math.random() * 1800; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 1;
        this.applyGravityChicken();
        this.animate();
    }


    /**
     * animate movement of the chicken && let chicken move to left side of the map
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy <= 0) {
                this.loadImage(this.IMAGE_SMALL_CHICKEN_DEAD);
                this.speed = 0;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200)

        let minSeconds = 2;
        let maxSeconds = 6;

        let randomSeconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;

        setInterval(() => {
            this.jump();
        }, randomSeconds * 1000);

    }

}