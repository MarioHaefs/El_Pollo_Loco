class CoinBar extends DrawableObject {
    IMAGES_COINBAR = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.setPercentageCoinBar(0);
        this.x = 5;
        this.y = 20;
        this.height = 50;
        this.width = 200;
    }


    /**
     * set percentage of coinbar
     * @param {% of Coinbar} percentage 
     */
    setPercentageCoinBar(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINBAR[this.resolveImageIndexCollectable()];
        this.img = this.imageCache[path];
    }

}