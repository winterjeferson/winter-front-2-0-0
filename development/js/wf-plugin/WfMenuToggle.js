class WfMenuToggle {
    build() {
        this.updateVariable();
        this.buildBt();
        this.watchResize();
    }

    updateVariable() {
        this.$bt = document.querySelectorAll('.bt-toggle');
    }

    buildBt() {
        Array.prototype.forEach.call(this.$bt, function (el, i) {
            el.onclick = function () {
                let $ul1 = el.parentNode.querySelector('nav > ul');
                let $ulAll = el.parentNode.querySelector('nav ul');
                let classDisplay = 'mobile-show';

                if ($ul1.classList.contains(classDisplay)) {
                    $ul1.classList.remove(classDisplay);
                    $ulAll.classList.remove(classDisplay);
                } else {
                    $ul1.classList.add(classDisplay);
                }
            };
        });
    }

    watchResize() {
        let self = this;

        window.onresize = function () {
            self.build();
        };
    }

    reset() {
        this.build();
    }
}