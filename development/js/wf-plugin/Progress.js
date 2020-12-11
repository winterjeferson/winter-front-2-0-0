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