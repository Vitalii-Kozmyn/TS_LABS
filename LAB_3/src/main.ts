import { Product } from "./Product";
import { Catalog } from "./Catalog";
import { loadCatalog } from "./viewCatalog.js";
import { LoadProduct } from "./ViewProducts.js";


async function getFetch<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(response.statusText);
    }

    const data: T = await response.json();
    return data;
} 

async function getCatalog() {
    try {
        const catalogs = await getFetch<Catalog[]>('../data/categories.json');

        loadCatalog(catalogs);
    } catch (error) {
        console.log(error);
    }
}

async function getProducts() {
    try {
        const products = await getFetch<Product[]>('../data/products.json');

        LoadProduct(products);
    } catch (error) {
        console.log(error);
    }
}

getCatalog();
getProducts();