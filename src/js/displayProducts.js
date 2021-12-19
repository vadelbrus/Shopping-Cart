import fetchProducts from './fetchProducts.js'

const displayProducts = async () => {
    const data = await fetchProducts();
    const products = document.querySelector('.products');

    const productsData = data.items.map(item => {
        return `<div class="product">
         <img src="${item.fields.image.fields.file.url}" alt="${item.fields.title} image" class="product-image">
             <p class="product-price">${item.fields.price}$</p>
             <p class="product-description">${item.fields.description}</p>
             <button class="product-button" data-id=${item.sys.id}>Add to cart</button>
          </div>`;
    });

    products.innerHTML = productsData.join("");

}

export default displayProducts
