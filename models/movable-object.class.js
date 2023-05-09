class MovableObject {
    x = 120;
    y = 310;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0; //Ist die Stelle im Array, welches Bild bei der animate() Funktion geladen wird. Start bei 0 und geht bis 5, weil 6 Bilder im Array sind!
    speed = 0.15;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    playAnimation(images) {
        let loop = this.currentImage % this.IMAGES_WALKING.length; // % = Moduli, damit er nicht auf die Zahlen 6,7,8,etc. geht und somit abschmiert, sondern sich wiederholt wie ein Loop.
        let path = images[loop];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}