const translationEN = {
    'cancel': 'Cancel',
    'close': 'Close',
    'confirm': 'Confirm',
    'input_upload': 'Select File...',
    'next': 'Next',
    'previous': 'Previous',
};
const translationES = {
    'cancel': 'Cancelar',
    'close': 'Cerrar',
    'confirm': 'Confirmar',
    'input_upload': 'Seleccione Archivo...',
    'next': 'Siguiente',
    'previous': 'Anterior',
};
const translationPT = {
    'cancel': 'Cancelar',
    'close': 'Fechar',
    'confirm': 'Confirmar',
    'input_upload': 'Selecione o Arquivo...',
    'next': 'Próximo',
    'previous': 'Anterior',
};
function getUrlParameter(target) {
    let url = top.location.search.substring(1);
    let parameter = url.split('&');

    for (let i = 0; i < parameter.length; i++) {
        let parameterName = parameter[i].split('=');

        if (parameterName[0] === target) {
            return parameterName[1];
        }
    }
}

function getUrlWord(target) {
    return new RegExp('\\b' + target + '\\b', 'i').test(window.location.href);
}

function offset(element) {
    let rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const obj = {
        'top': rect.top + scrollTop,
        'left': rect.left + scrollLeft,
    };

    return obj;
}

function verifyUrlRoute(target) {
    let arrFolder = window.location.pathname.split('/');

    if (arrFolder.indexOf(target) > -1) {
        return true;
    } else {
        return false;
    }
}

function wrapItem(target, cssClass) {
    let wrapper = document.createElement('div');

    wrapper.className = cssClass;
    target.parentNode.insertBefore(wrapper, target);
    wrapper.appendChild(target);
}
class WfCarousel {
    constructor() {
        this.attCurrentSlide = 'data-current-slide';
        this.attPrevious = '[data-id="previous"]';
        this.attNext = '[data-id="next"]';
        this.cssCarouselList = 'carousel__list';
        this.cssCarouselListClass = `.${this.cssCarouselList}`;
        this.cssCarouselController = 'carousel__controller';
        this.cssCarouselControllerClass = `.${this.cssCarouselController}`;
        this.cssButton = 'carousel__controller-button';
        this.cssButtonClass = `.${this.cssButton}`;
        this.cssButtonActive = `${this.cssButton}--active`;
        this.cssDisplay = 'hide';
        this.elCarousel = document.querySelectorAll('.carousel');

        this.counterCurrent = 0;
        this.transition = 1;
        this.isAutoplay = false;
    }

    build() {
        if (this.elCarousel.length < 1) {
            return;
        }

        if (this.isAutoplay) {
            this.interval = setInterval(this.verifyInterval, 1000);
        }

        this.buildLayout();
        this.buildNavigation();
        this.watchResize();
    }

    buildLayout() {
        const self = this;

        Array.prototype.forEach.call(this.elCarousel, function (item) {
            let length = item.querySelectorAll(`${self.cssCarouselListClass} li`).length;

            self.resizeLayout(item);
            self.buildLayoutController(item, length);
            self.defineActive(item.querySelector('[data-id="' + item.getAttribute(self.attCurrentSlide) + '"]'));

            if (length === 1) {
                item.querySelector(self.attPrevious).classList.add(self.cssDisplay);
                item.querySelector(self.attNext).classList.add(self.cssDisplay);
                item.querySelector(self.cssCarouselControllerClass).classList.add(self.cssDisplay);
            }
        });
    }

    watchResize() {
        let self = this;

        window.onresize = function () {
            Array.prototype.forEach.call(self.elCarousel, function (item) {
                let $this = item.parentNode.parentNode.parentNode.parentNode;
                let elCarouselList = $this.querySelector(self.cssCarouselListClass);
                let newSlide = 0;

                self.defineActive($this.querySelector('[data-id="' + newSlide + '"]'));
                self.animate(newSlide, elCarouselList, 'arrow');
            });
        };
    }

