class Chicken extends MovableObject {
    
    y = 320;

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    }


}