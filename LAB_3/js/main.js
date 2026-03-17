import { loadCatalog } from "./viewCatalog.js";
import { LoadProduct } from "./ViewProducts.js";
async function getFetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
}
async function getCatalog() {
    try {
        const catalogs = await getFetch('../data/categories.json');
        loadCatalog(catalogs);
    }
    catch (error) {
        console.log(error);
    }
}
async function getProducts() {
    try {
        const products = await getFetch('../data/products.json');
        LoadProduct(products);
    }
    catch (error) {
        console.log(error);
    }
}
getCatalog();
getProducts();
//# sourceMappingURL=main.js.map