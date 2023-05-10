class StatusBar extends DrawableObject {
    IMAGES_HEALTHBAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBAR);
        this.setPercentageHealthBar(100);
        this.x = 5;
        this.y = -15;
        this.height = 50;
        this.width = 200;
    }


    /**
     * 
     * @param {% of Healthbar} percentage
     */
    setPercentageHealthBar(percentage) {
        this.percentageHealth = percentage;
        let path = this.IMAGES_HEALTHBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.position = 5;
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