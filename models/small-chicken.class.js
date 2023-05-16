class SmallChicken extends MovableObject { 
    y = 372;
    height = 50;
    width = 80;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png', 
    ];
    

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 2000; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5;

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
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


}