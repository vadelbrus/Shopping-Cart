import displayProducts from './displayProducts.js'
import cartLogic from './cartLogic.js'
import storage from './storage.js'
import cartFunctionality from './cartFunctionality.js'


(async function App() {

//Add cart functionality: open/hide cart

cartFunctionality.toogleCartState();

//Populate gallery of products

await displayProducts();

//Populate minicart from local storage

cartLogic.displayProductsInCart()

//Add minicart item user action listener

cartLogic.minicartAction();

//Set number of cart items

document.querySelector('.cart-number').textContent = cartLogic.calculateNumberOfProducts(cartLogic.cart);

//Set checkout value

cartLogic.checkout.textContent = `${cartLogic.calculateTotalAmmount(storage.getCartItems())}$`;


//Display summary when user clicks on checkout button

document.querySelector('.checkout-button').addEventListener('click', cartLogic.showSummary);

document.addEventListener('click', (e)=> {
    
    if( e.target.matches('.modal-close') || e.target.matches('.modal-container') 
    ) {
        
        document.querySelector('.modal-container').classList.remove('show-modal')
    }
}, false)


//Load event listeners to cart buttons

document.querySelectorAll('.product-button').forEach(item => item.addEventListener('click',  (event) => {
    
    event.preventDefault();

    event.target.disabled = true;
    event.target.style.backgroundColor = 'grey';
    
    const productId = event.target.dataset.id;
    cartLogic.addProductToCart(productId);
    
}));


//Add button background to UI to all items in cart

cartLogic.cart.forEach((item) => {
    document.querySelector(`[data-id='${item.sys.id}']`).style.backgroundColor = 'grey'})

//Remove all products from minicart UI after clicking 'CLEAR CART' button

document.querySelector('.clear-button').addEventListener('click', cartLogic.clearCartFromUI);

})()