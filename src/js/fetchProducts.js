const fetchProducts = async () => {
    try {
        const response = await fetch('/src/js/productsDb.json');
        const data = await response.json();
       
        return data;

    } catch (error) {
        console.log(`Error ${error}`);
    }
}



export default fetchProducts;
