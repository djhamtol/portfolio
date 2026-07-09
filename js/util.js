const util = {
    setClass(els , target, className='active') {
        els.forEach(el => {
            el.classList.remove(className);
        });

        target.classList.add(className);
    },

    removeClass(els, className='active') {
        els.forEach(el => {
            el.classList.remove(className);
        });
    }
};