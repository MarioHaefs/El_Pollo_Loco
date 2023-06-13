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
    throw_sound = new Audio('audio/throw.mp3');
    game_sound = new Audio('audio/game.mp3');
    win_sound = new Audio('audio/win.mp3');
    lost_sound = new Audio('audio/lose.mp3');
    audio = true;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * set the var = world in "character.class.js" to this world
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * run the game && checks all important conditions
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.deleteThrowObject();
            this.chickenAttack();
            this.activateEndboss();
            this.playIngameBackgroundMusic();
            this.checkWinGame();
            this.checkLostGame();
        }, 50);
    }


    /**
     * check if player successed and win game
     */
    checkWinGame() {
        let gameOver = document.getElementById('game-over');
        if (this.playerBeatGame()) {
            gameOver.classList.remove('d-none');
            hideControls();
            setTimeout(() => {
                this.playWinSound();
                this.clearAllIntervals();
            }, 800);
        }
    }


    /**
     * checks if player won the game
     * @returns conditions if player win
     */
    playerBeatGame() {
        return this.character.energy > 0 && this.endBossBar.percentage == 0
    }


    /**
     * play win game sound
     */
    playWinSound() {
        if (this.audio) {
            this.win_sound.play();
        }
        this.game_sound.pause();
    }


    /**
     * check if player failed and lose game
     */
    checkLostGame() {
        let lostGame = document.getElementById('lost-game');
        if (this.gameBeatPlayer() || this.surpassEndboss()) {
            lostGame.classList.remove('d-none');
            hideControls();
            setTimeout(() => {
                this.playLoseSound();
                this.clearAllIntervals();
            }, 600);
        }
    }


    /**
     * checks if player lose the game
     * @returns conditions if player lose
     */
    gameBeatPlayer() {
        return this.character.energy <= 0 && this.character.collectableCoin <= 100 && this.endBossBar.percentage > 0
    }

    /**
     * checks if player lose the game by surpassing Endboss
     */
    surpassEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 0 && enemy instanceof Endboss) {
                this.character.energy = 0;
                this.statusBar.setPercentageHealthBar(this.character.energy);
            }
        })
    }


    /**
     * play lose game sound
     */
    playLoseSound() {
        if (this.audio) {
            this.lost_sound.play();
        }
        this.game_sound.pause();
    }


    /**
     * clear all intervals in the game
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * checks all collision situations in the game
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
     * checks the collision with throwable objects & play the bottle sound
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
     * @param {enemy} enemy
     * @param {ThrowableObject} bottle
     */
    bottleHitsEnemy(enemy, bottle) {
        if (this.bottleHitsNormalEnemy(enemy, bottle)) {
            enemy.energy -= 100;
            bottle.energy -= 100;
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);

        }
        if (this.bottleHitsBossEnemy(enemy, bottle)) {
            this.bottleHitsEndboss(enemy, bottle);
            enemy.hit();
            bottle.energy -= 100;
            enemy.isHurt();
            this.playBottleSplashSound();
        }
    };


    /**
     * checks if bottle hit a normal enemy like chicken or small chicken
     * @param {enemy} enemy
     * @param {ThrowableObject} bottle
     * @returns bottle collision check
     */
    bottleHitsNormalEnemy(enemy, bottle) {
        return enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken)
    }


    /**
     * checks if bottle hit the boss enemy
     * @param {enemy} enemy 
     * @param {ThrowableObject} bottle 
     * @returns bottle collision check
     */
    bottleHitsBossEnemy(enemy, bottle) {
        return enemy.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround() && enemy instanceof Endboss
    }


    /**
     * plays splash sound if bottle hits anything
     */
    playBottleSplashSound() {
        if (this.audio) {
            this.splash_sound.play();
        }
    }


    /**
     * check if throwable object hits the ground
     * @param {ThrowableObject} bottle
     */
    bottleHitsGround(bottle) {
        if (!bottle.isAboveGround()) {
            bottle.energy -= 100;
            bottle.speedX = 0;
            bottle.speedXLeft = 0;
            this.playBottleSplashSound();
        }
    }


    /**
     * check if throwable object hits endboss
     */
    bottleHitsEndboss(enemy, bottle) {
        this.endBossBar.percentage -= 20;
        this.endBossBar.setPercentageEndbossBar(this.endBossBar.percentage);
        bottle.speedY = enemy;
        this.playEndbossHurtSound();
    }


    /**
     * play endboss hurt sound
     */
    playEndbossHurtSound() {
        if (this.audio) {
            this.chicken_sound.volume = 0.3;
            this.chicken_sound.play();
        }
    }


    /**
     * checks the collision with normal enemies
     * @param {enemy} enemy
     */
    checkEnemyCollision(enemy) {
        if (this.playerGetHitByEnemy(enemy)) {
            this.playerGotHitByEnemy();
        }
        if (this.playerKillEnemy(enemy)) {
            enemy.energy -= 100;
            this.enemyDeadSound();
            this.character.lowJump();
            setTimeout(() => {
                this.deadEnemyDisappear(enemy);
            }, 500);
        }
    }


    /**
     * checks if player jump on enemy to kill it
     * @param {enemy} enemy 
     * @returns check if player kill enemy
     */
    playerKillEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken) && enemy.energy > 0
    }


    /**
     * play normal enemy dead sound
     */
    enemyDeadSound() {
        if (this.audio) {
            this.crushed_sound.play();
        }
    }


    /**
     * checks if player get hit by enemy collision
     * @param {enemy} enemy 
     * @returns player collision with enemy check
     */
    playerGetHitByEnemy(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) && enemy.energy > 0
    }


    /**
     * check player collision with enemies && if player got hit he is for 1 s invincible && update healthbar
     */
    playerGotHitByEnemy() {
        if (!this.invincible) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                    this.character.hit();
                    this.statusBar.setPercentageHealthBar(this.character.energy);
                    this.playPlayerGotHurtSound();
                    this.invincible = true; // Player can't be hit for 0.5 s
                    setTimeout(() => {
                        this.invincible = false; // Player can be hit again after 0.5 s
                    }, 500);
                } else if (this.character.isColliding(enemy) && enemy instanceof Endboss) {
                    this.character.energy = 0;
                    this.statusBar.setPercentageHealthBar(this.character.energy);
                }
            });
        }
    }


    /**
     * play player got hurt sound
     */
    playPlayerGotHurtSound() {
        if (this.audio) {
            this.hurt_sound.play();
        }
    }


    /**
     * let dead chicken bodys disappear
     */
    deadEnemyDisappear() {
        let deadEnemies = [];
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (this.enemyIsDead(enemy)) {
                deadEnemies.push(i);
            }
        }

        for (let i = deadEnemies.length - 1; i >= 0; i--) {
            let j = deadEnemies[i];
            this.level.enemies.splice(j, 1);
        }
    }


    /**
     * checks if normal enemy is dead 
     * @returns checks if enemy is dead
     */
    enemyIsDead(enemy) {
        return enemy.energy <= 0 && (enemy instanceof Chicken || enemy instanceof SmallChicken)
    }


    /**
     * deletes throwable bottles if they splashed
     */
    deleteThrowObject() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            if (this.throwableObjectSplashed(i)) {
                this.throwableObjects[i].deleted = true;
                setTimeout(() => {
                    if (this.throwableObjects[i].deleted) {
                        this.throwableObjects.splice(i, 1)
                    }
                }, 200);
            }
        }
    }


    /**
     * checks if throwableObject is splashed
     * @param {throwableObject} i 
     * @returns checks if throwableObject is splashed
     */
    throwableObjectSplashed(i) {
        return this.throwableObjects[i].energy == 0 && !this.throwableObjects[i].deleted || !this.throwableObjects[i].isAboveGround() && !this.throwableObjects[i].deleted
    }


    /**
     * check player collision with bottle && pick it up
     */
    checkBottleCollision() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.character.collectBottle();
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.playPickUpBottleSound();
            }
        }
    }


    /**
     * play pick up bottle sound
     */
    playPickUpBottleSound() {
        if (this.audio) {
            this.collectBottle_sound.volume = 0.2;
            this.collectBottle_sound.play();
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
                this.playPickUpCoinSound();
            }
        }
    }


    /**
     * play pick up coin sound
     */
    playPickUpCoinSound() {
        if (this.audio) {
            this.coin_sound.volume = 0.2;
            this.coin_sound.play();
        }
    }


    /**
     * bottle always throwed from player position && checks if u collected bottles before throwing && update bottlebar
     */
    checkThrowObjects() {
        if (this.playerGotThrowableObjects()) {
            if (!this.throttled) {
                let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.collectableBottle -= 10;
                this.bottleBar.setPercentageBottleBar(this.character.collectableBottle);
                this.playThrowSound();
                this.throttled = true;

                setTimeout(() => {
                    this.throttled = false; // allows Player to throw 1 Bottle every 500ms
                }, 500);
            }
        }
    }

    /**
     * if key up is pressed and got throwable objects 
     * @returns conditions for throwing Objects
     */
    playerGotThrowableObjects() {
        return this.keyboard.UP && this.character.collectableBottle > 0
    }


    /**
     * play throw sound
     */
    playThrowSound() {
        if (this.audio) {
            this.throw_sound.play();
        }
    }


    /**
     * activate endboss actions
     */
    activateEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (this.playerIsNearEndboss(enemy)) {
                enemy.speed = 3;
            }
        })
    }


    /**
     * checks if player is near the endboss
     * @param {enemy} enemy 
     * @returns condition for endboss activation
     */
    playerIsNearEndboss(enemy) {
        return enemy.x - this.character.x < 700 && enemy.energy > 0 && enemy instanceof Endboss && !enemy.isHurt()
    }


    /**
     * triggers the chicken rush attack
     */
    chickenAttack() {
        this.level.enemies.forEach((enemy) => {
            if (this.playerIsNearNormalChicken(enemy)) {
                enemy.rushAttack();
            }
        })
    }


    /**
     * checks if player is near normal chickens
     * @param {enemy} enemy 
     * @returns condition for chicken rush attack
     */
    playerIsNearNormalChicken(enemy) {
        return enemy.x - this.character.x < 350 && enemy.energy > 0 && enemy instanceof Chicken
    }


    /**
     * draw all objects on the canvas --> build game world
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

        this.ctx.translate(-this.camera_x, 0); // status bar's stays left top corner on the screen
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.level.enemies.forEach((enemy) => {
            if (enemy.x - this.character.x < 600 && enemy.energy > 0 && enemy instanceof Endboss) {
                this.addToMap(this.endBossBar);
            }
        });
        this.ctx.translate(this.camera_x, 0); // status bar's stays left top corner on the screen

        this.ctx.translate(-this.camera_x, 0);
        // executes Draw() again and again!
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        /////////////////////////////////////
    }


    /**
     * add all movable objects to map (except Pepe)
     * @param {movable Object} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * add character Pepe and status bars to map && mirrors the image if player walks to left
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
     * mirrors player image if moving left
     * @param {Movable Object} mo 
     */
    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * mirrors player image back if moving right again
     * @param {Movable Object} mo 
     */
    mirrorImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * plays the main ingame theme
     */
    playIngameBackgroundMusic() {
        if (this.audio) {
            this.game_sound.volume = 0.03;
            this.game_sound.play();
        } else if (!this.audio) {
            this.game_sound.pause();
        }
    }

}