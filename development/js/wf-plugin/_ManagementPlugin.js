class ManagementPlugin {
    verifyLoad() {
        window.addEventListener('load', this.applyClass(), {
            once: true
        });
    }

    applyClass() {
        window.translation.build();
        window.progress.build();
        window.form.build();
        window.mask.build();
        window.modal.build();
        window.carousel.build();
        window.lazyLoad.build();
        window.menuDropDown.build();
        window.menuTab.build();
        window.menuToggle.build();
        window.notification.build();
        window.table.build();
        window.tag.build();
    }
}

window.managementPlugin = new ManagementPlugin();
window.carousel = new Carousel();
window.form = new Form();
window.layout = new Layout();
window.lazyLoad = new LazyLoad();
window.mask = new Mask();
window.menuDropDown = new MenuDropDown();
window.menuTab = new MenuTab();
window.menuToggle = new MenuToggle();
window.modal = new Modal();
window.notification = new Notification();
window.progress = new Progress();
window.table = new Table();
window.tag = new Tag();
window.translation = new Translation();

window.managementPlugin.verifyLoad();