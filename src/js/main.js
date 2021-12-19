import displayProducts from './displayProducts.js'
import cartLogic from './cartLogic.js'
import storage from './storage.js'
import cartFunctionality from './cartFunctionality.js'

(async function App() {

//Add cart functionality: open/hide cart

cartFunctionality.openCart();
cartFunctionality.closeCart();

//Populate gallery of products

await displayProducts();

//Populate minicart from local storage

const items = storage.getCartItems();

items.forEach( item => cartFunctionality.populateCart(item));

//Load event listeners to cart buttons

document.querySelectorAll('.product-button').forEach(item => item.addEventListener('click',  (event) => {
    event.preventDefault();
    
    const productId = event.target.dataset.id;
    cartLogic.addProductToCart(productId);
}));

//Remove all products from minicart UI after clicking 'CLEAR CART' button

document.querySelector('.clear-button').addEventListener('click', cartFunctionality.clearCartFromUI);

})()