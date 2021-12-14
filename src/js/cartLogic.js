import fetchProducts from './fetchProducts.js'
import storage from './storage.js';

const cartLogic = {

    cart: storage.getCartItems(),

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

    async getProductFromDb(id) { 

        const products = await fetchProducts();
        const product = products.items.find((item) => {
            return item.sys.id  === id});
        return product;
        
    }
    ,

     async addProductToCart(id){
        //  const isInCart = this.cart.filter(item => item.sys.id === id);
        //  if(isInCart) return
         
        const product = await cartLogic.getProductFromDb(id);
        this.cart.push(product);
        // console.log(this.cart)
        storage.saveCartItems(this.cart);
        
    },

    

}


export default cartLogic;
