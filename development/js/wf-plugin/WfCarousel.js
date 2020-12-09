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

        elCarouselList.style.width += length * 100 + '%';

        Array.prototype.forEach.call(elCarouselListItem, function (item) {
            item.style.width = '100%';
        });
    }
}