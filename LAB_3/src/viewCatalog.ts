import { Catalog } from "./Catalog";
import { Product } from "./Product";
import { LoadProduct, allProducts } from "./ViewProducts.js";

const catalogSection = document.querySelector(".catalog-section") as HTMLElement;
const heroSection = document.querySelector(".hero-section") as HTMLElement;
const catalogContainer = document.querySelector(".catalog__container") as HTMLElement;
const productsSection = document.querySelector(".products-section") as HTMLElement;
const showCatalogNAV = document.querySelector("#ShowCatalog") as HTMLElement;
const showCatalogBTN = document.querySelector(".lazy-show-catalog") as HTMLElement;
const showHomeNav = document.querySelector("#ShowHome") as HTMLElement;

export function loadCatalog(data: Catalog[]): void {
    catalogContainer.innerHTML = "";

    data.forEach(catalog => {
        const catalogBlock = document.createElement("div");
        catalogBlock.className = `catalog-block catalog--${catalog.id}`;
        catalogBlock.innerHTML = `<h3>${catalog.name}</h3>`;

        catalogBlock.addEventListener("click", () => {
            let filteredProducts: Product[] = [];

            if (catalog.id === 5) {
                const randomCategoryId = Math.floor(Math.random() * 4) + 1;
                filteredProducts = allProducts.filter(p => p.categoryId === randomCategoryId);
            } else {
                filteredProducts = allProducts.filter(p => p.categoryId === catalog.id);
            }

            LoadProduct(filteredProducts);
            productsSection.style.display = "block";
        });

        catalogContainer.appendChild(catalogBlock);
    });
}

showCatalogNAV.addEventListener("click", (event: Event) => {
    event.preventDefault();
    heroSection.style.display = "none";
    productsSection.style.display = "none";
    catalogSection.style.display = "block";
});

showCatalogBTN.addEventListener("click", (event: Event) => {
    event.preventDefault();
    heroSection.style.display = "none";
    productsSection.style.display = "none";
    catalogSection.style.display = "block";
});

showHomeNav.addEventListener("click", (event: Event) => {
    event.preventDefault();
    heroSection.style.display = "flex";
    catalogSection.style.display = "none";
    productsSection.style.display = "none";
});