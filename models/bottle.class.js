class Bottle extends MovableObject {
    IMAGES_BOTTLES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLES.length);
        const randomImage = this.IMAGES_BOTTLES[randomIndex];
        this.loadImage(randomImage);
        this.height = 80;
        this.width = 65;

        this.x = 200 + Math.random() * 2000;
        this.y = 350;
    }
}
