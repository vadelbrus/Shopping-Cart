const storage = {
    cartNameHandler: 'cart',

    getCartItems() {
        return localStorage.getItem(storage.cartNameHandler) ? JSON.parse(localStorage.getItem(storage.cartNameHandler)) : [];
    },

    saveCartItems(item) {
        return localStorage.setItem(storage.cartNameHandler, JSON.stringify(item));
    },

    clearStorage(item){
        return localStorage.removeItem(item);
    },

    removeProductFromLS(id){
        const products = this.getCartItems().filter( product => product.sys.id !== id);
        this.saveCartItems(products);
        
    },
  
}

export default storage