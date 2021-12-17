// --------------------- Récupération des données stockées dans le local storage + affichage dans la page Panier

const storage = JSON.parse(localStorage.getItem("CART"));
console.log(storage);

storage.forEach(element => {
    document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                                <div class="cart__item__img">
                                    <img src="${element.image}" alt="${element.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${element.name}</h2>
                                        <p>${element.color}</p>
                                        <p>${element.price}, 00 €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté : ${element.quantity}</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article>`;
})

// Affichage du nombre total d'articles
let totalQuantity = document.getElementById("totalQuantity");
let sumQuantity = 0;
storage.forEach(Object => {
    sumQuantity += JSON.parse(Object.quantity);
});
totalQuantity.textContent = sumQuantity;


// Affichage du prix total
let totalPrice = document.getElementById("totalPrice");
let sumPrice = 0;
storage.forEach(Object => {
    sumPrice += JSON.parse(Object.totalPrice);
});
totalPrice.textContent = sumPrice;

// --------------------- Modification du panier

let newQuantityInput = [...document.getElementsByClassName("itemQuantity")];
let deleteButton = [...document.getElementsByClassName("deleteItem")];
let productsInCart = document.getElementById("cart__items");

// Bouton Supprimer
deleteButton.forEach((element, index) => {
    element.addEventListener('click', () => {
        // supprimer dans le DOM
        let deletedProduct = deleteButton[index].closest('.cart__item');
        deletedProduct.remove();
        // supprimer dans le local storage
        storage.splice(index, 1);
        localStorage.setItem('CART', JSON.stringify(storage));
        location.reload();
    })
})

// Modification de la quantité par le client
newQuantityInput.forEach((productsInCart, index) => {
    productsInCart.addEventListener('change', () => {
        // modifie la quantité dans le local storage et le DOM
        storage[index].quantity = newQuantityInput[index].value;
        storage[index].totalPrice = newQuantityInput[index].value * storage[index].price;
        localStorage.setItem('CART', JSON.stringify(storage));
        location.reload();
    })
})


