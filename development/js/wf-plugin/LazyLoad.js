class LazyLoad {
    build() {
        if (document.querySelectorAll('[data-lazy-load="true"]').length < 1) {
            return;
        }

        this.addListener();
        this.buildLoop();
    }

    addListener() {
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(() => {
                this.buildLoop();
            });
        });
    }

    buildLoop() {
        const el = document.querySelectorAll('[data-lazy-load="true"]');

        Array.prototype.forEach.call(el, (item) => {
            this.verifyPosition(item);
        });
    }

    verifyPosition(target) {
        const windowScroll = window.scrollY;
        const elemntPosition = window.helper.offset(target).top;
        const margin = window.outerHeight;

        if (windowScroll >= elemntPosition - margin) {
            this.buildImage(target);
        }
    }

    buildImage(target) {
        target.setAttribute('src', target.getAttribute('data-src'));
        target.removeAttribute('data-lazy-load');
    }
}

window.lazyLoad = new LazyLoad();