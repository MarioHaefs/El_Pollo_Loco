class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    /**
     * set the var world in character.class.js to this world
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * check if objects in world collide
     */
    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                }
            });
        }, 200);
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

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen!
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
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.mirrorImageBack(mo);
        };
    }


    /**
     * mirrors Image if moving left
     * @param {Movable Object} mo 
     */
    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * mirrors Image back if moving right again
     * @param {Movable Object} mo 
     */
    mirrorImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}