    buildLayoutController(target, length) {
        let concat = '';

        for (let i = 0; i < length; i++) {
            concat += `
                <button type="button" class="button button--small button--small--proportional ${this.cssButton}" data-id="${i}" aria-hidden="true"></button>
            `;
        }

        target.querySelector(this.cssCarouselControllerClass).innerHTML = concat;
    }

    buildNavigation() {
        let self = this;

        Array.prototype.forEach.call(this.elCarousel, function (item) {
            self.buildNavigationControllerBt(item);
            self.buildNavigationArrowLeft(item);
            self.buildNavigationArrowRight(item);
        });
    }

    buildNavigationControllerBt(target) {
        const self = this;
        const button = target.querySelectorAll(this.cssButtonClass);

        Array.prototype.forEach.call(button, function (item) {
            item.onclick = function () {
                // item.parentNode.parentNode.querySelector(`[${self.attCurrentSlide}="${item.getAttribute('data-id')}"]`);
                self.defineActive(item);
                self.animate(item.getAttribute('data-id'), item, 'navigation');
            };
        });
    }

    buildNavigationArrowLeft(target) {
        const self = this;
        const button = target.querySelector(this.attPrevious);

        button.onclick = function () {
            let elCarousel = button.parentNode.parentNode;
            let elCarouselList = elCarousel.querySelector(self.cssCarouselListClass);
            let elCarouselListLength = Number(elCarouselList.querySelectorAll('li').length);
            let currentSlide = Number(elCarousel.getAttribute(self.attCurrentSlide));
            let newSlide = 0;

            if (currentSlide === 0) {
                newSlide = elCarouselListLength - 1;
                elCarousel.setAttribute(self.attCurrentSlide, newSlide);
            } else {
                newSlide = currentSlide - 1;
                elCarousel.setAttribute(self.attCurrentSlide, newSlide);
            }

            self.defineActive(elCarousel.querySelector('[data-id="' + newSlide + '"]'));
            self.animate(newSlide, elCarouselList, 'arrow');
        };
    }

    buildNavigationArrowRight(target) {
        let self = this;
        let button = target.querySelector(this.attNext);

        button.onclick = function () {
            let elCarousel = button.parentNode.parentNode;
            let elCarouselList = elCarousel.querySelector(self.cssCarouselListClass);
            let elCarouselListLength = Number(elCarouselList.querySelectorAll('li').length);
            let currentSlide = Number(elCarousel.getAttribute(self.attCurrentSlide));
            let newSlide = 0;

            if (currentSlide === (elCarouselListLength - 1)) {
                newSlide = 0;
                elCarousel.setAttribute(self.attCurrentSlide, newSlide);
            } else {
                newSlide = currentSlide + 1;
                elCarousel.setAttribute(self.attCurrentSlide, newSlide);
            }

            self.defineActive(elCarousel.querySelector('[data-id="' + newSlide + '"]'));
            self.animate(newSlide, elCarouselList, 'arrow');
        };
    }

    animate(currentSlide, target, from) {
        let elCarouselList = from === 'arrow' ?
            target.parentNode.querySelector(this.cssCarouselListClass) :
            target.parentNode.parentNode.querySelector(this.cssCarouselListClass);
        let elCarousel = elCarouselList.parentNode;
        let carouselStyle = elCarousel.getAttribute('data-style');
        let slideSize = Number(elCarouselList.querySelector('li').offsetWidth);
        let currentPosition = Number(currentSlide * slideSize);

        switch (carouselStyle) {
            case 'fade':
                this.animateFade({
                    elCarouselList,
                    currentPosition,
                    currentSlide,
                });
                break;
            default:
                this.animateSlide({
                    elCarouselList,
                    currentPosition,
                });
                break;
        }
    }

    animateFade(obj) {
        let el = obj.elCarouselList.querySelectorAll('li');
        let transition = '.7s';

        Array.prototype.forEach.call(obj.elCarouselList.querySelectorAll('li'), function (item) {
            item.style.opacity = 0;
            item.style.transition = transition;
        });

        el[obj.currentSlide].style.opacity = 1;
        el[obj.currentSlide].style.left = '-' + obj.currentPosition + 'px';
        el[obj.currentSlide].style.transition = transition;
    }

