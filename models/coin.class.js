class Coin extends MovableObject {

    IMAGES_COIN = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];



    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COIN);

        this.x = 250 + Math.random() * 2000;
        this.y = Math.floor(Math.random() * 201) + 100;


        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }


}