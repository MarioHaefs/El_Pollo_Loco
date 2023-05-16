class BottleBar extends DrawableObject {
    IMAGES_BOTTLEBAR = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.setPercentageBottleBar(0);
        this.x = 5;
        this.y = 55;
        this.height = 50;
        this.width = 200;
    }


    /**
     * 
     * @param {% of Bottlebar} percentage 
     */
    setPercentageBottleBar(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndexCollectable()];
        this.img = this.imageCache[path];
    }

}