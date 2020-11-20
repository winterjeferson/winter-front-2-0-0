/*removeIf(production)*/
class WfDebug {
    constructor() {
        this.isWfLayout = false;
        this.isWfLoading = false;
        this.isWfTheme = false;

        this.isWfCarousel = false;
        this.isWfForm = false;
        this.isWfLazyLoad = false;
        this.isWfMenuDropDown = false;
        this.isWfMenuTab = false;
        this.isWfMenuToggle = false;
        this.isWfMask = false;
        this.isWfModal = false;
        this.isWfNotification = false;
        this.isWfProgress = false;
        this.isWfTable = false;
        this.isWfTag = false;
        this.isWfTooltip = false;
        this.isWfTranslation = false;
    }

    debugMethod(objWf, method, parameter = '') {
        let string = '';
        let className = objWf.constructor.name;
        // let arrMethod = objWfect.getOwnPropertyNames(objWfect.getPrototypeOf(objWf));

        if (!this['is' + className]) {
            return false;
        }

        string += '%c';
        string += 'obj' + className;
        string += '.';
        string += '%c';
        string += method;
        string += '(';

        string += '%c';
        if (parameter !== '') {
            string += parameter;
        }

        string += '%c';
        string += ');';

        console.log(string, 'color: black', 'color: blue', 'color: red', 'color: blue');
    }

    getMethodName() {
        let userAgent = window.navigator.userAgent;
        let msie = userAgent.indexOf('.NET ');

        if (msie > 0) {
            return false;
        }

        let e = new Error('dummy');
        let stack = e.stack.split('\n')[2]
            // " at functionName ( ..." => "functionName"
            .replace(/^\s+at\s+(.+?)\s.+/g, '$1');
        let split = stack.split('.');

        if (stack !== 'new') {
            return split[1];
        } else {
            return 'constructor';
        }
    }
}
/*endRemoveIf(production)*/