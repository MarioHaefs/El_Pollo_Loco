class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;


    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindKeyPressEvents();
            this.bindBtnPressEvents();
        });
    }


    /**
     * bind control images to variables --> controls to play the game on mobile devices
     */
    bindBtnPressEvents() {
        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btn-up').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btn-up').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });

        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });
    }


    /**
     * bind keyboard buttons to variables --> controls to play the game on desktop
     */
    bindKeyPressEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = true;
            }

            if (e.keyCode == 37) {
                this.LEFT = true;
            }

            if (e.keyCode == 38) {
                this.UP = true;
            }

            if (e.keyCode == 40) {
                this.DOWN = true;
            }

            if (e.keyCode == 32) {
                this.SPACE = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = false;
            }

            if (e.keyCode == 37) {
                this.LEFT = false;
            }

            if (e.keyCode == 38) {
                this.UP = false;
            }

            if (e.keyCode == 40) {
                this.DOWN = false;
            }

            if (e.keyCode == 32) {
                this.SPACE = false;
            }
        });
    }

}