const cartFunctionality = {
    openCart() {
        document.querySelector(".cart-icon").addEventListener('click', (e) => {
            e.preventDefault();
            const minicart = document.querySelector('.minicart');
            minicart.classList.toggle('is-open');
        })
    },

    closeCart() {

        document.querySelector('.close-minicart').addEventListener('click', (e) => {
            e.preventDefault();
            const minicart = document.querySelector('.minicart');
            minicart.classList.remove('is-open');
        })
    },

    increaseQty(){
console.log('hey there')
    },
decreawseQty(){
    'hey there'
}
}