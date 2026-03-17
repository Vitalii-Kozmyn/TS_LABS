import { LoadProduct, allProducts } from "./ViewProducts.js";
const catalogSection = document.querySelector(".catalog-section");
const heroSection = document.querySelector(".hero-section");
const catalogContainer = document.querySelector(".catalog__container");
const productsSection = document.querySelector(".products-section");
const showCatalogNAV = document.querySelector("#ShowCatalog");
const showCatalogBTN = document.querySelector(".lazy-show-catalog");
const showHomeNav = document.querySelector("#ShowHome");
export function loadCatalog(data) {
    catalogContainer.innerHTML = "";
    data.forEach(catalog => {
        const catalogBlock = document.createElement("div");
        catalogBlock.className = `catalog-block catalog--${catalog.id}`;
        catalogBlock.innerHTML = `<h3>${catalog.name}</h3>`;
        catalogBlock.addEventListener("click", () => {
            let filteredProducts = [];
            if (catalog.id === 5) {
                const randomCategoryId = Math.floor(Math.random() * 4) + 1;
                filteredProducts = allProducts.filter(p => p.categoryId === randomCategoryId);
            }
            else {
                filteredProducts = allProducts.filter(p => p.categoryId === catalog.id);
            }
            LoadProduct(filteredProducts);
            productsSection.style.display = "block";
        });
        catalogContainer.appendChild(catalogBlock);
    });
}
showCatalogNAV.addEventListener("click", (event) => {
    event.preventDefault();
    heroSection.style.display = "none";
    productsSection.style.display = "none";
    catalogSection.style.display = "block";
});
showCatalogBTN.addEventListener("click", (event) => {
    event.preventDefault();
    heroSection.style.display = "none";
    productsSection.style.display = "none";
    catalogSection.style.display = "block";
});
showHomeNav.addEventListener("click", (event) => {
    event.preventDefault();
    heroSection.style.display = "flex";
    catalogSection.style.display = "none";
    productsSection.style.display = "none";
});
//# sourceMappingURL=viewCatalog.js.map