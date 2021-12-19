import cartLogic from "./cartLogic.js";

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

    populateCart(product){
        cartLogic.displayProductInCart(product);
    },

    clearCartFromUI(e){
        e.preventDefault()
        const products = document.querySelector('.minicart-items');
    
        while(products.lastElementChild) {
        products.removeChild(products.lastElementChild);
}
},

    increaseQty(){
console.log('hey there')
    },
decreawseQty(){
    'hey there'
}
}

export default cartFunctionality