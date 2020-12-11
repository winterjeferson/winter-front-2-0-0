class LazyLoad {
    build() {
        if (document.querySelectorAll('[data-lazy-load="true"]').length < 1) {
            return;
        }

        this.addListener();
        this.buildLoop();
    }

    addListener() {
        let self = this;

        window.addEventListener('scroll', function (e) {
            window.requestAnimationFrame(function () {
                self.buildLoop();
            });
        });
    }

    buildLoop() {
        let self = this;
        let $arr = document.querySelectorAll('[data-lazy-load="true"]');

        Array.prototype.forEach.call($arr, function (item) {
            self.verifyPosition(item);
        });
    }

    verifyPosition(target) {
        let windowScroll = window.scrollY;
        let elemntPosition = window.helper.offset(target).top;
        let margin = window.outerHeight;

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