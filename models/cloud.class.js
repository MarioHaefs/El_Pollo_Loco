class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png')

        this.x = 0 + Math.random() * 500;

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