    animateSlide(obj) {
        obj.elCarouselList.style.transform = `translateX(-${obj.currentPosition}px)`;
    }

    verifyInterval() {
        let self = window.objWfCarousel;

        self.counterCurrent++;

        if (self.counterCurrent >= self.transition) {
            self.counterCurrent = 0;

            Array.prototype.forEach.call(self.elCarousel, function (item) {
                item.querySelector(self.attNext).click();
            });
        }
    }

    defineActive(target) {
        const self = this;
        let listBt = target.parentNode.parentNode.querySelectorAll(this.cssButtonClass);

        Array.prototype.forEach.call(listBt, function (item) {
            item.classList.remove(self.cssButtonActive);
        });

        target.classList.add(this.cssButtonActive);
    }

    resizeLayout(target) {
        let elCarouselList = target.querySelector(this.cssCarouselListClass);
        let elCarouselListItem = elCarouselList.querySelectorAll('li');
        let length = elCarouselListItem.length;

        elCarouselList.style.width = +length * 100 + '%';

        Array.prototype.forEach.call(elCarouselListItem, function (item) {
            item.style.width = +100 / length + '%';
        });
    }
}
class WfForm {
    build() {
        if (document.querySelectorAll('form').length < 1) {
            return;
        }

        this.buildKeyboard();
        this.buildInputFile();
    }

    buildKeyboard() {
        let self = this;

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                self.buildFocus('.radio');
                self.buildFocus('.checkbox');
                self.buildFocus('.input-switch');
            }
        });
    }

    buildFocus(target) {
        let $arr = document.querySelectorAll(target);

        Array.prototype.forEach.call($arr, function (item) {
            let target = item.querySelector('input');

            if (document.activeElement == item) {
                target.click();
            }
        });
    }

    buildInputFile() {
        let self = this;
        return;

        Array.prototype.forEach.call(document.querySelectorAll('input[type="file"]'), function (item) {
            let target = item.parentNode;

            if (item.getAttribute('style')) {
                if (item.getAttribute('style').indexOf('display:') != -1) {
                    return;
                }
            }

            item.style.display = 'none';
            target.insertAdjacentHTML('beforeend', self.buildInputFileHtml());
            target.setAttribute('tabIndex', 0);
            target.style.outline = 0;

            if (document.activeElement == target) {
                target.querySelector('.input-file').classList.add('focus');
            }

            item.addEventListener('focusout', function () {
                target.querySelector('.input-file').classList.remove('focus');
            });

            self.buildInputFileAddAction(item);
        });
    }

    buildInputFileAddAction(item) {
        let $target = item.parentNode;
        let $targetFileClass = $target.querySelector('.input-file-name');
        let $targetFile = $target.querySelector('input[type="file"]');

        $target.addEventListener('click', function () {
            $targetFile.click();
        });

        $targetFile.addEventListener('change', function () {
            $targetFileClass.innerHTML = $targetFile.value;
        });
    }

    buildInputFileHtml() {
        let inputFile = '';
        let textFile = objWfTranslation.translation.input_upload;

        inputFile += '<div class="input-file">';
        inputFile += '    <div class="input-file-name"></div>';
        inputFile += '    <div class="input-file-text"><span class="fa fa-upload" aria-hidden="true"></span>&nbsp; ' + textFile + '</div>';
        inputFile += '</div>';

        return inputFile;
    }

    validateEmpty(arr) {
        let arrEmpty = arr;
        let length = arrEmpty.length;

        for (let i = 0; i < length; i++) {
            if (arrEmpty[i].value === '') {
                arrEmpty[i].focus();
                return false;
            }
        }

        return true;
    }
}
class WfLayout {
    constructor() {
        this.$body = document.querySelector('body');

        this.breakPointExtraSmall = 0;
        this.breakPointSmall = 576;
        this.breakPointMedium = 768;
        this.breakPointBig = 992;
        this.breakPointExtraBig = 1200;
        this.breakPointFullHd = 1920;
    }
}
class WfLazyLoad {
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
        let elemntPosition = offset(target).top;
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
class WfMask {
    constructor() {
        this.$inputMask = document.querySelectorAll('[data-mask]');
    }

