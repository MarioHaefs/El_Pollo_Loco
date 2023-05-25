class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endBossBar = new EndbossBar();
    throwableObjects = [];
    splash_sound = new Audio('audio/bottle.mp3');
    chicken_sound = new Audio('audio/chicken.mp3');
    crushed_sound = new Audio('audio/smallChicken.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    collectBottle_sound = new Audio('audio/collectBottle.mp3');



    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * set the var world in character.class.js to this world
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * run the Game with his Main Functions
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.deleteThrowObject();
            this.chickenAttack();
            this.activateEndboss();
        }, 50);
    }


    /**
    *  checks all collision Situations in the Game
    */
    checkCollisions() {
        if (!this.character.isHurt()) {
            this.level.enemies.forEach((enemy) => {
                this.checkEnemyCollision(enemy);
            });
        };
        this.checkBottleCollision();
        this.checkCoinCollision();
        this.checkThrowObjects();
        this.checkThrowableObjectCollision();
    }


    /**
     * this function checks the collision with throwable objects & play the bottle sound
     */
    checkThrowableObjectCollision() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                this.bottleHitsEnemy(enemy, bottle);
                this.bottleHitsGround(bottle);
            });
        });
    }

    /**
     * check if throwable Object hits enemies
     * @param {*} enemy  enemy 
     * @param {*} bottle  ThrowableObject 
     */
    bottleHitsEnemy(enemy, bottle) {
        if (enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
            enemy.energy -= 100;
            bottle.energy -= 100;
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);
            this.splash_sound.play();
        }
        if (enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && enemy instanceof Endboss) {
            this.bottleHitsEndboss(enemy, bottle);
            enemy.hit();
            bottle.energy -= 100;
            enemy.isHurt();
            this.splash_sound.play();
        }
    };




    /**
    * check if throwable Object hits the ground
    * @param {*} bottle ThrowableObject
    */
    bottleHitsGround(bottle) {
        if (!bottle.isAboveGround()) {
            bottle.energy -= 100;
            bottle.speedX = 0;
            this.splash_sound.play();
        }
    }


    /**
     * check if throwable Object hits Endboss
     */
    bottleHitsEndboss(enemy, bottle) {
        this.endBossBar.percentage -= 20;
        this.endBossBar.setPercentageEndbossBar(this.endBossBar.percentage);
        bottle.speedY = enemy;
        this.chicken_sound.volume = 0.3;
        this.chicken_sound.play();
    }


    /**
     * checks the collision with normal enemies
     * @param {*} enemy
     */
    checkEnemyCollision(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) && enemy.energy > 0) {
            this.playerInvincible();
        }
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken) && enemy.energy > 0) {
            enemy.energy -= 100;
            this.crushed_sound.play();
            this.character.lowJump();
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);
        }
    }


    /**
     * let dead Chicken Bodys disappear
     */
    deadEnemyDisappear() {
        let deadEnemies = [];
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (enemy.energy <= 0 && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                deadEnemies.push(i);
            }
        }

        for (let i = deadEnemies.length - 1; i >= 0; i--) {
            let j = deadEnemies[i];
            this.level.enemies.splice(j, 1);
        }
    }


    /**
     * deletes the throwable bottles if they splashed
     */
    deleteThrowObject() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            if (this.throwableObjects[i].energy == 0 && !this.throwableObjects[i].deleted || !this.throwableObjects[i].isAboveGround() && !this.throwableObjects[i].deleted) {
                this.throwableObjects[i].deleted = true;
                setTimeout(() => {
                    if (this.throwableObjects[i].deleted) {
                        this.throwableObjects.splice(i, 1)
                    }
                }, 500);
            }
        }
    }




    /**
     * check Player Collision with enemies && after hit Player is for 1 s invincible && update healthbar
     */
    playerInvincible() {
        if (!this.invincible) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentageHealthBar(this.character.energy);
                    this.hurt_sound.play();

                    this.invincible = true; // Player can't be hit for 1 s
                    setTimeout(() => {
                        this.invincible = false; // Player can be hit again after 1 s
                    }, 1000);
                }
            });
        }
    }



    /**
     * check Player collision with bottle && pick it up
     */
    checkBottleCollision() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.character.collectBottle();
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.collectBottle_sound.volume = 0.2;
                this.collectBottle_sound.play();
            }
        }
    }


    /**
     * check Player collision with coin && pick it up
     */
    checkCoinCollision() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.character.collectCoin();
                this.coinBar.setPercentageCoinBar(this.character.collectableCoin);
                this.coin_sound.volume = 0.2;
                this.coin_sound.play();
            }
        }
    }


    /**
     * bottle always throwed from player position && checks if u collected bottles before throwing
     */
    checkThrowObjects() {
        if (this.keyboard.UP && this.character.collectableBottle > 0 && !this.character.otherDirection) {
            if (!this.throttled) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.collectableBottle -= 10;
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.throttled = true;

                setTimeout(() => {
                    this.throttled = false; // allows Player to throw 1 Bottle every 500ms
                }, 500);
            }
        }
    }


    /**
     * triggert the chicken rush attack
     */
    activateEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 500 && enemy.energy > 0 && enemy instanceof Endboss) {
                enemy.speed = 3;
            }
        })
    }


    /**
     * this function triggert the chicken rush attack
     */
    chickenAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 350 && enemy.energy > 0 && enemy instanceof Chicken) {
                enemy.rushAttack();
            }
        })
    }


    /**
     * draw all Objects on the Canvas --> build game world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0); // Status Bar's stays left top corner in the Screen
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 500 && enemy.energy > 0 && enemy instanceof Endboss) {
                this.addToMap(this.endBossBar);
            }
        });
        this.ctx.translate(this.camera_x, 0); // Status Bar's stays left top corner in the Screen

        this.ctx.translate(-this.camera_x, 0);
        // executes Draw() again and again!
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * add all Movable Objects to Map (except Pepe)
     * @param {movable Object} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * add Character Pepe to Map && mirrors the Image if he walks to left && draw border for collision
     * @param {movable Object} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.mirrorImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.mirrorImageBack(mo);
        };
    }


    /**
     * mirrors Player Image if moving left
     * @param {Movable Object} mo 
     */
    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * mirrors Player Image back if moving right again
     * @param {Movable Object} mo 
     */
    mirrorImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}