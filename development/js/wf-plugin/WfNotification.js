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