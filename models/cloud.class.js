class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png')

        this.x = 0 + Math.random() * 500; // Zahl zwischen 200 und 700

        this.animate();
    }


    animate() {
        this.moveLeft();
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}