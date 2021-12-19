import fetchProducts from './fetchProducts.js'
import storage from './storage.js';

const cartLogic = {

    cart: storage.getCartItems(),
    
    // openCart() {
    //     document.querySelector(".cart-icon").addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const minicart = document.querySelector('.minicart');
    //         minicart.classList.toggle('is-open');
    //     })
    // },

    // closeCart() {

    //     document.querySelector('.close-minicart').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const minicart = document.querySelector('.minicart');
    //         minicart.classList.remove('is-open');
    //     })
    // },

    async getProductFromDb(id) { 

        const products = await fetchProducts();
        const product = products.items.find((item) => {
            return item.sys.id  === id});
        return product;
        
    },

     async addProductToCart(id){
        //  const isInCart = this.cart.filter(item => item.sys.id === id);
        //  if(isInCart) return
         
        const product = await cartLogic.getProductFromDb(id);
        console.log(product);
        this.cart.push(product);
        this.displayProductInCart(product);
        // console.log(this.cart)
        storage.saveCartItems(this.cart);
        
    },

    firstLetterToUpperCase(word){
        const wordCappitalized = word.charAt(0).toUpperCase() + word.slice(1);
        return wordCappitalized;
    },

    displayProductInCart(product){
        
        const miniCarList = document.querySelector('.minicart-items');
        
        const itemHtml = `
        <li class="minicart-item">
                        <img src="${product.fields.image.fields.file.url}" alt="$product.fields.title}" class="item-image">
                        <div class="item-info">
                            <p class="info-title">${this.firstLetterToUpperCase(product.fields.title)}</p>
                            <div class="counter">
                                <button class="counter-increase">+</button>
                                <p class="counter-quantity">0</p>
                                <button class="counter-decrease">-</button>
                            </div>
                        </div>
                        <p class="item-price">${product.fields.price}$</p>
                        <button class="close-button"><i class="fas fa-times"></i></button>
                    </li>
    `;
        miniCarList.insertAdjacentHTML("beforeend", itemHtml);
},  

clearCart(){
//clear cart from storage
}  

}


export default cartLogic;
