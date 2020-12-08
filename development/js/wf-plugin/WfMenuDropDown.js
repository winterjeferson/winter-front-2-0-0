class WfMenuDropDown {
    update() {
        this.isClickBuild = false;
        this.classMenu = 'drop-down';
        this.classMenuText = `${this.classMenu}-text`;
        this.cssDropDownContent = `${this.classMenu}__content`;
        this.cssOpend = `${this.cssDropDownContent}--opened`;
        this.cssMobileShow = 'mobile-show';
        this.elMenu = document.querySelectorAll(`.${this.classMenu}, .${this.classMenuText}`);
    }

    build() {
        this.update();

        if (this.elMenu.length < 1) {
            return;
        }

        if (!this.isClickBuild) {
            this.isClickBuild = true;
            this.buildClick();
        }

        document.addEventListener('click', this.close, true);
    }

    close() {
        Array.prototype.forEach.call(objWfMenuDropDown.elMenu, (item) => {
            const elContent = item.querySelector(`.${objWfMenuDropDown.cssDropDownContent}`);

            if (elContent === null) {
                return;
            }

            if (elContent.classList.contains(objWfMenuDropDown.cssOpend)) {
                elContent.classList.remove(objWfMenuDropDown.cssOpend);
            }
        });
    }

    buildClick() {
        const self = this;

        Array.prototype.forEach.call(this.elMenu, (item) => {
            let elButton = item.querySelectorAll('.button:first-child, .link:first-child')[0];

            elButton.addEventListener('click', function () {
                self.buildClickAction(elButton);
            });
        });
    }

    buildClickAction(item) {
        const elContent = item.parentNode.querySelector(`.${this.cssDropDownContent}`);

        if (elContent === null) {
            return;
        }

        elContent.classList.add(this.cssOpend);
    }

    listener(event) {
        const el = document.querySelectorAll(`.${window.objWfMenuDropDown.cssMobileShow}`);

        if (event.toElement.classList.contains('button') || event.toElement.classList.contains('link')) {
            return;
        }

        Array.prototype.forEach.call(el, (item) => {
            item.classList.remove(window.objWfMenuDropDown.cssMobileShow);
        });
    }

    reset() {
        document.removeEventListener('click', event, true);
        document.removeEventListener('click', this.listener, true);
        window.objWfMenuDropDown.build();
    }
}