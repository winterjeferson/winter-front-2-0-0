class WfModal {
    constructor() {
        this.isModalOpen = false;

        this.cssHide = 'hide';
        this.cssClose = 'modal--close';
    }

    update() {
        this.targetBuildGalleryChange = '';

        this.elBody = document.querySelector('body');
        this.elModal = document.querySelector('.modal');
        this.elModalFooter = this.elModal.querySelector('footer');
        this.elModalFooterConfirm = this.elModalFooter.querySelector('[data-id="confirm"]');
        this.elModalFooterCancel = this.elModalFooter.querySelector('[data-id="cancel"]');
        this.elModalClose = document.querySelector('#modalClose');
        this.elModalContent = document.querySelector('#modalContent');
        this.elModalBox = this.elModal.querySelector('.modal__box');
        this.elModalNavigationArrow = this.elModal.querySelector('.navigation-change');
        this.elModalNavigationArrowLeft = this.elModalNavigationArrow.querySelector('[data-id="previous"]');
        this.elModalNavigationArrowRight = this.elModalNavigationArrow.querySelector('[data-id="next"]');
        this.elGallery = document.querySelectorAll('.gallery');
    }

    build() {
        this.buildHtml();
        this.update();
        this.buildMenu();
        this.buildMenuGallery();
        this.buildKeyboard();
        this.buildTranslation();
    }

    buildHtml() {
        let string = `
            <div class="modal ${this.cssClose}">
                <div class="modal__box">
                    <header class="modal__header right">
                        <button id="modalClose" type="button" aria-label="${objWfTranslation.translation.close}" class="button button--small button--small--proportional button--grey button--transparent button--close">
                            <svg class="icon icon--regular rotate-45">
                                <use xlink:href="./assets/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div id="modalContent" class="modal__content"></div>
                    </div>
                    <div class="navigation-change button-wrapper row center ${this.cssHide}">
                        <button type="button" class="button button--small" data-id="previous" aria-label="${objWfTranslation.translation.previous}" >
                            <svg class="icon icon-eb">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                        <button type="button" class="button button--small" data-id="next" aria-label="${objWfTranslation.translation.next}" >
                            <svg class="icon icon-eb rotate-180">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                    </div>
                    <footer class="button-wrapper modal__footer center ${this.cssHide}">
                        <button type="button" class="button button--regular button--green" data-id="confirm"></button>
                        <button type="button" class="button button--regular button--grey" data-id="cancel"></button>
                    </footer>
                </div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        this.elModalFooterConfirm.innerHTML = objWfTranslation.translation.confirm;
        this.elModalFooterCancel.innerHTML = objWfTranslation.translation.cancel;
    }

    buildKeyboard() {
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 27) {
                if (self.isModalOpen) {
                    self.closeModal();
                }
            }

            if (event.keyCode === 37) {
                if (!self.isModalOpen) {
                    return;
                }
                if (self.elModalNavigationArrowLeft.classList.contains(self.cssHide)) {
                    return;
                } else {
                    self.elModalNavigationArrowLeft.click();
                }
            }

            if (event.keyCode === 39) {
                if (!self.isModalOpen) {
                    return;
                }
                if (self.elModalNavigationArrowRight.classList.contains(self.cssHide)) {
                    return;
                } else {
                    self.elModalNavigationArrowRight.click();
                }
            }
        });
    }

    buildMenuGallery() {
        let self = this;

        if (!this.elGallery) {
            return;
        }

        Array.prototype.forEach.call(this.elGallery, function (item) {
            let button = item.querySelectorAll('a');

            Array.prototype.forEach.call(button, function (itemBt) {
                itemBt.addEventListener('click', function (event) {
                    event.preventDefault();
                    self.buildModal('gallery', false, 'full');
                    self.buildGalleryImage(itemBt.getAttribute('href'), itemBt.querySelector('img').getAttribute('data-description'));
                    self.buildGalleryNavigation(itemBt);
                });
            });
        });

        this.elModalNavigationArrowLeft.addEventListener('click', function () {
            self.targetBuildGalleryChange.parentNode.previousElementSibling.querySelector('a').click();
        });

        this.elModalNavigationArrowRight.addEventListener('click', function () {
            self.targetBuildGalleryChange.parentNode.nextElementSibling.querySelector('a').click();
        });
    }

    buildMenu() {
        let self = this;

        this.elModalClose.addEventListener('click', function () {
            self.closeModal();
        });

        document.addEventListener('click', function (event) {
            var isButton = event.target.matches('button *, a *');

            if (isButton) {
                return;
            }
        });

        this.elModalFooter.querySelector('[data-id="cancel"]').addEventListener('click', function (event) {
            self.closeModal();
        });
    }

    buildGalleryNavigation(target) {
        let array = [];
        let currentGallery = target.parentNode.parentNode;
        let siblingLength = currentGallery.querySelectorAll('a').length - 1;

        Array.prototype.forEach.call(currentGallery.querySelectorAll('a'), function (item) {
            array.push(item);
        });

        let currentPosition = array.indexOf(target);

        if (siblingLength > 0) {
            this.elModalNavigationArrow.classList.remove(this.cssHide);
            this.targetBuildGalleryChange = target;

            if (currentPosition <= 0) {
                this.elModalNavigationArrowLeft.classList.add(this.cssHide);
            } else {
                this.elModalNavigationArrowLeft.classList.remove(this.cssHide);
            }

            if (currentPosition >= siblingLength) {
                this.elModalNavigationArrowRight.classList.add(this.cssHide);
            } else {
                this.elModalNavigationArrowRight.classList.remove(this.cssHide);
            }

        } else {
            this.elModalNavigationArrow.classList.add(this.cssHide);
        }
    }

    buildModal(obj) {
        this.elModalFooter.classList.add(this.cssHide);
        typeof obj.action === 'undefined' ? this.openModal() : this.closeModal();
        typeof obj.click !== 'undefined' ? this.buildContentConfirmationAction(obj.click) : '';
        this.buildModalSize(obj.size);
        this.buildModalKind(obj.kind, obj.content);
    }

    buildModalKind(kind, content) {

        if (kind === 'ajax') {
            this.buildContentAjax(content);
        }

        if (kind === 'confirmation') {
            this.buildContentConfirmation(content);
        }

        switch (kind) {
            case 'gallery':
                this.elModalNavigationArrow.classList.remove('arrow-inactive');
                this.elModalNavigationArrow.classList.add('arrow-active');
                break;
            default:
                this.elModalNavigationArrow.classList.remove('arrow-active');
                this.elModalNavigationArrow.classList.add('arrow-inactive');
                break;
        }
    }

    openModal() {
        this.isModalOpen = true;

        this.elBody.classList.remove('overflow-y');
        this.elBody.classList.add('overflow-hidden');
        this.elBody.style.overflowY = 'hidden';
        this.elModal.classList.remove(this.cssClose);
        this.elModalBox.classList.add('modal-animate');
    }

    closeModal() {
        this.isModalOpen = false;

        this.elBody.classList.add('overflow-y');
        this.elBody.classList.remove('overflow-hidden');
        this.elBody.style.overflowY = 'auto';
        this.elBody.style.position = 'relative';
        this.elModal.classList.add(this.cssClose);
        this.elModalBox.classList.remove('modal-animate');

        this.resetOtherClass();
    }

    buildModalSize(size = 'regular') {
        const prefix = 'modal--';

        this.elModalBox.classList.remove(`${prefix}extra-small`);
        this.elModalBox.classList.remove(`${prefix}small`);
        this.elModalBox.classList.remove(`${prefix}regular`);
        this.elModalBox.classList.remove(`${prefix}big`);
        this.elModalBox.classList.remove(`${prefix}extra-big`);
        this.elModalBox.classList.remove(`${prefix}full`);
        this.elModalBox.classList.add(`${prefix}${size}`);
    }

    buildContentAjax(target) {
        let self = this;
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.elModalContent.innerHTML = this.responseText;
                self.resetOtherClass();
            }
        };

        ajax.open('GET', target, true);
        ajax.send();
    }

    buildGalleryImage(image, description) {
        const stringImage = `<img src="${image}" class="img-responsive" style="margin:auto;" title="" alt=""/>`;

        this.elModalContent.innerHTML = stringImage;
        this.changeText(description);
    }

    buildContentConfirmation(content) {
        let string = '<div class="padding-re text-center">' + content + '</div>';

        this.elModalFooter.classList.remove(this.cssHide);
        this.elModalContent.innerHTML = string;
    }

    buildContentConfirmationAction(action) {
        this.elModalFooterConfirm.setAttribute('onclick', action);
    }

    changeText(description) {
        if (description === '' || description === null) {
            return;
        }

        const string = `<p class="modal-description">${description}</p>`;

        if (typeof description !== typeof undefined) {
            this.elModalContent.insertAdjacentHTML('beforeend', string);
        }
    }

    resetOtherClass() {
        if (typeof objWfForm !== 'undefined') {
            objWfForm.buildInputFile();
        }

        if (typeof objWfMenuDropDown !== 'undefined') {
            objWfMenuDropDown.reset();
        }

        if (typeof objWfMenuToggle !== 'undefined') {
            objWfMenuToggle.build();
        }

        if (typeof objWfTooltip !== 'undefined') {
            objWfTooltip.reset();
        }

        if (typeof objWfMenuTab !== 'undefined') {
            objWfMenuTab.defineActive();
        }

        if (typeof objWfLazyLoad !== 'undefined') {
            objWfLazyLoad.build();
        }
    }
}