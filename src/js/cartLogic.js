import fetchProducts from './fetchProducts.js'
import storage from './storage.js';

const cartLogic = {

    cart: storage.getCartItems(),

    minicartContent: document.querySelector('.minicart-items'),
    checkout: document.querySelector('.checkout-amount'),
    
    async getProductFromDb(id) { 

        const products = await fetchProducts();
        const product = products.items.find((item) => {
            return item.sys.id  === id});
        return product;
        
    },

     async addProductToCart(productId){
     
        const productToBeAdded = await cartLogic.getProductFromDb(productId);
        const productInCart = this.cart.find(item => item.sys.id === productId);

        if(productInCart) { return }
        
        this.cart.push(productToBeAdded);
        storage.saveCartItems(this.cart);
        this.displayProductsInCart();
        
    },

    firstLetterToUpperCase(word){
        const wordCappitalized = word.charAt(0).toUpperCase() + word.slice(1);
        return wordCappitalized;
    },

    displayProductsInCart(){
         
        const products = this.cart.map(product => {
            return `
            <li class="minicart-item" data-productId=${product.sys.id}>
                         <img src="${product.fields.image.fields.file.url}" alt="${product.fields.title}" class="item-image">
                         <div class="item-info">
                             <p class="info-title">${this.firstLetterToUpperCase(product.fields.title)}</p>
                             <div class="counter">
                                 <button class="counter-increase">+</button>
                                 <p class="counter-quantity">${product.fields.quantity}</p>
                                 <button class="counter-decrease">-</button>
                             </div>
                         </div>
                         <p class="item-price">${product.fields.price}$</p>
                         <button class="close-button"><i class="fas fa-times"></i></button>
                     </li>
            
            `;
            
        });

        this.minicartContent.innerHTML = products.join("")
},  

// Remove products from cart (UI)

clearCartFromUI(e){

    e.preventDefault()
    
    // Remove products from cart (UI)
    const products = document.querySelector('.minicart-items');

    while(products.lastElementChild) {
    products.removeChild(products.lastElementChild);
}

    // Restore begining state of the add buttons
    const addButtons = document.querySelectorAll('.product-button');
    addButtons.forEach((button) => {
        button.disabled = false;
        button.style.backgroundColor = '#2E8B57';
    });
    
    // Remove all items from local storage
    storage.clearStorage(storage.cartNameHandler);
    
    // Make cart empty
    cartLogic.cart = storage.getCartItems();

},

// Compute total price of all products in cart

calculateTotalAmmount(products){  
   const totalAmmount = products.reduce((acc, item)=> {        
        return acc += item.fields.price * item.fields.quantity
    }, 0)

    return totalAmmount;
},

increaseProductQty(event){
    const productId = event.target.parentElement.parentElement.parentElement.dataset.productid;
    const product = cartLogic.cart.find(item => item.sys.id === productId);
    
    product.fields.quantity += 1;
    storage.saveCartItems(this.cart);
    this.displayProductsInCart();
    this.checkout.textContent = `${this.calculateTotalAmmount(this.cart)}$`;
},

decreaseProductQty(event){
    const productId = event.target.parentElement.parentElement.parentElement.dataset.productid;
        const product = cartLogic.cart.find(item => item.sys.id === productId);
       
        product.fields.quantity -= 1;
        
        if(product.fields.quantity == 0 ) {
           let newCart = this.cart.filter(item => item.sys.id !== productId);
           this.cart = newCart;
           
           storage.saveCartItems(newCart);
           const productButton = document.querySelector(`[data-id="${productId}"]`);
           productButton.style.backgroundColor = '#2E8B57';
           productButton.disabled = false;
          }
            storage.saveCartItems(this.cart);
            this.checkout.textContent = `${this.calculateTotalAmmount(this.cart)}$`;
            this.displayProductsInCart();
},

minicartAction(){
    this.minicartContent.addEventListener('click', (event)=>{
               
    if(event.target.classList.contains('counter-increase')) {

        this.increaseProductQty(event)
          
    } else if (event.target.classList.contains('counter-decrease')) {

        this.decreaseProductQty(event);
        
    } else if (event.target.classList.contains('fa-times')) {
        const productId = event.target.parentElement.parentElement.dataset.productid;
        const productButton = document.querySelector(`[data-id="${productId}"]`);
        
        productButton.disabled = false;
        event.target.parentElement.parentElement.remove();
        storage.removeProductFromLS(productId);
        
        
                   
    } 
});

}

}


export default cartLogic;