    build() {
        if (this.$inputMask.length < 1) {
            return;
        }

        this.addListener();
    }

    addListener() {
        let self = this;

        this.$inputMask.forEach(($input) => {
            $input.addEventListener('input', (e) => {
                let inputValue = e.target.value;
                let inputMask = $input.dataset.mask;
                let capitalized = inputMask.charAt(0).toUpperCase() + inputMask.slice(1);

                e.target.value = self['mask' + capitalized](inputValue);
            });
        });
    }

    maskCep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    }

    maskCpf(value) {
        return value
            .replace(/\D/g, '') //only numbers
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d)/, '$1.$2') // add dot
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // add hyphen
            .replace(/(-\d{2})\d+?$/, '$1'); // max length
    }

    maskCnpj(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    maskDate(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1');
    }

    maskPhone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1');
    }

    maskPis(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{5})(\d)/, '$1.$2')
            .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
            .replace(/(-\d)\d+?$/, '$1');
    }
}
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
class WfMenuTab {
    build() {
        this.defineActive();
    }

    defineActive() {
        let self = this;
        let $arr = document.querySelectorAll('.menu-tab > ul > li > .bt');

        Array.prototype.forEach.call($arr, function (item) {
            item.addEventListener('click', function () {
                self.buildClick(item);
            });
        });
    }

    buildClick(item) {
        let classActive = 'menu-tab-active';
        let $arr = item.parentNode.parentNode.querySelectorAll('li');

        Array.prototype.forEach.call($arr, function (item) {
            item.classList.remove(classActive);
        });

        item.parentNode.classList.add(classActive);
    }
}
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
class WfModal {
    constructor() {
        this.isModalOpen = false;

        this.cssHide = 'hide';
        this.cssClose = 'modal--close';

        this.elBody = document.querySelector('body');
    }

