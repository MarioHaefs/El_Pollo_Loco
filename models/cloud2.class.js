class Cloud2 extends MovableObject {
    y = 0;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/2.png')

        this.x = 1000 + Math.random() * 1250;

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