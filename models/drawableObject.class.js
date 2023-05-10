class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 310;
    height = 150;
    width = 100;


    /**
    * helping function for addToMap() in world class
    * @param {Canvas.getContext('2d')} ctx 
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * load static Image into the World
     * @param {path to the image} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
    * preload Array of Images into the World --> more images for animation
    * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * helping function for addToMap() in world class. Function: draw frame around Character and Chicken
     * @param {Canvas.getContext('2d')} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}