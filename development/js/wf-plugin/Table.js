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
            wrapItem(item, this.cssResponsive);
            wrapItem(item.parentNode.parentNode.querySelector(`.${this.cssResponsive}`), `wrapper-${this.cssResponsive}`);
        });
    }
}