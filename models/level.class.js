class Level {
    enemies;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 2250;


    constructor(enemies, coins, clouds, backgroundObjects) {
        this.enemies = enemies; 
        this.coins = coins; 
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}