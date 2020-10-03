window.addEventListener('click', event => {
    target = event.target;
    if (target.hasAttribute('data-action')) {
        const counterWrapper = target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');
        const btn = target;
        if (btn.dataset.action === 'plus') {
            counter.innerText = ++counter.innerText;
            if  (target.closest('.cart-item')) {
                toggleClassStatus ();
            }
        } else 
        if (btn.dataset.action === 'minus') {
            if (counter.innerText > 1) {
                counter.innerText = --counter.innerText;
                if  (target.closest('.cart-item')) {
                    toggleClassStatus ();
                }
            } 
            else if (target.closest('.cart-wrapper')) {
                target.closest('.cart-item').remove();
                toggleClassStatus ();
            }
        }
    }
})