    update() {
        this.targetBuildGalleryChange = '';

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
        const string = `
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
                        <button type="button" class="button button--big" data-id="previous" aria-label="${objWfTranslation.translation.previous}" >
                            <svg class="icon icon--extra-big icon--white">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                        <button type="button" class="button button--big" data-id="next" aria-label="${objWfTranslation.translation.next}" >
                            <svg class="icon icon--extra-big icon--white rotate-180">
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

        this.elBody.insertAdjacentHTML('afterbegin', string);
    }

    buildTranslation() {
        this.elModalFooterConfirm.innerHTML = objWfTranslation.translation.confirm;
        this.elModalFooterCancel.innerHTML = objWfTranslation.translation.cancel;
    }

    buildKeyboard() {
        window.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                if (this.isModalOpen) {
                    this.closeModal();
                }
            }

            if (event.key === 'ArrowLeft') {
                if (!this.isModalOpen) {
                    return;
                }
                if (this.elModalNavigationArrowLeft.classList.contains(this.cssHide)) {
                    return;
                } else {
                    this.elModalNavigationArrowLeft.click();
                }
            }

            if (event.key === 'ArrowRight') {
                if (!this.isModalOpen) {
                    return;
                }
                if (this.elModalNavigationArrowRight.classList.contains(this.cssHide)) {
                    return;
                } else {
                    this.elModalNavigationArrowRight.click();
                }
            }
        });
    }

    buildMenuGallery() {
        if (!this.elGallery) {
            return;
        }

        Array.prototype.forEach.call(this.elGallery, (item) => {
            let button = item.querySelectorAll('a');

            Array.prototype.forEach.call(button, (itemBt) => {
                itemBt.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.buildModal('gallery', false, 'full');
                    this.buildGalleryImage(itemBt.getAttribute('href'), itemBt.querySelector('img').getAttribute('data-description'));
                    this.buildGalleryNavigation(itemBt);
                });
            });
        });

        this.elModalNavigationArrowLeft.addEventListener('click', () => {
            this.targetBuildGalleryChange.previousElementSibling.click();
        });

        this.elModalNavigationArrowRight.addEventListener('click', () => {
            this.targetBuildGalleryChange.nextElementSibling.click();
        });
    }

    buildMenu() {
        this.elModalClose.addEventListener('click', () => {
            this.closeModal();
        });

        document.addEventListener('click', (event) => {
            let isButton = event.target.matches('button *, a *');

            if (isButton) {
                return;
            }
        });

        this.elModalFooter.querySelector('[data-id="cancel"]').addEventListener('click', (event) => {
            this.closeModal();
        });
    }

    buildGalleryNavigation(target) {
        let array = [];
        let currentGallery = target.parentNode.parentNode;
        let siblingLength = currentGallery.querySelectorAll('a').length - 1;

        Array.prototype.forEach.call(currentGallery.querySelectorAll('a'), (item) => {
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
        this.buildModalKind(obj);
    }

    buildModalKind(obj) {
        if (obj.kind === 'ajax') {
            this.buildContentAjax(obj.content);
        }

        if (obj.kind === 'confirmation') {
            this.buildContentConfirmation(obj.content);
        }

        switch (obj.kind) {
            case 'gallery':
                this.elModalNavigationArrow.classList.remove('hide');
                break;
            default:
                this.elModalNavigationArrow.classList.add('hide');
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
        const arr = ['extra-small', 'small', 'regular', 'big', 'extra-big', 'full'];

        Array.prototype.forEach.call(arr, (item) => {
            this.elModalBox.classList.remove(`${prefix}${item}`);
        });

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
        if (typeof window.objWfForm !== 'undefined') {
            window.objWfForm.buildInputFile();
        }

        if (typeof window.objWfMenuDropDown !== 'undefined') {
            window.objWfMenuDropDown.reset();
        }

        if (typeof window.objWfMenuToggle !== 'undefined') {
            window.objWfMenuToggle.build();
        }

        if (typeof window.objWfTooltip !== 'undefined') {
            window.objWfTooltip.reset();
        }

        if (typeof window.objWfMenuTab !== 'undefined') {
            window.objWfMenuTab.defineActive();
        }

        if (typeof window.objWfLazyLoad !== 'undefined') {
            window.objWfLazyLoad.build();
        }
    }
}
class WfNotification {
    constructor() {
        this.elBody = document.querySelector('body');
        this.elNotificationId = 'notification';

        this.notificationId = 0;
    }

    build() {
        this.buildHtml();
        this.update();
    }

    update() {
        this.elNotification = document.querySelector(`#${this.elNotificationId}`);
    }

    buildHtml() {
        const html = `<div id="${this.elNotificationId}" class="${this.elNotificationId} ${this.elNotificationId}--default"></div>`;

        this.elBody.insertAdjacentHTML('beforeend', html);
    }

    buildHtmlItem(style = 'grey', message) {
        return `
            <div class="${this.elNotificationId}__item ${this.elNotificationId}--regular ${this.elNotificationId}--${style}" id="${this.elNotificationId}${this.notificationId}">
                <span class="${this.elNotificationId}__text">${message}</span>
                <button type="button" class="button button--small button--small--proportional button--transparent" onclick="objWfNotification.remove(this.parentNode, 0)" aria-label="${objWfTranslation.translation.close}">
                    <svg class="icon icon--regular rotate-45">
                        <use xlink:href="./assets/img/icon.svg#plus"></use>
                    </svg>
                </button>
            </div>
        `;
    }

    add(obj) {
        if (!obj.text) {
            return;
        }

        this.placeItem(obj);
        this.remove(document.querySelector(`#${this.elNotificationId}${this.notificationId}`), obj.text.length);
        this.notificationId++;
    }

