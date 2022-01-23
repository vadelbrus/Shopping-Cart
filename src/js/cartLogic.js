import fetchProducts from './fetchProducts.js'
import storage from './storage.js';

const cartLogic = {

    //SET INITIAL CART VALUES
    
    cart: storage.getCartItems(),
    cartValue: 0,
    productsInCart: 0,

    //SELECT ELEMENTS FROM DOM

    minicartContent: document.querySelector('.minicart-items'),
    checkout: document.querySelector('.checkout-amount'),
    

    //LOAD PRODUCTS FROM EXTERNAL JSON
    
    async getProductFromDb(id) { 

        const products = await fetchProducts();
        return products.items.find((item) => {
            return item.sys.id  === id});
    },

    showSummary(){
                
    const modal = document.querySelector('.modal-container');
    modal.classList.toggle('show-modal');

        const totalPrice = document.querySelector('.modal-value');
        const modalProducts = document.querySelector('.modal-products');
        totalPrice.textContent = `${cartLogic.calculateTotalAmmount(storage.getCartItems())}$`;
        const table = document.createElement('table');
        table.classList.add('modal-table');
        modalProducts.innerHTML = "";

        cartLogic.cart.forEach( (product) => {
        const row = document.createElement('tr');
        const cellTitle = document.createElement('td');
        const cellAmmount = document.createElement('td');

        cellTitle.textContent = product.fields.title;
        cellAmmount.textContent = product.fields.quantity;
        row.appendChild(cellTitle);
        row.appendChild(cellAmmount);
        table.appendChild(row)
        }),

    modalProducts.appendChild(table);
        
    },

    //ADD PRODUCT TO CART
     async addProductToCart(productId){
        //Select correct product from json file
        const productToBeAdded = await cartLogic.getProductFromDb(productId);

        //If selected product is already in cart then stop adding another one
        const productInCart = this.cart.find(item => item.sys.id === productId);
        if(productInCart) { return }
        
        //If selected product isn't in cart then add
        this.cart.push(productToBeAdded);

        //Update local storage and display new cart to UI
        storage.saveCartItems(this.cart);
        this.displayProductsInCart();

        //Update values in cart
        this.cartValue = this.calculateTotalAmmount(this.cart);
        this.productsInCart = this.calculateNumberOfProducts(this.cart);

        //Update cart values in UI
        document.querySelector('.cart-number').textContent = cartLogic.calculateNumberOfProducts(storage.getCartItems());
        const productsValue = this.calculateTotalAmmount(this.cart);
        this.checkout.textContent = `${productsValue}$`;
                
    },

    //MAKE FIRST LETTER OF PRODUCT NAME START FROM CAPITAL LETTER

    firstLetterToUpperCase(word){ return word.charAt(0).toUpperCase() + word.slice(1);},

    //RENDER PRODUCTS IN CART TO UI
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

//REMOVE PRODUCTS FROM CART (UI)

clearCartFromUI(e){

    //Prevent button default behavior

    e.preventDefault()
    
    //Select products container in DOM
    const products = document.querySelector('.minicart-items');

    //Remove all products from UI
    while(products.lastElementChild) {
    products.removeChild(products.lastElementChild);
}

    //Restore begining state of the add buttons
    const addButtons = document.querySelectorAll('.product-button');
    addButtons.forEach((button) => {
        button.disabled = false;
        button.style.backgroundColor = '#2E8B57';
    });
    
    //Remove all items from local storage
    storage.clearStorage(storage.cartNameHandler);
    
    //Make cart empty
    cartLogic.cart = storage.getCartItems();
           
    //Make checkout value 
    cartLogic.cartValue = cartLogic.calculateTotalAmmount(cartLogic.cart);

    //Update cart values in UI
    cartLogic.productsInCart = cartLogic.calculateNumberOfProducts(cartLogic.cart);
    cartLogic.checkout.textContent = `${cartLogic.cartValue}$`;
    document.querySelector('.cart-number').textContent = cartLogic.productsInCart;
},

//COMPUTE TOTAL PRICE OF ALL PRODUCTS IN CART

calculateTotalAmmount(products){ 
    if(!products) {return 0};
    return products.reduce((acc, item)=> {        
         return acc += item.fields.price * item.fields.quantity
     }, 0)
      
 },

 //COMPUTE NUMBER OF ALL PRODUCTS IN CART

 calculateNumberOfProducts(products){ 
    if(!products) {return 0};
    return products.reduce((acc, item) => {
        return acc += item.fields.quantity
       }, 0)
     },

//INCREASE PRODUCT QUANTITY

 increaseProductQty(event){

    //Find searched product in cart using ID of product
    const productId = event.target.parentElement.parentElement.parentElement.dataset.productid;
    const product = cartLogic.cart.find(item => item.sys.id === productId);
    
    //Incrase product quantity
    ++product.fields.quantity;
    
    //Save new cart with increased product in local storage and display updated cart to user
    storage.saveCartItems(this.cart);
    this.displayProductsInCart();

    //Update values in cart and in UI
    this.cartValue = this.calculateTotalAmmount(this.cart)
    this.checkout.textContent = `${this.cartValue}$`;
    this.productsInCart = this.calculateNumberOfProducts(this.cart);
    document.querySelector('.cart-number').textContent = cartLogic.productsInCart;
   
},

//DECREASE PRODUCT QUANTITY

 decreaseProductQty(event){
     //Find searched product in cart using ID of product
    const productId = event.target.parentElement.parentElement.parentElement.dataset.productid;
    const product = cartLogic.cart.find(item => item.sys.id === productId);

    //Decrease product quantity
    --product.fields.quantity;
            
    //If product quantity equals 0 then pop the product out of the cart
    if(product.fields.quantity == 0 ) {
        let newCart = this.cart.filter(item => item.sys.id !== productId);
        this.cart = newCart;

        // Update new values of the cart
        storage.saveCartItems(newCart);

        //Restore default style of the deleted product button
        const productButton = document.querySelector(`[data-id="${productId}"]`);
        productButton.style.backgroundColor = '#2E8B57';
        productButton.disabled = false;
        
        //Updates values in the cart and UI
        this.cartValue = this.calculateTotalAmmount(this.cart);
        this.checkout.textContent = `${this.cartValue}$`;
        this.displayProductsInCart();
        this.productsInCart = this.calculateNumberOfProducts(this.cart);
        document.querySelector('.cart-number').textContent = this.productsInCart;
                   
        } else {
         
        //Update and display new cart values in local storage and in UI
        storage.saveCartItems(this.cart);
        this.displayProductsInCart();

        //Updates values in the cart and in UI
        this.cartValue = this.calculateTotalAmmount(this.cart);
        this.checkout.textContent = `${this.cartValue}$`;
        this.productsInCart = this.calculateNumberOfProducts(this.cart);
        document.querySelector('.cart-number').textContent = this.productsInCart;
        
        }
      
},

//ADD EVENT LISTENER ON UI CART
  minicartAction(){
    this.minicartContent.addEventListener('click', (event)=>{
                
    if(event.target.classList.contains('counter-increase')) {

        //Increase product
        this.increaseProductQty(event)
          
    } else if (event.target.classList.contains('counter-decrease')) {

        //Decrease product

        this.decreaseProductQty(event);
        
    } else if (event.target.classList.contains('fa-times')) {
        //Get ID of clicked product
        const productId = event.target.parentElement.parentElement.dataset.productid;
        const productButton = document.querySelector(`[data-id="${productId}"]`);
        
        //Remove product from UI
        event.target.parentElement.parentElement.remove();
        
        //Remove product from local storage and update cart values
        storage.removeProductFromLS(productId);
        this.cart = storage.getCartItems();
        
        
        //Restore default button styles of clicked product
        productButton.style.backgroundColor = '#2E8B57';
        productButton.disabled = false;
                 
        //Updates values in the cart and in UI
        this.cartValue = this.calculateTotalAmmount(this.cart);
        this.checkout.textContent = `${this.cartValue}$`;
        this.productsInCart = this.calculateNumberOfProducts(this.cart);
        document.querySelector('.cart-number').textContent = this.productsInCart;
   } 
});

},

}

export default cartLogic;
