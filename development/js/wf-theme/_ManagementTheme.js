class ManagementTheme {
    verifyLoad() {
        window.addEventListener('load', this.applyClass(), {
            once: true
        });
    }

    applyClass() {
        objWfTheme.build();
    }
}

window.objWfTheme = new Theme();
window.objWfManagementTheme = new ManagementTheme();

objWfManagementTheme.verifyLoad();