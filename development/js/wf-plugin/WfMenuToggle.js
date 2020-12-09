class WfMenuToggle {
    constructor() {
        this.classDisplay = 'hide';
        this.classButton = 'toggle-menu';
        this.isWatch = false;
    }

    build() {
        this.update();
        this.buildClick();

        if (!this.isWatch) {
            this.isWatch = true;
            this.watchResize();
        }
    }

    update() {
        this.elButton = document.querySelectorAll(`.${this.classButton}`);
    }

    buildClick() {
        Array.prototype.forEach.call(this.elButton, (el) => {
            el.onclick = () => {
                let sibling = el.nextElementSibling;

                if (sibling.classList.contains(this.classDisplay)) {
                    sibling.classList.remove(this.classDisplay);
                } else {
                    sibling.classList.add(this.classDisplay);
                }
            };
        });
    }

    watchResize() {
        window.onresize = () => {
            this.build();
        };
    }

    reset() {
        this.build();
    }
}