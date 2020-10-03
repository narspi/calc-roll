const cartWrapper = document.querySelector('.cart-wrapper');


window.addEventListener('click', event => {
    target = event.target;
    if (target.hasAttribute('data-cart')) {
        const btn = target;
        const card = btn.closest('.card');

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]'),
        }

        const cartItemHTML = `
            <!-- Cart item -->
							<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>
										<div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight} </div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.counter.innerText}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price}</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>
							<!-- // Cart item -->
        `;

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            let counterInCart = itemInCart.querySelector('[data-counter]');
            counterInCart.innerText = +counterInCart.innerText + +productInfo.counter.innerText;
            toggleClassStatus ();
        }

        else {
            cartWrapper.insertAdjacentHTML('beforeend',cartItemHTML);
            toggleClassStatus ();
        }

        productInfo.counter.innerText = 1;
    }


});

function toggleClassStatus () {
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const cartTotal = document.querySelector('.cart-total');
    const orderForm = document.querySelector('#order-form');

    if (cartWrapper.querySelectorAll('.cart-item').length > 0) {
        cartEmpty.classList.add('none');
        cartTotal.classList.remove('none');
        orderForm.classList.remove('none');
    }

    else {
        cartEmpty.classList.remove('none');
        cartTotal.classList.add('none');
        orderForm.classList.add('none');
    }

    let totalPrice = 0;
    cartWrapper.querySelectorAll('.cart-item').forEach((item)=>{
        const itemCounter = item.querySelector('[data-counter]').innerText;
        const priceOneItem = item.querySelector('.price__currency').innerText;
        const price = parseInt(itemCounter) * parseInt(priceOneItem);
        totalPrice += price;
    });

    if (totalPrice >= 1000) {
        document.querySelector('.total-price').innerText = totalPrice;
        document.querySelector('.delivery-cost').innerText = 'бесплатно';
    }

    else {
        document.querySelector('.total-price').innerText = totalPrice + 300;
        document.querySelector('.delivery-cost').innerText = '300 ₽';
    }




}


