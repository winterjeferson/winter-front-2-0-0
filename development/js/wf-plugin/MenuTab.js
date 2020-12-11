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