    placeItem(obj) {
        let string = this.buildHtmlItem(obj.color, obj.text);
        let place = '';

        if (typeof obj.place === 'undefined') {
            place = this.elNotification;
        } else {
            let elList = document.querySelector(obj.place).querySelector(`.${this.elNotificationId}`);

            if (elList === null) {
                let newString = `
                <div class="${this.elNotificationId}">
                    ${string}
                </div>
                `;
                string = newString;
                place = document.querySelector(obj.place);
            } else {
                place = elList;
            }
        }

        place.insertAdjacentHTML('beforeend', string);
    }

    remove(item, messageLength) {
        let messageTime = messageLength * 150;

        setTimeout(() => {
            this.removeItem(item)
        }, messageTime);
    }

    removeItem(item) {
        if (item.parentNode === null) {
            return;
        }

        item.parentNode.removeChild(item);
    }
}
class WfProgress {
    update() {
        this.isFinish = false;
        this.progressSize = 0;
        this.$loadingMain = document.getElementById('loadingMain');
        this.$body = document.querySelector('body');
        this.$bar = document.querySelector('#loadingMain').querySelector('.progress-bar');
        this.$all = document.querySelectorAll('div, section, article');
        this.$allLength = this.$all.length;
    }

    build() {
        if (document.getElementById('loadingMain') < 1) {
            return;
        }

        this.update();
        this.start();
    }

    start() {
        let self = this;
        let interval = setInterval(frame, 1);
        let total = this.buildProportion();

        function frame() {
            let porcentage = self.progressSize * 100 / total;

            self.progressSize++;
            self.$bar.style.width = porcentage + '%';

            if (self.progressSize >= total) {
                clearInterval(interval);
                self.finish();
                self.isFinish = true;
            }
        }
    }

    finish() {
        this.$loadingMain.classList.add('loading-main-done');
        this.$body.style.overflowY = 'auto';
        setTimeout(this.remove(this.$loadingMain), 1000);
    }

    remove(element) {
        element.parentNode.removeChild(element);
    }

    buildProportion() {
        if (this.$allLength > 1000) {
            return this.$allLength / 50;
        }
        if (this.$allLength > 900) {
            return this.$allLength / 45;
        }
        if (this.$allLength > 800) {
            return this.$allLength / 40;
        }
        if (this.$allLength > 700) {
            return this.$allLength / 35;
        }
        if (this.$allLength > 600) {
            return this.$allLength / 30;
        }
        if (this.$allLength > 500) {
            return this.$allLength / 25;
        }
        if (this.$allLength > 400) {
            return this.$allLength / 20;
        }
        if (this.$allLength > 300) {
            return this.$allLength / 15;
        }
        if (this.$allLength > 200) {
            return this.$allLength / 10;
        }

        return this.$allLength;
    }
}
class WfTable {
    constructor() {
        this.elTable = document.querySelectorAll('.table');
        this.cssResponsive = 'table-responsive';
    }

    build() {
        if (this.elTable.length < 1) {
            return;
        }

        this.buildResponsive();
    }

    buildResponsive() {
        Array.prototype.forEach.call(this.elTable, (item) => {
            wrapItem(item, this.cssResponsive);
            wrapItem(item.parentNode.parentNode.querySelector(`.${this.cssResponsive}`), `wrapper-${this.cssResponsive}`);
        });
    }
}
class WfTag {
    constructor() {
        this.elTag = document.querySelectorAll('.tag');
    }

    build() {
        if (this.elTag.length < 1) {
            return;
        }

        this.buildClick();
    }

    buildClick() {
        Array.prototype.forEach.call(this.elTag, function (item) {
            let button = item.querySelector('.button__close');

            if (button === null) {
                return;
            }

            button.addEventListener('click', () => {
                button.parentNode.parentNode.removeChild(button.parentNode);
            });
        });
    }
}
class WfTooltip {
    constructor() {
        this.elementTop = 0;
        this.elementLeft = 0;
        this.elementWidth = 0;
        this.elementHeight = 0;
        this.elementLeft = 0;
        this.style = 'black';
        this.space = 5;
        this.currentWindowScroll = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.centerWidth = 0;
        this.centerHeight = 0;
        this.positionTop = 0;
        this.positionLeft = 0;
    }

