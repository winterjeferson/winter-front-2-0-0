class WfManagementTheme {
    verifyLoad() {
        window.addEventListener('load', this.applyClass(), {
            once: true
        });
    }

    applyClass() {
        objWfTheme.build();
    }
}

window.objWfManagementTheme = new WfManagementTheme();

objWfManagementTheme.verifyLoad();