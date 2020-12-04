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