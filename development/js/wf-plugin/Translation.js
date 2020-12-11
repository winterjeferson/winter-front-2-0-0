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