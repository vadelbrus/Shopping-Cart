const storage = {
    getCartItems() {

        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    },

    saveCartItems(item) {

        return localStorage.setItem('cart', JSON.stringify(item));

    }


}

export default storage