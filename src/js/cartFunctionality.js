import cartLogic from "./cartLogic.js";
import storage from "./storage.js";

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

    toogleCartState(){
        this.openCart();
        this.closeCart();
    },
}



export default cartFunctionality