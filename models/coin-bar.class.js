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
     * 
     * @param {% of Coinbar} percentage 
     */
    setPercentageCoinBar(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns return value which image shows on which % of status bar
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}