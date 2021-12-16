let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(produitEnregistreDansLocalStorage);



fetch("http://localhost:3000/api/products") //requête API
.then(data => data.json()) 
.then(jsonListProducts => {
    console.log(jsonListProducts);
    });

produitEnregistreDansLocalStorage.forEach(element => {
    
});
// Ciblage des zones de texte à remplir

let htmlArticle;

for (element of produitEnregistreDansLocalStorage) {
    htmlArticle = document.createElement("article");
    document.getElementById("cart__items").appendChild(htmlArticle);
    htmlArticle.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                <div class="cart__item__img">
                                    <img src="" alt="Photographie d'un canapé">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>Nom du produit</h2>
                                        <p>Vert</p>
                                        <p>42,00 €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article>`;
};