    build() {
        this.buildHtml();
        this.updateVariable(false);

        if (this.$tooltipData.length < 1) {
            return;
        }

        this.buildMaxWidth();
        this.buildResize();
        this.buildTooltip();
    }

    updateVariable(element) {
        this.$tooltip = document.querySelector('#tooltip');
        this.$tooltipBody = document.querySelector('#tooltipBody');
        this.$tooltipPointer = document.querySelector('#tooltipPointer');
        this.$tooltipData = document.querySelectorAll('[data-tooltip="true"]');

        this.windowWidth = window.offsetWidth;
        this.windowHeight = window.offsetHeight;
        this.currentWindowScroll = window.scrollY;

        this.elementTop = element !== false ? offset(element).top : 0;
        this.elementLeft = element !== false ? offset(element).left : 0;
        this.elementWidth = element !== false ? element.offsetWidth : 0;
        this.elementHeight = element !== false ? element.offsetHeight : 0;

        this.tooltipWidth = element !== false ? this.$tooltip.offsetWidth : 0;
        this.tooltipHeight = element !== false ? this.$tooltip.offsetHeight : 0;

        this.centerWidth = (this.tooltipWidth - this.elementWidth) / 2;
        this.centerHeight = (this.elementHeight / 2) - (this.tooltipHeight / 2);

        this.positionLeft = this.elementLeft - this.centerWidth;
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
    }

