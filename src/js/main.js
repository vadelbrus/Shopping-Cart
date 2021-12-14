import displayProducts from './displayProducts.js'
import cartLogic from './cartLogic.js'


//Add cart functionality: open/hide cart
cartLogic.openCart();

cartLogic.closeCart();

//Populate gallery of products

await displayProducts();

//Populate minicart from local storage

//Load event listeners to cart buttons

document.querySelectorAll('.product-button').forEach(item => item.addEventListener('click',  (event) => {
    event.preventDefault();

    const productId = event.target.dataset.id;
    cartLogic.addProductToCart(productId);
    console.log(cartLogic.cart)
}))









