class WfTheme {
    constructor() {
        this.$body = document.querySelector('body');
        this.arrStyle = ['grey', 'blue', 'green', 'cyan', 'orange', 'red', 'yellow', 'purple', 'brown', 'black', 'white'];
        this.arrStyleLength = this.arrStyle.length;
    }

    build() {
        this.buildActiveMenu();
    }

    buildActiveMenu() {
        let url = top.location.href;
        let urlSplit = url.split('/');
        let length = urlSplit.length;
        let file = urlSplit[length - 1];
        let fileSplit = file.split('.');
        let target = document.querySelectorAll('#mainMenu [data-id="' + fileSplit[0] + '"]');

        if (target.length > 0) {
            target[0].classList.add('active');
        }
    }
}

window.objWfTheme = new WfTheme();