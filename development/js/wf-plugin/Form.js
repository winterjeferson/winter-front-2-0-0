class Form {
    validateEmpty(arr) {
        const arrEmpty = arr;
        const length = arrEmpty.length;

        for (let i = 0; i < length; i++) {
            if (arrEmpty[i].value === '') {
                arrEmpty[i].focus();
                return false;
            }
        }

        return true;
    }
}

window.form = new Form();