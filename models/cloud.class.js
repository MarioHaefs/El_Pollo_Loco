class Cloud extends MovableObject {

    IMAGES_CLOUDS = [
        'assets/img/5_background/layers/4_clouds/1.png',
        'assets/img/5_background/layers/4_clouds/2.png'
    ];
    y = 20;
    width = 500;
    height = 250;

    constructor(x) {
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES_CLOUDS.length);
        let randomImage = this.IMAGES_CLOUDS[randomIndex];
        this.loadImage(randomImage);

        this.x = x;

        this.animate();
    }


    /**
     * let clouds move to the left side of the map
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 50);
    }

}