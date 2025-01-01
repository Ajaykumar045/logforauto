document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.buy-now');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.getAttribute('data-name'),
                price: button.getAttribute('data-price'),
                img: button.getAttribute('data-img')
            };
            localStorage.setItem('cartItem', JSON.stringify(product));
            window.location.href = 'cart.html';
        });
    });

    const cartItem = JSON.parse(localStorage.getItem('cartItem'));
    if (cartItem) {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = `
            <div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            <img src="${cartItem.img}" class="img-fluid rounded-3" alt="${cartItem.name}">
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                            <p class="lead fw-normal mb-2">${cartItem.name}</p>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control form-control-sm" />
                            <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 class="mb-0">₹${cartItem.price}</h5>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