    buildHtml() {
        let html = `
            <div id="tooltip">
                <div id="tooltipBody"></div>
                <div id="tooltipPointer"></div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('beforeend', html);
    }

    buildResize() {
        let self = this;

        window.onresize = function () {
            self.updateVariable(false);
            self.buildMaxWidth();
        };
    }

    buildTooltip() {
        let self = this;

        this.showTooltip(false);
        Array.prototype.forEach.call(this.$tooltipData, function (item) {
            let title = item.getAttribute('title');

            if (typeof title !== 'undefined' && title !== null && title !== '') {
                item.setAttribute('data-tooltip-text', title);
                item.removeAttribute('title');
                item.onmouseover = function () {

                    self.$tooltipBody.innerHTML = item.getAttribute('data-tooltip-text');
                    self.changeLayout(item.getAttribute('data-tooltip-color'));
                    self.positionTooltip(item, item.getAttribute('data-tooltip-placement'));
                    self.showTooltip(true);
                };

                item.onmouseout = function () {
                    self.showTooltip(false);
                };
            }
        });
    }

    buildMaxWidth() {
        this.$tooltip.style.maxWidth = this.windowWidth - (this.space * 2);
    }

    showTooltip(action) {
        if (action) {
            this.$tooltip.classList.add('tooltip-show');
        } else {
            this.$tooltip.classList.remove('tooltip-show');
        }
    }

    positionTooltipSwitchDirection(placement) {
        let direction = typeof placement === 'undefined' ? 'top' : placement;

        switch (direction) {
            case 'top':
                if ((this.elementTop - this.tooltipHeight) < (this.currentWindowScroll)) {
                    direction = 'bottom';
                }
                break;
            case 'right':
                if ((this.elementLeft + this.tooltipWidth + this.elementWidth) > this.windowWidth) {
                    direction = 'left';
                }
                break;
            case 'bottom':
                if ((this.elementTop + this.tooltipHeight + this.elementHeight) > (this.currentWindowScroll + this.windowHeight)) {
                    direction = 'top';
                }
                break;
            case 'left':
                if ((this.tooltipWidth + this.space) > this.elementLeft) {
                    direction = 'right';
                }
                break;
        }

        return direction;
    }

    positionTooltipTop() {
        this.positionTop = this.elementTop - this.tooltipHeight - this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipBottom() {
        this.positionTop = this.elementTop + this.elementHeight + this.space;
        this.positionLeft = this.elementLeft - this.centerWidth;
    }

    positionTooltipRight() {
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft + this.elementWidth + this.space;
    }

    positionTooltipLeft() {
        this.positionTop = this.elementTop + this.centerHeight;
        this.positionLeft = this.elementLeft - this.tooltipWidth - this.space;
    }

    positionTooltip(element, placement) {
        this.updateVariable(element);

        let direction = this.positionTooltipSwitchDirection(placement);

        switch (direction) {
            case 'top':
                this.positionTooltipTop();
                break;
            case 'right':
                this.positionTooltipRight();
                break;
            case 'bottom':
                this.positionTooltipBottom();
                break;
            case 'left':
                this.positionTooltipLeft();
                break;
        }

        this.changeArrowDirection(direction);
        this.buildLimits();
        this.$tooltip.style.top = this.positionTop + 'px';
        this.$tooltip.style.left = this.positionLeft + 'px';

        if (direction === 'top' || direction === 'bottom') {
            this.changeArrowPositionHorizontal();
        } else {
            this.changeArrowPositionVertical();
        }
    }

    buildLimits() {
        if (this.positionLeft <= 0) {
            this.positionLeft = this.space;
        }

        if (this.positionLeft + this.tooltipWidth >= this.windowWidth) {
            this.positionLeft = this.windowWidth - this.tooltipWidth - this.space;
        }
    }

    changeArrowPositionHorizontal() {
        this.$tooltipPointer.style.left = this.$tooltip.offsetWidth / 2 + 'px';
    }

    changeArrowPositionVertical() {
        this.$tooltipPointer.style.left = '';
    }

    changeArrowDirection(direction) {
        this.$tooltipPointer.classList.remove('tooltip-direction-top');
        this.$tooltipPointer.classList.remove('tooltip-direction-bottom');
        this.$tooltipPointer.classList.remove('tooltip-direction-left');
        this.$tooltipPointer.classList.remove('tooltip-direction-right');
        this.$tooltipPointer.classList.add('tooltip-direction-' + direction);
    }

    changeLayout(style) {
        let newStyle = typeof style === 'undefined' ? newStyle = this.style : style;

        this.$tooltip.removeAttribute('class');
        this.$tooltip.classList.add('tooltip');
        this.$tooltip.classList.add('tooltip-' + newStyle);
    }

    reset() {
        let element = document.getElementById('tooltip');

        element.parentNode.removeChild(element);
        objWfTooltip.build();
    }
}
class WfTranslation {
    constructor() {
        this.translation = '';
    }

    build() {
        this.defineLanguege();
    }

    defineLanguege() {
        switch (globalLanguage) {
            case 'pt':
                this.translation = translationPT;
                break;
            case 'en':
                this.translation = translationEN;
                break;
        }
    }
}
class WfManagementPlugin {
    verifyLoad() {
        window.addEventListener('load', this.applyClass(), {
            once: true
        });
    }

    applyClass() {
        objWfTranslation.build();
        objWfProgress.build();
        objWfForm.build();
        objWfMask.build();
        objWfModal.build();
        objWfCarousel.build();
        objWfLazyLoad.build();
        objWfMenuDropDown.build();
        objWfMenuTab.build();
        objWfMenuToggle.build();
        objWfNotification.build();
        objWfTable.build();
        objWfTag.build();
        objWfTooltip.build();
    }
}

window.objWfManagementPlugin = new WfManagementPlugin();

window.objWfCarousel = new WfCarousel();
window.objWfForm = new WfForm();
window.objWfLayout = new WfLayout();
window.objWfLazyLoad = new WfLazyLoad();
window.objWfMask = new WfMask();
window.objWfMenuDropDown = new WfMenuDropDown();
window.objWfMenuTab = new WfMenuTab();
window.objWfMenuToggle = new WfMenuToggle();
window.objWfModal = new WfModal();
window.objWfNotification = new WfNotification();
window.objWfProgress = new WfProgress();
window.objWfTable = new WfTable();
window.objWfTag = new WfTag();
window.objWfTooltip = new WfTooltip();
window.objWfTranslation = new WfTranslation();

objWfManagementPlugin.verifyLoad();