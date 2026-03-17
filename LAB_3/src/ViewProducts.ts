import { Product } from "./Product";

const productContainer = document.querySelector(".products__container") as HTMLElement;

export let allProducts: Product[] = [];

export function LoadProduct(data: Product[]): void {
    if (allProducts.length === 0 && data.length > 0) {
        allProducts = [...data];
    }

    productContainer.innerHTML = "";

    data.forEach(product => {
        const productBlock = `
            <div class="product-card category-id--${product.categoryId}">
                <img src="${product.image}">
                <h4>${product.name}</h4>
                <p class="product__desc">${product.description}</p>
                <p class="product__price">${product.price}</p>
            </div>
        `;

        productContainer.innerHTML += productBlock;
    });
}