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
class Carousel {
    constructor() {
        this.attCurrentSlide = 'data-current-slide';
        this.attPrevious = '[data-id="previous"]';
        this.attNext = '[data-id="next"]';
        this.cssCarouselList = 'carousel__list';
        this.cssCarouselListClass = `.${this.cssCarouselList}`;
        this.cssCarouselListItem = `carousel__item`;
        this.cssCarouselController = 'carousel__controller';
        this.cssCarouselControllerClass = `.${this.cssCarouselController}`;
        this.cssButton = 'carousel__controller-button';
        this.cssButtonClass = `.${this.cssButton}`;
        this.cssButtonActive = `${this.cssButton}--active`;
        this.cssDisplay = 'hide';
        this.elCarousel = document.querySelectorAll('.carousel');

        this.counterCurrent = 0;
        this.transition = 5;
        this.isAutoplay = true;
    }

    build() {
        if (this.elCarousel.length < 1) {
            return;
        }

        this.buildLayout();
        this.buildNavigation();
        this.watchResize();
    }

    buildAutoplay() {
        if (this.isAutoplay) {
            this.interval = setInterval(this.verifyInterval, 1000);
            this.isAutoplay = false;
        }
    }

    buildLayout() {
        const self = this;

        Array.prototype.forEach.call(this.elCarousel, (item) => {
            let length = item.querySelectorAll(`${self.cssCarouselListClass} li`).length;
            let autoplay = item.getAttribute('data-autoplay');

            if (autoplay === 'true') {
                self.buildAutoplay();
            }

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

        window.onresize = () => {
            Array.prototype.forEach.call(self.elCarousel, (item) => {
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
            self.buildNavigationController(item);
            self.buildNavigationArrowLeft(item);
            self.buildNavigationArrowRight(item);
        });
    }

    buildNavigationController(target) {
        const button = target.querySelectorAll(this.cssButtonClass);

        Array.prototype.forEach.call(button, (item) => {
            item.onclick = () => {
                this.defineActive(item);
                this.animate(item.getAttribute('data-id'), item, 'navigation');
            };
        });
    }

    buildNavigationArrowLeft(target) {
        const self = this;
        const button = target.querySelector(this.attPrevious);

        button.onclick = () => {
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

        button.onclick = () => {
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
        const el = obj.elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`);
        const transition = '.7s';

        Array.prototype.forEach.call(el, (item) => {
            item.style.opacity = 0;
            item.style.transition = transition;
        });

        el[obj.currentSlide].style.opacity = 1;
        el[obj.currentSlide].style.left = `-${obj.currentPosition}px`;
        el[obj.currentSlide].style.transition = transition;
    }

    animateSlide(obj) {
        obj.elCarouselList.style.transform = `translateX(-${obj.currentPosition}px)`;
    }

    verifyInterval() {
        let instance = window.carousel;

        instance.counterCurrent++;

        if (instance.counterCurrent >= instance.transition) {
            instance.counterCurrent = 0;

            Array.prototype.forEach.call(instance.elCarousel, (item) => {
                const autoplay = item.getAttribute('data-autoplay');

                if (autoplay === "true") {
                    item.querySelector(instance.attNext).click();
                }
            });
        }
    }

    defineActive(target) {
        const el = target.parentNode.parentNode.querySelectorAll(this.cssButtonClass);

        Array.prototype.forEach.call(el, (item) => {
            item.classList.remove(this.cssButtonActive);
        });

        target.classList.add(this.cssButtonActive);
    }

    resizeLayout(target) {
        const elCarouselList = target.querySelector(this.cssCarouselListClass);
        const elCarouselListItem = elCarouselList.querySelectorAll(`.${this.cssCarouselListItem}`);
        const length = elCarouselListItem.length;

        elCarouselList.style.width += `${length * 100}%`;
    }
}

window.carousel = new Carousel();
class Form {
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

window.form = new Form();
class Helper {
    getUrlParameter(target) {
        let url = top.location.search.substring(1);
        let parameter = url.split('&');

        for (let i = 0; i < parameter.length; i++) {
            let parameterName = parameter[i].split('=');

            if (parameterName[0] === target) {
                return parameterName[1];
            }
        }
    }

    getUrlWord(target) {
        return new RegExp('\\b' + target + '\\b', 'i').test(window.location.href);
    }

    offset(element) {
        let rect = element.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const obj = {
            'top': rect.top + scrollTop,
            'left': rect.left + scrollLeft,
        };

        return obj;
    }

    verifyUrlRoute(target) {
        let arrFolder = window.location.pathname.split('/');

        if (arrFolder.indexOf(target) > -1) {
            return true;
        } else {
            return false;
        }
    }

    wrapItem(target, cssClass) {
        let wrapper = document.createElement('div');

        wrapper.className = cssClass;
        target.parentNode.insertBefore(wrapper, target);
        wrapper.appendChild(target);
    }
}

window.helper = new Helper();
class Layout {
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

window.layout = new Layout();
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
class Mask {
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

window.mask = new Mask();
class MenuDropDown {
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
        if (this.elMen === typeof 'undefined') {
            return;
        }

        const self = window.menuDropDown;

        Array.prototype.forEach.call(self.elMenu, (item) => {
            const elContent = item.querySelector(`.${self.cssDropDownContent}`);

            if (elContent === null) {
                return;
            }

            if (elContent.classList.contains(self.cssOpend)) {
                elContent.classList.remove(self.cssOpend);
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
        const el = document.querySelectorAll(`.${window.menuDropDown.cssMobileShow}`);

        if (event.toElement.classList.contains('button') || event.toElement.classList.contains('link')) {
            return;
        }

        Array.prototype.forEach.call(el, (item) => {
            item.classList.remove(window.menuDropDown.cssMobileShow);
        });
    }

    reset() {
        document.removeEventListener('click', event, true);
        document.removeEventListener('click', this.listener, true);
        window.menuDropDown.build();
    }
}

window.menuDropDown = new MenuDropDown();
class MenuTab {
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

window.menuTab = new MenuTab();
class MenuToggle {
    constructor() {
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
                const attribute = 'style';
                const sibling = el.nextElementSibling;
                const isStyle = sibling.hasAttribute(attribute);

                if (isStyle) {
                    sibling.removeAttribute(attribute);
                } else {
                    sibling.style.display = 'flex';
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

window.menuToggle = new MenuToggle();
class Modal {
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
                        <button id="modalClose" type="button" aria-label="${window.translation.translation.close}" class="button button--small button--small--proportional button--grey button--transparent button--close">
                            <svg class="icon icon--regular rotate-45">
                                <use xlink:href="./assets/img/icon.svg#plus"></use>
                            </svg>
                        </button>
                    </header>
                    <div class="row">
                        <div id="modalContent" class="modal__content"></div>
                    </div>
                    <div class="navigation-change button-wrapper row center ${this.cssHide}">
                        <button type="button" class="button button--big" data-id="previous" aria-label="${window.translation.translation.previous}" >
                            <svg class="icon icon--extra-big icon--white">
                                <use xlink:href="./assets/img/icon.svg#previous"></use>
                            </svg>
                        </button>
                        <button type="button" class="button button--big" data-id="next" aria-label="${window.translation.translation.next}" >
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
        this.elModalFooterConfirm.innerHTML = window.translation.translation.confirm;
        this.elModalFooterCancel.innerHTML = window.translation.translation.cancel;
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
            if (this.readyState === 4 && this.status === 200) {
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

        const string = `<p class="modal__description">${description}</p>`;

        if (typeof description !== typeof 'undefined') {
            this.elModalContent.insertAdjacentHTML('beforeend', string);
        }
    }

    resetOtherClass() {
        if (typeof window.form !== 'undefined') {
            window.form.buildInputFile();
        }

        if (typeof window.menuDropDown !== 'undefined') {
            window.menuDropDown.reset();
        }

        if (typeof window.menuToggle !== 'undefined') {
            window.menuToggle.build();
        }

        if (typeof window.menuTab !== 'undefined') {
            window.menuTab.defineActive();
        }

        if (typeof window.lazyLoad !== 'undefined') {
            window.lazyLoad.build();
        }
    }
}

window.modal = new Modal();
class Notification {
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
                <button type="button" class="button button--small button--small--proportional button--transparent" onclick="Notification.remove(this.parentNode, 0)" aria-label="${Translation.translation.close}">
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

window.notification = new Notification();
class Progress {
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

window.progress = new Progress();
class Table {
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
            window.helper.wrapItem(item, this.cssResponsive);
            window.helper.wrapItem(item.parentNode.parentNode.querySelector(`.${this.cssResponsive}`), `wrapper-${this.cssResponsive}`);
        });
    }
}

window.table = new Table();
class Tag {
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

window.tag = new Tag();
class Translation {
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
            default:
                this.translation = translationEN;
                break;
            case 'es':
                this.translation = translationES;
                break;
        }
    }
}

window.translation = new Translation();
window.addEventListener('load',
    window.translation.build(),
    window.progress.build(),
    window.mask.build(),
    window.modal.build(),
    window.carousel.build(),
    window.lazyLoad.build(),
    window.menuDropDown.build(),
    window.menuTab.build(),
    window.menuToggle.build(),
    window.notification.build(),
    window.table.build(),
    window.tag.build(), {
        once: true
    });