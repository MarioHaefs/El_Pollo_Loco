class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 55;


    IMAGES_ENDBOSS_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ENDBOSS_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ENDBOSS_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_ENDBOSS_DEATH = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 100,
        left: 30,
        bottom: 40,
        right: 40
    };


    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_DEATH);
        this.x = 2600;
        this.animate();
    }


    /**
     * play animations of endboss
     */
    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.animateEndboss();
        }, 200);
    }


    /**
     * animate all interactions of endboss
     */
    animateEndboss() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_ENDBOSS_DEATH);
            this.speed = 0;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_ENDBOSS_HURT);
            this.speed = 0;
        } else {
            this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
            this.speed = 0;
        }
    }

}