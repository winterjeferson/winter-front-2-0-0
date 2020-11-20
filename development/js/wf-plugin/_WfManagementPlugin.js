class WfManagementPlugin {
    verifyLoad() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        window.addEventListener('load', this.applyClass(), { once: true });
    }

    applyClass() {
        /*removeIf(production)*/ objWfDebug.debugMethod(this, objWfDebug.getMethodName()); /*endRemoveIf(production)*/
        objWfTranslation.build();
        objWfProgress.build();
        objWfForm.build();
        objWfMask.build();
        objWfModal.build();
        objWfCarousel.build();
        objWfLazyLoad.build();
        objWfMenuDropDown.build();
        objWfMenuTab.build();
        objWfMenuToggle.build();
        objWfNotification.build();
        objWfTable.build();
        objWfTag.build();
        objWfTooltip.build();
    }
}

/*removeIf(production)*/
window.objWfDebug = new WfDebug();
/*endRemoveIf(production)*/
window.objWfManagementPlugin = new WfManagementPlugin();

window.objWfCarousel = new WfCarousel();
window.objWfForm = new WfForm();
window.objWfLayout = new WfLayout();
window.objWfLazyLoad = new WfLazyLoad();
window.objWfMask = new WfMask();
window.objWfMenuDropDown = new WfMenuDropDown();
window.objWfMenuTab = new WfMenuTab();
window.objWfMenuToggle = new WfMenuToggle();
window.objWfModal = new WfModal();
window.objWfNotification = new WfNotification();
window.objWfProgress = new WfProgress();
window.objWfTable = new WfTable();
window.objWfTag = new WfTag();
window.objWfTooltip = new WfTooltip();
window.objWfTranslation = new WfTranslation();

objWfManagementPlugin.verifyLoad();